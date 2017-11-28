import React from "react";
import PropTypes from "prop-types";
import './style.scss'
import { Row, Col, Form, InputNumber } from 'antd';
import { getErrorMsg } from './utils'
import { formItemLayout } from './constant'
import './style.scss'

const FormItem = Form.Item
function AntdNumberWidget(props) {
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
		onChange,
		errors,
		...inputProps
	} = props;

	const { getFieldDecorator, getFieldValue, setFieldsValue, getFieldsError, getFieldError, isFieldTouched } = props.formContext.myFormFun
	// const formItemLayout = {
	// 	labelCol: { span: 3 },
	// 	wrapperCol: { span: 5 }
	// };
	let errMsg = getErrorMsg(errors)(id)
	let validateStatus
	if (!errMsg && value) {
		validateStatus = 'success'
	} else if (errMsg) {
		validateStatus = 'error'
	}
	let _onChange = (event) => {
		onChange && onChange(event, id)
	}

	return (
		<FormItem colon={false}
			required={required}
			label={label}
			validateStatus={validateStatus}
			help={errMsg}
			className="form-item"
			{...formItemLayout}
		>
			<InputNumber
				id={id}
				onChange={_onChange}
				min={0}
				disabled={readonly}
				value={value}
				formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
				parser={value => value.replace(/\$\s?|(,*)/g, '')}
			/>
		</FormItem>
	)

	// return (
	// 	<FormItem colon={false} label={label} {...formItemLayout}>
	// 		{getFieldDecorator(id, {
	// 			rules: [{ required: required, message: '不能为空' }],
	// 			initialValue: value
	// 		})(
	// 			<InputNumber
	// 				min={0}
	// 				formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
	// 				parser={value => value.replace(/\$\s?|(,*)/g, '')}
	// 			/>
	// 			)}
	// 	</FormItem>
	// )

}

if (process.env.NODE_ENV !== "production") {
	AntdNumberWidget.propTypes = {
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	};
}

export default AntdNumberWidget;
