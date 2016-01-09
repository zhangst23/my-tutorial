#__author__ = 'zhangxiaodong'
#coding=utf-8

from flask import Module,Response,request,flash,jsonify,g,current_app,\
    abour,redirect,url_for,session,send_file,send_from_directory

from flaskext.babel import gettext as _

from pypress import signals
from pypress.helpers import render_template,cached
from pypress.permissions import auth
from pypress.extensions import db
from pypress.models import Comment

comment = Module(__name__)

@comment.route("/<int:comment_id>/delete/",methods=("POST",))
@auth.require(401)
def delete(comment_id):

    comment = Comment.query.get_or_404(comment_id)
    comment.permissions.delete.test(403)

    db.session.delete(comment)
    db.session.commit()

    signals.comment_deleted.send(comment.post)