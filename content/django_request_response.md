Title:  Django internals - Request/Response stack  
Date: 2018-09-01  
Category: Django, Python, WSGI, REST  
Status: draft  

A benefit of using a web framework like Django is it does so many things out of the box for you.  The big disadvantage, of course, is that one day something mysterious will happen, and you have no idea why.  For me, one of the things that has come to bite me a few times, particularly during unit tests, is understanding exactly how requests get propagated through Django's middleware chain, gets processed by the view(s), and returns a response which continues through the rest of the middleware.

The implementation turns out to be fairly straighforward, but it does involve knowing a bit about WSGI, and understanding Django's view & template interaction.

For reference, my code snippets are from Django 2.1, but this part of the codebase hasn't changed much for some years.


## WSGI

Let's start with a quick summary of the Web Server Gateway Interface (WSGI).  For a readable intro with more details and rationale behind the standards, I would just recommend reading [PEP 333](https://www.python.org/dev/peps/pep-0333/).

WSGI is a standard which prescribes an interface for interaction between a web server and a Python application, typically a web framework like Django, Flask, etc.  Two popular implementations of WSGI are uWSGI and Gunicorn. 

Essentially, a web server either runs a WSGI implementation, or connects to it if they are in separate containers.  The WSGI implementation runs a Python process which imports a callable provided by the Python application and invokes it upon every request.

Thus WSGI requires:

- the application callable:  

  ```python
  def simple_app(environ, start_response):
      """Simplest possible application object"""
      status = '200 OK'
      response_headers = [('Content-type', 'text/plain')]
      start_response(status, response_headers)
      return ['Hello world!\n']
  ```

  The example uses a function to demonstrate the signature, but the callable can be any Python object with a `__call__` method with the same signature.  
      
   
- `environ`: a dictionary of environment variables, e.g. REQUEST\_METHOD, PATH\_INFO, QUERY\_STRING, etc.  
- `start_response`: a Python callable provided by the WSGI implementation.  More below.  
- The return value must be an iterable of strings.

- Its own callable, `start_response`, which it hands off to the application.  Its arguments are:
  - `status`: a string giving status code and reason
  - `response_headers`: a list of valid header key-value pairs

I won't say much more on this, as it's not needed.  Consult the PEP for futher details.


### WSGIHandler

When you run a WSGI implementation like `gunicorn`, you will give it the path to the Django WSGI app object, which is in a module in your project called `wsgi.py`.  It will have something like this in it:

```python
import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "my_project.settings")
application = get_wsgi_application()
```

If you dig in the source code you find:

```python
import django
from django.core.handlers.wsgi import WSGIHandler

def get_wsgi_application():
    django.setup(set_prefix=False)
    return WSGIHandler()

```

So the WSGI callable is `WSGIHandler`.  Let's look at its `__call__` method.

```python
def __call__(self, environ, start_response):
    [... snipped ...]

    request = self.request_class(environ)
    response = self.get_response(request)

    [... snipped ...]
    
    start_response(status, response_headers)
    
    [... snipped ...]
    
    return response
```
We aren't going to worry about the `start_response` stuff, but I left that line in there so you can see that `WSGIHandler` does indeed follow the WSGI protocol.  

The part that is important for us is the creation of the request object and then the call to `get_response` which produces the response from the request.


### WSGIRequest

The `WSGIHandler` code starts off with:

```python
class WSGIHandler(base.BaseHandler):
    request_class = WSGIRequest

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.load_middleware()
```

So you see that the line from `__call__` above:

```python
   request = self.request_class(environ)
```

just creates a `WSGIRequest` instance from `environ`, which, remember, is just a dictionary of environment variables, including the information the web server has about the request.

Also notice that the `__init__` does a mysterious `load_middleware()`.  More on that later.

What happens inside the `__init__` for `WSGIRequest` isn't too interesting for us; the key takeaway is that the `path`, `method`, and `resolve_match` attributes are set.  The first two give a cleaned URL and method name like `GET`, resp.  The last is set to `None` and will be changed by the URL resolution part of the middleware chain.


## Middleware chain

```python
def get_response(self, request):
    # Setup default url resolver for this thread
    set_urlconf(settings.ROOT_URLCONF)

    response = self._middleware_chain(request)
    
    [... snipped ...]
    
    return response

```

```python

def _get_response(self, request):
    response = None

    [ ... resolve and set path ...]
    callback, callback_args, callback_kwargs = resolver_match
    request.resolver_match = resolver_match

    # Apply view middleware
    for middleware_method in self._view_middleware:
        response = middleware_method(request, callback, callback_args, callback_kwargs)
        if response:
            break

    [... snip exception handling ...]

    [... snip deferred rendering ...]

    return response

```

```python
def load_middleware(self):
    self._view_middleware = []
    self._template_response_middleware = []
    self._exception_middleware = []

    handler = convert_exception_to_response(self._get_response)
    for middleware_path in reversed(settings.MIDDLEWARE):
        middleware = import_string(middleware_path)
        handler = middleware(handler)
        
        [... exception handling snipped ...]

        if hasattr(handler, 'process_view'):
            self._view_middleware.insert(0, handler.process_view)
        if hasattr(handler, 'process_template_response'):
            self._template_response_middleware.append(handler.process_template_response)
        if hasattr(handler, 'process_exception'):
            self._exception_middleware.append(handler.process_exception)

        handler = convert_exception_to_response(handler)

    self._middleware_chain = handler
```
## 
