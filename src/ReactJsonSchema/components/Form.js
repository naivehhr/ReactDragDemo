import React, { Component } from "react";
import PropTypes from "prop-types";

import { default as DefaultErrorList } from "./ErrorList";
import {
  getDefaultFormState,
  shouldRender,
  toIdSchema,
  setState,
  getDefaultRegistry,
  transformErrors
} from "../utils";
import './style.scss'
import validateFormData from "../validate";
import {
  Form,
  Input,
  Button
} from 'antd'
const FormItem = Form.Item
class _Form extends Component {
  static defaultProps = {
    uiSchema: {},
    noValidate: false,
    liveValidate: false,
    safeRenderCompletion: false,
    noHtml5Validate: false,
    ErrorList: DefaultErrorList,
  };

  constructor(props) {
    super(props);
    this.state = this.getStateFromProps(props);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.formData) {
      this.setState({formData: nextProps.formData});
    }
    if(nextProps.schema) {
      this.setState({schema: nextProps.schema});
    }
    if(nextProps.uiSchema) {
      this.setState({uiSchema: nextProps.uiSchema});
    }
  }

  getStateFromProps(props) {
    if (!props.schema) return {}
    const state = this.state || {};
    const schema = "schema" in props ? props.schema : this.props.schema;
    const uiSchema = "uiSchema" in props ? props.uiSchema : this.props.uiSchema;
    const edit = typeof props.formData !== "undefined";
    const liveValidate = props.liveValidate || this.props.liveValidate;
    const mustValidate = edit && !props.noValidate && liveValidate;
    const { definitions } = schema;
    const formData = getDefaultFormState(schema, props.formData, definitions);
    const { errors, errorSchema } = mustValidate
    ? this.validate(formData, schema)
    : {
      errors: state.errors || [],
      errorSchema: state.errorSchema || {},
    };
    const idSchema = toIdSchema(
      schema,
      uiSchema["ui:rootFieldId"],
      definitions
    );
    return {
      schema,
      uiSchema,
      idSchema,
      formData,
      edit,
      errors,
      errorSchema,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true
  }

  validate(formData, schema, idSchema) {
    const { validate } = this.props;
    return validateFormData(
      formData,
      schema,
      idSchema,
      validate,
      transformErrors
    );
  }

  renderErrors() {
    // const { errors, errorSchema, schema, uiSchema } = this.state;
    // const { ErrorList, showErrorList, formContext } = this.props;

    // if (errors.length && showErrorList != false) {
    //   return (
    //     <ErrorList
    //       errors={errors}
    //       errorSchema={errorSchema}
    //       schema={schema}
    //       uiSchema={uiSchema}
    //       formContext={formContext}
    //     />
    //   );
    // }
    // return null;
  }

  // onChange = (formData, options = { validate: false }) => {
  //   // const mustValidate =
  //   //   !this.props.noValidate && (this.props.liveValidate || options.validate);
  //   let state = { formData };
  //   // if (mustValidate) {
  //   //   const { errors, errorSchema } = this.validate(formData);
  //   //   state = { ...state, errors, errorSchema };
  //   // }
  //   setState(this, state, () => {
  //     if (this.props.onChange) {
  //       this.props.onChange(this.state);
  //     }
  //   });
  // };
  _onChange = (formData, options = { validate: false }) => {
    let state = { formData };
    setState(this, state, () => {
      if (this.props.onChange) {
        this.props.onChange(this.state);
      }
    });
  };

  // onBlur = (...args) => {
  //   if (this.props.onBlur) {
  //     this.props.onBlur(...args);
  //   }
  // };

  // onFocus = (...args) => {
  //   if (this.props.onFocus) {
  //     this.props.onFocus(...args);
  //   }
  // };

  onSubmit = event => {
    event.preventDefault();
    const { errors, errorSchema } = this.validate(this.state.formData, this.props.schema, this.state.idSchema);
    // 每次验证需要清掉之前的验证结果
    this.setState({
      errors: errors,
      errorSchema: errorSchema
    }, ()=> {
      if (Object.keys(errors).length == 0) {
        this.props.onSubmit && this.props.onSubmit(this.state.formData, (data)=> {
          // console.log('callback', data)
          // 设置后台返回的errorMsg
          const { formError } = data
          this.setState({
            errorSchema: formError
          })
        })
      } else {
        console.error('errorSchema', errorSchema)
        console.error('errors', errors)
      }
    })
    // if (Object.keys(errors).length > 0) {
    //   this.setState({ errors, errorSchema }, () => {
    //     if (this.props.onError) {
    //       this.props.onError(errors);
    //     } else {
    //       // console.error("Form validation failed", errors);
    //       // console.log(this.state)
    //     }
    //   });
    //   return;
    // } else {
    //   this.props.onSubmit && this.props.onSubmit(this.state.formData)
    // }

    // if(this.props.schema.exclude) {
    //   this.props.onSubmit && this.props.onSubmit(this.props.formData)
    //   return 
    // }
    
    // if (!this.props.noValidate) {
    //   const { errors, errorSchema } = this.validate(this.state.formData);
    //   if (Object.keys(errors).length > 0) {
    //     setState(this, { errors, errorSchema }, () => {
    //       if (this.props.onError) {
    //         this.props.onError(errors);
    //       } else {
    //         console.error("Form validation failed", errors);
    //       }
    //     });
    //     return;
    //   }
    // }

    // if (this.props.onSubmit) {
    //   this.props.onSubmit({ ...this.state, status: "submitted" });
    // }
    // this.setState({ errors: [], errorSchema: {} });

    // console.log('====================================');
    // console.log(event);
    // console.log('====================================');

    // this.props.form.validateFields((err, values) => {
    //   if (!err) {
    //     console.log('Received values of form: ', values);
    //     this.props.onSubmit && this.props.onSubmit(values.root)
    //   }
    // });

  };

  getRegistry() {
    // For BC, accept passed SchemaField and TitleField props and pass them to
    // the "fields" registry one.
    const { fields, widgets } = getDefaultRegistry();
    return {
      fields: { ...fields, ...this.props.fields },
      widgets: { ...widgets, ...this.props.widgets },
      ArrayFieldTemplate: this.props.ArrayFieldTemplate,
      FieldTemplate: this.props.FieldTemplate,
      definitions: this.props.schema.definitions || {},
      formContext: this.props.formContext || {},
      display: this.state.uiSchema["ui:display"] || false
    };
  }

  render() {
    const {
      children,
      safeRenderCompletion,
      id,
      className,
      name,
      method,
      target,
      action,
      autocomplete,
      enctype,
      acceptcharset,
      noHtml5Validate,
      onChange = this._onChange
    } = this.props;
    const { schema, uiSchema, formData, errorSchema, idSchema } = this.state;
    if (!schema) return <div />
    // let titleFormat = "object"
    // if (uiSchema["ui:titleFormat"]) {
    //   titleFormat = uiSchema["ui:titleFormat"]
    // }
    const registry = this.getRegistry();
    const _SchemaField = registry.fields.SchemaField;
    registry.formContext.myFormFun = this.props.form
    // if(schema.notAntdFormTrusteeship) {
    //   // 取消 AntdForm 托管
    //   registry.formContext.notAntdFormTrusteeship = schema.notAntdFormTrusteeship
    // }
    let title = schema.title
    // let _schema = Object.assign({}, schema)
    // if (titleFormat != "object") {
    //   delete _schema.title
    // }
    return (
      <div className="schemaform">
        {/* {
          title && (
            <div className="antd-form-title">
              {title}
            </div>
          )
        } */}
        <Form
          ref={this.props.ref || ''}
          className={className ? className : "antd-form"}
          id={id}
          name={name}
          method={method}
          target={target}
          action={action}
          autoComplete={autocomplete}
          encType={enctype}
          acceptCharset={acceptcharset}
          noValidate={noHtml5Validate}
          onSubmit={this.onSubmit}
        >
          {this.renderErrors()}
          <_SchemaField
            schema={schema}
            uiSchema={uiSchema}
            errorSchema={errorSchema}
            idSchema={idSchema}
            formData={formData}
            onChange={onChange}
            onBlur={this.onBlur}
            onFocus={this.onFocus}
            registry={registry}
            safeRenderCompletion={safeRenderCompletion}
            onSelect={this.props.onSelect}
          />
          {children ? (
            children
          ) : (
              <div className="antd-form-sub-btn">
                <Button
                  htmlType="submit"
                  type="primary"
                >提交</Button>
              </div>
            )}
        </Form>
      </div>
    );
  }
}

const WrappedHorizontalLoginForm = Form.create()(_Form);
export default WrappedHorizontalLoginForm

if (process.env.NODE_ENV !== "production") {
  Form.propTypes = {
    schema: PropTypes.object.isRequired,
    uiSchema: PropTypes.object,
    formData: PropTypes.any,
    widgets: PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object])
    ),
    fields: PropTypes.objectOf(PropTypes.func),
    ArrayFieldTemplate: PropTypes.func,
    FieldTemplate: PropTypes.func,
    ErrorList: PropTypes.func,
    onChange: PropTypes.func,
    onError: PropTypes.func,
    showErrorList: PropTypes.bool,
    onSubmit: PropTypes.func,
    id: PropTypes.string,
    className: PropTypes.string,
    name: PropTypes.string,
    method: PropTypes.string,
    target: PropTypes.string,
    action: PropTypes.string,
    autocomplete: PropTypes.string,
    enctype: PropTypes.string,
    acceptcharset: PropTypes.string,
    noValidate: PropTypes.bool,
    noHtml5Validate: PropTypes.bool,
    liveValidate: PropTypes.bool,
    validate: PropTypes.func,
    transformErrors: PropTypes.func,
    safeRenderCompletion: PropTypes.bool,
    formContext: PropTypes.object,
  };
}



