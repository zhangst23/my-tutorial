Flask-Paginate.py
1.0
pagination = Pagination(...,css_framework='foundation',**kwargs)

{{ pagination.info }}

{{ pagination.links }}

2.0
pip install -U flask-paginate


3.0  Configuration

.pagination-page-info{
	padding:.6em;
	padding-left:0;
	width:40em;
	margin:.5em;
	margin-left:0;
	font-size:12px;
}


.pagination-page-info b{
	color:black;
	background:#6aa6ed;
	padding-left:2px;
	padding:.1em .25em;
	font-size:150%;
}




4.0  How to use
# In your flask views file (e.g. views/users.py):
from flask import Blueprint
from flask.ext.paginate import Pagination

mod = Blueprint('users',__name__)

@mod.route('/')
def index():
	search = False
	q = request.args.get('q')
	if q:
		search = True
	try:
		page = int(request.args.get('page',1))
	except ValueError:
		page = 1

	users = User.find(...)
	pagination = Pagination(page=page,total=users.count(),search=search,record_name='users')
	return render_template('users/index.html',
							users=users,
							pagination=pagination,
							)




# In the users/index.html:
{{ pagination.info }}
{{ pagination.links }}
<table>
	<thead>
		<tr>
			<th>&&</th>
			<th>Name</th>
			<th>Email</th>
		</tr>
	</thead>
	<tbody>
	  {% for user in users %}
		<tr>
			<td>{{ loop.index + users.skip }}</td>
			<td>{{ user.name }}</td>
			<td>{{ user.email }}</td>
		</tr>
	  {% endfor %}
	</tbody>
</table>
{{ pagination.links }}

























































