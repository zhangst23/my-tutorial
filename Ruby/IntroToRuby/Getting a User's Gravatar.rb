module ApplicationHelper
  def gravatar_url(email, size)
    gravatar = Digest::MD5::hexdigest(email).downcase
    url = "http://gravatar.com/avatar/#{gravatar}.png?s=#{size}"
  end
end
# The first parameter, email, is the email address you wish to obtain the gravatar for. The second parameter, size, is the size of the gravatar you wish to render. To actually get the link to the gravatar, we obtain an MD5 hash of the email and then lowercase it and append it to the end of the gravatar url. The size is specified using the s parameter. To use this function, simple pass the newly generated Gravatar url to an image tag like this:

<%= image_tag gravatar_url("you@youremail.com", 64), alt: "" % >

# This will render the gravatar for that email address or a default image if the avatar doesn't exist. If you wish to specify your default image, you can modify your helper to look like the code listed below, changing the default url to whatever you wish:

def gravatar_url(email, size)
  gravatar_id = Digest::MD5::hexdigest(email).downcase
  default_url = "http://mysite.com/myavatar.png"
  url = "http://gravatar.com/avatar/#{gravatar_id}.png?s=#{size}&d=#{CGI::escape(default_url)}"
end