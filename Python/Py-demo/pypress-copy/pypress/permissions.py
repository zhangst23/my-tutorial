#__author__ = 'zhangxiaodong'
#coding=utf-8

from flaskext.principal import RoleNeed,Permission

admin = Permission(RoleNeed('admin'))
moderator = Permission(RoleNeed('moderator'))
auth = Permission(RoleNeed('authenticated'))

null = Permission(RoleNeed('null'))