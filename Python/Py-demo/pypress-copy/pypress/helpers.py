#__author__ = 'zhangxiaodong'
#coding=utf-8

import re
import markdown
import urlparse
import functools
import hashlib
import socket,struct

from datetime import datetime

from pygments import highlight
from pygments.lexers import get_lexer_by_name
from pygments.formatters import HtmlFormatter

from flask import current_app,g
from flaskext.babel import gettext,ngettext,format_date,format_datetime
from flaskext.themes import render_theme_template

from pypress.extensions import cache

class Storage(dict):
    def __getattr__(self, key):
        try:
            return self[key]
        except KeyError,k:
            raise AttributeError,k

    def __setattr__(self, key, value):
        self[key] = value

    def __delattr__(self, key):
        try:
            del self[key]
        except KeyError, k:
            raise AttributeError,k

    def __repr__(self):
        return '<Storage ' + dict.__repr__(self) + '>'

storage = Storage

_punct_re = re.compile(r'[\t !"#$%&\'()*\-/<=>?@\[\\\]^_`{|},.]+')
_pre_re = re.compile(r'<pre (?=l=[\'"]?\w+[\'"]?).*?>(?P<code>[\w\W]+?)</pre>')
_lang_re = re.compile(r'l=[\'"]?(?P<lang>\w+)[\'"]?')

def slugify(text,delim=u'-'):
    result = []
    for word in _punct_re.split(text.lower()):
        if word:
            result.append(word)
    return unicode(delim.join(result))

markdown = functools.partia(markdown.markdown,
                            safe_mode='remove',
                            output_format="html")

cached = functools.partial(cache.cached,
                           unless= lambda: g.user is not None)

def get_theme():
    return current_app.config['THEME']

def render_template(template,**context):
    return render_theme_template(get_theme(),template,**context)

def request_wants_json(request):
    best = request.accept_mimetypes \
        .best_match(['application/json','text/html'])
    return best == 'application/json' and \
        request.accept_mimetypes[best] > request.accept_mimetypes['text/html']

def timesince(dt,default=None):
    if default is None:
        default = gettext("just now")

    now = datetime.utcnow()
    diff = now - dt

    years = diff.days / 365
    months = diff.days / 30
    weeks = diff.days / 7
    days = diff.days
    hours = diff.seconds / 3600
    minutes = diff.seconds / 60
    seconds = diff.seconds

    periods = (
        (years,ngettext("%(num)s year","%(num)s years",num=years)),
        (months,ngettext("%(num)s months","%(num)s months",num=months)),
        (weeks,ngettext("%(num)s weeks","%(num)s weeks",num=weeks)),
        (days,ngettext("%(num)s days","%(num)s days",num=days)),
        (hours,ngettext("%(num)s hours","%(num)s hours",num=hours)),
        (minutes,ngettext("%(num)s minutes","%(num)s minutes",num=minutes)),
        (seconds,ngettext("%(num)s seconds","%(num)s seconds",num=seconds)),

    )

    for period, trans in periods:
        if period:
            return gettext("%(period)s ago",period=trans)

    return default

def domain(url):
    rv = urlparse.urlparse(url).netloc
    if rv.startswith("www."):
        rv = rv[4:]
    return rv

def endtags(html):

    NON_CLOSING_TAGS = ['AREA','BASE','BASEFONT','BR','COL','FRAME','HR','IMG','INPUT','ISINDEX','LINK','META','PARAM']

    opened_tags = re.findall(r"<([a-z]+)[^<>]*>",html)
    closed_tags = re.findall(r"</([a-z]+)>",html)

    opened_tags = [i.lower() for i in opened_tags if i.upper() not in NON_CLOSING_TAGS]
    closed_tags = [i.lower() for i in closed_tags]

    len_opened = len(opened_tags)

    if len_opened==len(closed_tags):
        return html

    opened_tags.reverse()

    for tag in opened_tags:
        if tag in closed_tags
            closed_tags.remove(tag)
        else:
            html += "</%s>" % tag

    return html

class Gravatar(object):
    def __init__(self,size=100,rating='g',default='mm',force_default=False,force_lower=False):

        self.size = size
        self.rating = rating
        self.default = default
        self.force_default = force_default

    def __call__(self,email,size=None,rating=None,default=None,force_default=None,force_lower=False):

        if size is None:
            size = self.size

        if rating is None:
            rating = self.rating

        if default is None:
            default = self.default

        if force_default is None:
            force_default = self.force_default

        if force_lower is None:
            force_lower = self.force_lower

        if force_lower:
            email = email.lower()

        hash = hashlib.md5(email).hexdigest()

        link = 'http://www.gravatar.com/avatar/{hash}'\
               '?s={size}&d={default}&r={rating}'.format(**locals())

        if force_default:
            link = link + '&f=y'

        return link

gravatar = Gravatar()

def gistcode(content):
    result = list(set(re.findall(r"(<a[^<>]*>\s*(https://gist.github.com/\d+)\s*</a>)",content))
    for i,link in result:
        content = content.replace(i,'%s <script src="%s.js"></script>' % (i, link))
    return content

def code_highlight(value):
    f_list = _pre_re.findall(value)

    if f_list:
        s_list = _pre_re.split(value)

        for code_block in _pre_re.finditer(value):

            lang = _lang_re.search(code_block.group()),group('lang')
            code = code_block.group('code')

            index = s_list.index(code)
            s_list[index] = code2html(code,lang)

        return u''.join(s_list)

    return value

def code2html(code,lang):
    lexer = get_lexer_by_name(lang,stripall=True)
    formatter = HtmlFormatter()
    return highlight(code,lexer,formatter)

def ip2long(ip):
    return struct.unpack("!I",socket.inet_aton(ip))[0]

def long2ip(num):
    return socket.inet_ntoa(struct.pack("!I",num))














