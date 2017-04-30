Title:  Setting up a GitHub Pages site with Travis integration
Date: 2017-4-30
Category: blogging, GitHub Pages

In the spirit of "it's better to get started on something trivial than procrastinate
forever on something deep", my first post for this blog will be on
setting up a blog with [GitHub Pages][ghpages].  I did not find it quite trivial, 
especially since I wanted my site to build automatically via a static site generator once I pushed a blog post in Markdown to GitHub.

There are several steps:

1. Set up GitHub source repo and target repo (your GitHub pages site repo)
2. Copy [Pelican][pelican] config files to your GitHub source repo
3. Set up [Travis][travis] on source repo

For future reference, my GitHub source repo is [here](https://github.com/chanhosuh/chanhosuh.github.io-src) and [this](https://github.com/chanhosuh/chanhosuh.github.io) is the target (site) repo.

As you will see, the approach is to push your Markdown files to the source repo, which will be configured for Travis CI.  Travis will then detect the changes, run a build using a static site generator, and deploy the output files to your target repo, which will then reflect at your GitHub Pages domain.


### Set up GitHub repositories
Setting up a GitHub Pages site is pretty simple.  Create a repo called `<GitHub username>.github.io`.  This will create what GitHub calls an individual/organization site (the other option is to create a project site; I won't describe how to do this).  Check that the settings for this repo has GitHub Pages activated. Once you've done it, you will have a domain like mine, <GitHub username>.github.io.  This site will be built from the files in this repo, which I will call the *target* repo.

Now create another repo.  For simplicity, I will assume that like me, you call it `<GitHub username>.github.io-src`.  This is the *source* repo.  


### Copy Pelican files to source repo
Now that your repositories are set up, you need a static site generator.
GitHub recommends Jekyll, which is what I initially tried.  Ultimately, I decided to 
go with [Pelican][pelican].  Since my goal in using a static
site generator was to have an overall understanding of how my site was being built 
and served, it appealed to me that Pelican is written in Python (Jekyll is written in Ruby).

Technically, you don't need to install Pelican.  What you need to push to your repository are the following files generated by a Pelican install: `pelicanconf.py`, `publishconf.py`, and `Makefile`.  The Travis deploy script (see below) will need these files to configure Pelican.  Also, the deploy assumes your content is in a `content` directory.

### Configuring Travis CI for source repo
First go to the [Travis site](https://travis-ci.org/), login with your GitHub account and turn on your source repo so Travis is watching it.  Disable build on pull.  

Once you've set up your GitHub commits to trigger a Travis build, you need to create a `.travis.yml` file at the root of your repo.  [Mine](https://github.com/chanhosuh/chanhosuh.github.io-src/blob/master/.travis.yml) is a pretty generic one.  Note it does a pip install of `pelican` and `markdown`.  I also use a different theme than the default; the brute-force method I used was to just copy over all the theme files to the repo and in the deploy script (see below) use the `pelican-themes` command to install it.

Note the yml has the line: `after_success: ./deploy.sh`.  This deploy script should be executable.  I stole the [deploy script](https://github.com/chanhosuh/chanhosuh.github.io-src/blob/master/deploy.sh) from [Daniel Rodriguez's setup](danielfrg.github.io-source), since he has already done the hard work of figuring out the details of environment variables and so forth.  What his script does is clone the target repo to the Travis build server, copy over the Pelican output, and then git push it all. 

The last part of the yml has an encrypted key used by Travis to push to your target repo.  So you need to go into your user settings --> developer settings --> Personal access tokens, where you will be able to "generate new token" and allow "Travis CI" to use it with [various permissions](https://docs.travis-ci.com/user/github-oauth-scopes/).  You can't use this token directly as it will be exposed in your public source directory, so you need to encrypt it.  Travis provides a [tool](https://docs.travis-ci.com/user/encryption-keys/) to do this, but unfortunately(?) you need to install it through a ruby gem.  


Assuming you already have Ruby gems installed:

    gem install travis

Now from the root of your source repo, run:

    travis encrypt GH_TOKEN=your_token --add
    
where `your_token` is your authentication token.

The `--add` option adds something like the following to your `.travis.yml`

	env:
	  global:
	  - secure: ebuvzbMDBTB6EWTZ5ngz3+GzBJSWLTE+tEgpzw+wpIkc3G2B/0MJ2dVNfiVViynw3iHWnJjta1C4AW+afpE8JR1qnkQyjhyO6i4501gBHaKCeHshEhjySTpw7W4aKH2JHWYryY50AI0+9MIjwuhlfB4U3MEY5G391qLNKOUuwXx3wlsnsgnRZ1FBANJHFdpLWI16Hnm7EytpiJmCt74iVTe0fzpwRRn2AbH1RGNIPF8T1xB0vMx5bRXu9XIQnYu/4q4unVyrPTQOY2SNu5qvS/UajZaycw3DpCSdlcgbw2XTC6DQQDlWV23aXKG8H8HWQwHQoHvK4HXzil4+mstqZPv5EuBZIHoBH7F1qpnnGiuAJRDlakOraPVKIaE22yF+ory55SnGJuZg95vSmAMeKfwnMPd3DGND5ipCskaINrWbvCtwLcyPHwLo+e5DpdS7RJsMreN7wdyVjdQO2y+WEWk1pEkiC/IGnO/ItoU+ZwmHKGgjA9rGFJrW7iwdhw3rVZnA/hroh6TXQhat8qnXOdrrbzW5tag4ObjXLmiCmD1UNzcJmJvs2XxLIytHujXXwX+FNGAylQ52C9WsMxIsCT0ErjVHjKM2AuQERn0t7nO40gf0jMJ2kX+TyHer++9GzJJTZxR/mhsA3q1Kn6rC5qkxUMzXL/K4PPAX6pPfheg=


Phew, so you've set up Travis!  Now all that's left to do is post some content, tweak Pelican....


#### Useful references

* [Daniel Rodriguez's source repo](danielfrg.github.io-source)
* [Siong-Ui Te - Theory and Practice](https://siongui.github.io/2016/01/05/deploy-website-by-pelican-travis-ci-github-pages/)

[ghpages]: https://pages.github.com
[pelican]: http://getpelican.com
[travis]: http://travis-ci.org