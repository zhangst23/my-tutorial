Database Migrations with Alembic, SQLAlchemy and Flask.py

# alembic init alembic
# config.py

def run_migration_online():
	#override sqlalchemy.url value to application's value
	alembic_config = config.get_section(config.config_ini_section)
	from myapp import config as app_config
	alembic_config['sqlalchemy.url'] = app_config.SQLALCHEMY_DATABASE_URI

	engine = engine_from_config(
				alembic_config,
				prefix='sqlalchemy.',
				poolclass=pool.NullPool)

	connection = enigine.connect()
	context.configure(
				connection=connection,
				target_metadata=target_metadata)

	try:
		with context.begin_transaction():
			context.run_migrations()
	finally:
		connection.close()









Autogenerating Migrations
One handy feature of Alembic is the ability to autogenerate migration files based on your SQLAlchemy models. This feature simply relies on specifying the MetaData object for your models. Given that I was using Flask-SQLAlchemy all I had to do was pass the preconfigured MetaData object to Alembic. This object is accessible on the instance of the Flask-SQLAlchemy extension object which in my app happens to in the myapp.core module.

Within env.py you'll see a commented out line that may look like the following:

# target_metadata = mymodel.Base.metadata
In my case I changed this the following:

from myapp.core import db
target_metadata = db.metadata
Now with my properly configured database connection and MetaData object in place I can autogenerate migrations with the following command:

$ alembic revision --autogenerate -m "Added some table"
Just bear in mind that autogenerating migrations isn't the end all be all command. I does not account for everything that can be done during a migration. For instance, if you want to add indexes on particular fields you'll need to write that in yourself. Lastly, if you add anything by hand remember to modify both the upgrade and downgrade methods!































































