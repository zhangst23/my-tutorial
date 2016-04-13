Yii环境和项目启动.php


1.0

<!-- 
curl -sS https://getcomposer.org/installer | php
mv composer.phar /usr/local/bin/composer

php -r "readfile('https://getcomposer.org/installer');" | php
 -->
composer global require "fxp/composer-asset-plugin:~1.0.0"
composer create-project --prefer-dist yiisoft/yii2-app-basic basic

http://localhost/basic/web/index.php



2.0

composer global require "fxp/composer-asset-plugin:~1.0.0"
and
composer create-project yiisoft/yii2-app-advanced blog 2.0.6


cd blog
and
php init


http://localhost/blog/frontend/web




3.0  mysql

show databases;
create database digpage;













