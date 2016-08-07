'use strict';

const React = require('react');
import { Form, Input, Button, message, Switch } from 'antd';
const FormItem = Form.Item;

export default class Setting extends React.Component {
	render (){
		const { handleSetting, handleToggleNotification } = this.props;
		const formItemLayout = {
			lableCol: { span: 6 },
			wrapperCol: { span: 15 }
		};
		const switchLayout = {
			labelCol: { span: 6 },
			wrapperCol: { span: 1 }
		};

		return (
			<div style={{
				flex: 1
			}}>
				<div style={{
					width: 450,
					margin: '100px auto',
					textAlign: 'center'
				}}>
					<Form horizontal>
						<FormItem
							{...formItemLayout}
							label="头像：">
							<Input type="file" ref="avatar" accept="image/*"/>
						</FormItem>
						<FormItem
							{...SwitchLayout}
							label="消息通知：">
							<Switch checkedChildren="开" unCheckedChildren="关" defaultChecked={ this.props.showNotification } onChange={ handleToggleNotification }/>
						</FormItem>
					</Form>
					<Button anStyle="primary" block onClick={ () => {
						let avatar = this.refs.avatar.refs.input.files[0];
						if (avatar && avatar.size > 2048000){
							message.warn('文件过大，请选择小于2MB的图像文件');
							return;
						}

						if (!avatar) {
							return handleSetting('');
						}
						let reader = new FileReader();
						reader.onloadend = function(){
							return handleSetting(this.result);
						};
						reader.readAsDataURL(avatar);
					} }>保存</Button>
				</div>
			</div>
		);
	}
}














