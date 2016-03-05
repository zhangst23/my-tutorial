1.1 .<%= raw SiteConfig.inde_html % >


1.2.   <script type="text/javascript" data-turbolinks-eval=false>


1.3.  
    @threads = []

    @threads << Thread.new do
      @topic.hits.incr(1)
    end


1.4,  %w

1.5  Devise::RegistrationsController

http://api.rubyonrails.org/classes/ActionController/RequestForgeryProtection/ClassMethods.html#method-i-protect_from_forgery
https://nvisium.com/blog/2014/09/10/understanding-protectfromforgery/
https://ihower.tw/rails4/actioncontroller.html



1.6 rails-settings-cached
# This is imporved from rails-settings, added caching for all settings
http://huacnlee.com/rails-settings-cached/


1.7  @threads << Thread.new do


