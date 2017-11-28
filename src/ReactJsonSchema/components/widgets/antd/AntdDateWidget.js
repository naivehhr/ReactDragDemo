import React from "react";
import PropTypes from "prop-types";

import { DatePicker, Form } from 'antd';
import moment from 'moment'
const FormItem = Form.Item
import { getErrorMsg } from './utils'
import { formItemLayout } from './constant'
import './style.scss'
function AntdDateWidget(props) {
  const { onChange } = props;
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
    errors,
    ...inputProps
  } = props;
  const { getFieldDecorator, getFieldValue, setFieldsValue, getFieldsError, getFieldError, isFieldTouched } = props.formContext.myFormFun
  // console.log('props', props)
  // const formItemLayout = {
  //   labelCol: { span: 3 },
  //   wrapperCol: { span: 5 }
  // };

  let _onChange = (event, dateStr) => {
    onChange && onChange(dateStr, id)
  }

  let errMsg = getErrorMsg(errors)(id)

  let validateStatus
  if (!errMsg && value) {
    validateStatus = 'success'
  } else if (errMsg) {
    validateStatus = 'error'
  }

  return (
    <FormItem
      colon={false}
      required={required}
      label={label}
      validateStatus={validateStatus}
      help={errMsg}
      className="form-item"
      {...formItemLayout}
    >
      <DatePicker 
        id={id} 
        disabled={readonly}
        style={{ width: "100%" }} 
        value={value?moment(value, 'YYYY-MM-DD'): undefined} 
        onChange={_onChange} />
    </FormItem>
  )

  // return (
  //   <FormItem colon={false} label={label} {...formItemLayout}>
  //     {getFieldDecorator(id, {
  //       rules: [{ required: required, message: '不能为空' }],
  //       initialValue: value && moment(value, 'YYYY-MM-DD') || ''
  //     })(
  //       <DatePicker style={{width: "100%"}}/>
  //       )}
  //   </FormItem>
  // );
}

if (process.env.NODE_ENV !== "production") {
  AntdDateWidget.propTypes = {
    value: PropTypes.string,
  };
}

export default AntdDateWidget;
