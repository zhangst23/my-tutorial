Flask应用部署与运维.py

1.0   WSGI
WSGI(Python Web Server Gateway Interface)
定义了Web服务器和Web应用程序之间通信的接口规范

常用的WSGI服务器
Gunicorn
uWSGI
CherryPy
Tornado
Gevent
mod_wsgi (Apache)



Web服务器
Nginx是一款面向性能设计的HTTP服务器，相较于Apache、lighttpd具有占有内存少，稳定性高等优势。



2.0   部署工具（Virtualenv和Supervisor）的安装与使用。

2.1  Virtualenv简介
用于创建独立的Python运行环境

解决问题：
版本问题
依赖问题
权限问题


Virtualenv安装
sudo pip install virtualenv

使用：
创建虚拟环境
激活虚拟环境
关闭虚拟环境


2.2   Supervisor简介
进程管理工具

解决问题：
应用程序进程的控制
多应用进程的管理
应用中断后的快速恢复


Supervisor安装与使用
sudo apt-get install supervisor 

使用：
添加程序
使用supervisorctl进行控制




3.0   轻量级运维方案的设计与实现
DevOps简介
DevOps的优点
Fabric简介
轻量级运维方案的设计
轻量级运维方案的实现

DevOps简介（Development和Operations的组合）


DevOps的优点
自动化 
快速发布 
快速恢复

Fabric简介
    是一个通过SSH进行应用部署以及系统任务管理的命令行工具。

功能：
在本地或者远程执行shell命令
上传和下载文件
提示用户输入
中断操作













