import React from 'react';
import { Field, reduxForm } from 'redux-form';


class Login extends React.Component {
	handleFormSubmig = (values) => {
		console.log(values);
	};

	render(){
		return (
			<div className="container">
				<div className="col-md-6 col-md-offset-3">
					<h2 className="text-center">Log In</h2>
					<form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
						<fieldset className="form-group">
							<label>Email</label>
							<Field className="form-control" name="email" component="input" type="text" placeholder="Email"/>
						</fieldset>
						<fieldset className="form-group">
							<label>Password</label>
							<Field className="form-control" name="email" component="input" type="password" placeholder="Password"/>
						</fieldset>
						<button action="submit" className="btn btn-primary">Sign In</button>
					</form>
				</div>
			</div>
		);
	}
}



export default reduxForm({
	form: 'login'
})(Login);












