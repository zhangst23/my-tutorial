#__author__ = 'zhangxiaodong'
from blinker import Namespace

signals = Namespace()

comment_added = signals.signal("comment-added")
comment_deleted = signals.signal("comment-deleted")