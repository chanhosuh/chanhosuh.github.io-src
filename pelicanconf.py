#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

AUTHOR = u'Chan-Ho Suh'
SITENAME = u'More Internet Clutter'
SITEURL = ''

PATH = 'content'
STATIC_PATHS = [
    'images',
    'static',
]
EXTRA_PATH_METADATA = {
    'static': {'path': 'static'},
}

ARTICLE_EXCLUDES = [
    'static',
]

TIMEZONE = 'America/New_York'

DEFAULT_LANG = u'en'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# Blogroll
LINKS = (('Pelican', 'http://getpelican.com/'),
         ('Python.org', 'http://python.org/'),
         ('Jinja2', 'http://jinja.pocoo.org/'),
         ('You can modify those links in your config file', '#'),)

# Social widget
SOCIAL = (('You can add links in your config file', '#'),
          ('Another social link', '#'),)

DEFAULT_PAGINATION = 10

# Uncomment following line if you want document-relative URLs when developing
#RELATIVE_URLS = True

THEME = 'blue-penguin'


#### MENU  #########
# Menu item appearance and order is determined as follows:
# home (if DISPLAY_HOME is True),
# content from "pages" directory (if DISPLAY_PAGES_ON_MENU is True)
# items in MENUITEMS
# items in MENU_INTERNAL_PAGES
DISPLAY_HOME = False
DISPLAY_PAGES_ON_MENU = False
DISPLAY_FOOTER = False

MENUITEMS = (
    ('Home', '/'),
    ('About Me', '/pages/about-me.html'),
)

# provided as examples, they make ‘clean’ urls. used by MENU_INTERNAL_PAGES.
TAGS_URL           = 'tags'
TAGS_SAVE_AS       = 'tags/index.html'
AUTHORS_URL        = 'authors'
AUTHORS_SAVE_AS    = 'authors/index.html'
CATEGORIES_URL     = 'categories'
CATEGORIES_SAVE_AS = 'categories/index.html'
ARCHIVES_URL       = 'archives'
ARCHIVES_SAVE_AS   = 'archives/index.html'

# use those if you want pelican standard pages to appear in your menu
MENU_INTERNAL_PAGES = (
    ('Blog', ARCHIVES_URL, ARCHIVES_SAVE_AS),
)

