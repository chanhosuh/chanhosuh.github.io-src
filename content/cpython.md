Title:  Overview of Python internals
Date: 2017-6-3
Category: Python, CPython
Status: draft

Objects:

Everything in Python is an object, including integers, functions, and classes.  In the reference implementation in C,this is represented as a C struct type, the PyObject, which is allocated on the heap.

PyObject head
    Py_ssize_t ob_refcnt;
    struct _typeobject *ob_type;
    
PyVarObject head
    Py_ssize_t ob_refcnt;
    struct _typeobject *ob_type;
    Py_ssize_t ob_size;  // length of variable size object

PyTypeObject



Things to explain (mysteries?):


abstract object interface
- method calls
  -- method objects
  -- instance dict versus class dict
- builtin versus user-defined class
  -- magic methods, e.g. len, str


import

namespaces

frame objects:
- locals
	- fast locals
	- cell vars, free vars
- contains value stack
- block stack


functions:


CALL_FUNCTION  -- starts by building a frame


Closures
- cell vars
- code object can be referenced multiple times by different function objects

Generators
- generator function is defined as function with "yield" keyword
- executing generator function creates generator object, which has a reference to a frame object
- calling "next" on generator object executes bytecode in its frame object until "YIELD_VALUE" is reached or bytecode runs out (returns None)
- there are also generator expressions

Classes
how does a class get built?  before "BUILD_CLASS" op is read, the attribute dict must be built by "CALL_FUNCTION"??


Descriptors
- bound vs unbound methods
	- PyMethod object
- attribute lookup chain
    - TP_DESCR_GET
- properties    
    

Performance
- bool versus len
  - why does `not []` perform better than `len([]) == 0` ?
- why is `len` so performant for built-ins?



