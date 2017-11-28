import React from "react";
import PropTypes from "prop-types";
import {
	Row,
	Col,
	Form,
	Button,
	Icon,
	Upload,
	message
} from 'antd';
const FormItem = Form.Item
function AntdFileWidget(props) {
	const {
		id,
		value,
		readonly,
		disabled,
		autofocus,
		onBlur,
		onFocus,
		options,
		schema,
		formContext,
		registry,
		label,
		required,
		...inputProps
	} = props;

	const { getFieldDecorator, getFieldValue, setFieldsValue, getFieldsError, getFieldError, isFieldTouched } = props.formContext.myFormFun
	const formItemLayout = {
		labelCol: { span: 3 },
		wrapperCol: { span: 5 }
	};
	const fileProps = {
		name: 'file',
		action: '//jsonplaceholder.typicode.com/posts/',
		headers: {
			authorization: 'authorization-text',
		},
		onChange(info) {
			if (info.file.status !== 'uploading') {
				console.log(info.file, info.fileList);
			}
			if (info.file.status === 'done') {
				message.success(`${info.file.name} file uploaded successfully`);
			} else if (info.file.status === 'error') {
				message.error(`${info.file.name} file upload failed.`);
			}
		},
	};

	return (
		<FormItem colon={false} label={label} {...formItemLayout}>
			<Upload {...fileProps} id={id}>
				<Button>
					<Icon type="upload" /> 上传
			</Button>
			</Upload>
		</FormItem>
	)

	// return (
	// 	<FormItem colon={false} label={label} {...formItemLayout}>
	// 		{getFieldDecorator(id, {
	// 			rules: [{ required: required, message: '不能为空' }],
	// 			initialValue: value
	// 		})(
	// 			<Upload {...fileProps}>
	// 				<Button>
	// 					<Icon type="upload" /> 上传
  //   			</Button>
	// 			</Upload>
	// 			)}
	// 	</FormItem>
	// )

}

if (process.env.NODE_ENV !== "production") {
	AntdFileWidget.propTypes = {
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	};
}

export default AntdFileWidget;
