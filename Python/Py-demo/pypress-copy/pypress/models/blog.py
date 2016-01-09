__author__ = 'zhangxiaodong'


import hashlib, re, random

from datetime import datetime

from werkzeug import cached_property

from flask import abort, current_app, url_for, Markup

from flaskext.babel import gettext as _
from flaskext.sqlalchemy import BaseQuery
from flaskext.principal import RoleNeed, UserNeed, Permission

from pypress import signals
from pypress.helpers import storage, slugify, markdown

from pypress.extensions import db
from pypress.permissions import moderator, admin

from pypress.models.users import User


class PostQuery(BaseQuery):
    def jsonify(self):
        for post in self.all():
            yield post.json

    def as_list(self):
        deferred_cols = ("content",
                         "tags",
                         "author.activation_key",
                         "author.date_joined",
                         "author.last_login",
                         "author.last_request")
        options = [db.defer(col) for col in deferred_cols]
        return self.options(*options)

    def get_by_slug(self,slug):
        post = self.filter(Post.slug==slug).first()
        if post is None:
            abort(404)
        return post

    def search(self,keywords):
        criteria = []

        for keyword in keywords.split():
            keyword = '%' + keyword + '%'
            criteria.append(db.or_(Post.title.ilike(keyword),
                                   Post.content.ilike(keyword),
                                   Post.tags.ilike(keyword)
                                   ))

        q = reduce(db.and_,criterial)
        return self.filter(q)

    def archive(self,year,month,day):
        if not year:
            return self

        criteria = []
        criteria.append(db.extract('year',Post.created_date)==year)
        if month:criteria.append(db.extract('month'.Post.created_date)==month)
        if day:criteria.append(db.extract('day',Post.created_date)==day)

        q = reduce(db.and_,criteria)
        return self.filter(q)










