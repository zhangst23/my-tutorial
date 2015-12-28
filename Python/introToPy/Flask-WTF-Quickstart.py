Flask-WTF-Quickstart.py


1.0
from flask_wtf import Form
from wtforms import StringField
from wtforms.validators import DataRequired

class MyForm(Form):
	name = StringField('name',validators=[DataRequired()])


2.0
<form method="POST" action="/">
	{{form.csrf_token}}
	{{form.name.label}} {{form.name(size=20)}}
	<input type="submit" value="Go">
</form>


3.0
<form method="POST" action="/">
	{{form.hidden_tag()}}
	{{form.name.label}} {{form.name(size=20)}}
	<input type="submit" value="Go">
</form>

4.0 
@app.route('/submit',method=('GET','POST'))
def submit():
	form = MyForm()
	if form.validators_on_submit():
		return redirect('/success')
	return render_template('submit.html',form=form)



5.0   Secure Form
form = Form(csrf_enabled=False)

WTF_CSRF_ENABLED = False

WTF_CSRF_SECRET_KEY = 'a random string'


6.0   File Uploads

#  eg:
from werkzeug import secure_filename
from flask_wtf.file import FileField

class PhotoForm(Form):
	photo = FileField('Your photo')

@app.route('/uploads',method=('GET','POST'))
def upload():
	form = PhotoForm()
	if form.validate_on_submit():
		filename = secure_filename(form.photo.data.filename)
		form.photo.data.save('uploads' + filename)
	else:
		filename = None
	return render_template('upload.html',form=form,filename=filename)

#  Remember to set the enctype of your HTML form to multipart/form-data, which means:
<form action="/upload/" method="POST" enctype="multipart/form-data">
	...
</form>


7.0  
# More than that, Flask-WTF supports validation on file uploading. There are FileRequired and FileAllowed.
# The FileAllowed works well with Flask-Uploads, for example:

from flask.ext.uploads import UploadSet,IMAGES
from flask_wtf import Form
from flask_wtf.file import FileField,FileAllowed,FileRequired

images = UploadSet('images',IMAGES)

class UploadForm(Form):
	upload = FileField('image',validators=[
		FileRequired(),
		FileAllowed(images,'Images only!')
		])


# It can work without Flask-Uploads too. You need to pass the extensions to FileAllowed:
class UploadForm(Form):
	upload = FileField('image',validators=[
		FileRequired(),
		FileAllowed(['jpg','png'],'Images only!')
		])


# HTML5 Widgets
from wtforms.fields.html5 import URLField
from wtforms.validators import url

class LinkForm(Form):
	url = URLField(validators=[url()])


# Flask-WTF also provides Recaptcha support through a RecaptchaField:
from flask_wtf import Form,RecaptchaField
from wtforms import TextField

class SignupForm(Form):
	username = TextField('Username')
	recaptcha = RecaptchaField()

	




