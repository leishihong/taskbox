import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'

import { Form } from 'antd-form-component'
import { Button, Table, Input as AntdInput } from 'antd'
import './rsuite.less'
import { TableList } from './ds'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { ErrorMessage } from '@hookform/error-message'

const { Column } = Table
let obg = {}
TableList.map(item => {
  item.promotionVariations.map((child, ind) => {
    obg[`pre[${item.productId}].discount.${ind}`] = yup.string().required()
  })
})
const schema = yup.object().shape(obg)
const Demo = ({ obg }) => {
  // const {
  //   form: { getFieldDecorator, validateFields, customComponent }
  // } = props
  const {
    control,
    register,
    handleSubmit,
    errors,
    formState,
    watch,
    trigger,
    clearErrors,
    setValue,
    getValues,
    reset
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    shouldFocusError: true,
    shouldUnregister: true,
    defaultValues: {},
    criteriaMode: 'firstError',
    // resolver: yupResolver(schema),
    fieldArrayValuesRef: Object.keys(obg)
  })
  const [_, fUpdate] = useState([])
  const onSubmit = async data => {
    const res = await trigger(Object.keys(obg))
    console.log(res, 'res')
    // console.log(getValues())
    console.log(data, errors, 'ceshi')
  }
  // const { dirtyFields } = formState

  // check your dev console, it's a Set
  // console.log(formState, 'dirtyFields')

  // const handleOnsubmit = e => {
  //   e.preventDefault()
  //   validateFields((err, values) => {
  //     console.log('values: ', values)
  //     if (err) {
  //       console.log('表单错误', err)
  //       return
  //     } else {
  //       console.log('表单值: ', values)
  //     }
  //   })
  // }
  return (
    <form>
      <input type="submit" />
      <Button onClick={onSubmit}>Submit</Button>
      <Button
        onClick={() => {
          // setValue('pre.PR5F2D2C194CEDFD0001084E5A.discount.0', '123', {
          //   shouldValidate: true,
          //   shouldDirty: true
          // })
          reset(
            {
              ['pre.PR5F2D2C194CEDFD0001084E5A.discount.0']: 111
            },
            {
              errors: true, // errors will not be reset
              dirtyFields: true, // dirtyFields will not be reset
              isDirty: true, // dirty will not be reset
              isSubmitted: false,
              touched: false,
              isValid: false,
              submitCount: false
            }
          )
        }}>
        setValue
      </Button>
      {/* <Controller
        as={AntdInput}
        name="pre.PR5F2D2C194CEDFD0001084E5A.shop.1"
        control={control}
        // rules={{ required: true }}
        // defaultValue="cd"
        required
        // render={() => <AntdInput allowClear required style={{ width: 200 }} />}
      /> */}
      <Table dataSource={TableList} rowKey={row => row.productId}>
        <Column
          title="shop"
          render={(text, record, index) => {
            return record.promotionVariations.map((item, ind) => {
              return (
                <div style={{ marginBottom: 10 }} key={`pre.${record.productId}.discount.${ind}`}>
                  <Controller
                    // as={<AntdInput style={{ width: 200 }} />}
                    name={`pre.${record.productId}.discount.${ind}`}
                    control={control}
                    // rules={{ required: true }}
                    ref={register(`pre.${record.productId}.discount.${ind}`, {
                      required: 'This is required.',
                      validate: {
                        message: value => {
                          console.log(value, '测试数据')
                          return 11 <= value
                            ? clearErrors(`pre.${record.productId}.discount.${ind}`)
                            : '数据校验是失败重新填写'
                        }
                      }
                      // message: 'This is required.'
                    })}
                    // defaultValue=""
                    // required
                    render={({ onChange, onBlur, value, ref }) => (
                      <AntdInput
                        onChange={e => onChange(e)}
                        allowClear
                        name={`pre.${record.productId}.discount.${ind}`}
                        onBlur={onBlur}
                        required
                        defaultValue={12}
                        // ref={register(`pre.${record.productId}.discount.${ind}`, {
                        //   required: true
                        // })}
                        // inputRef={ref}
                        style={{ width: 200 }}
                        value={value}
                      />
                    )}
                  />
                  <div style={{ color: 'red' }}>
                    <ErrorMessage
                      errors={errors}
                      name={`pre[${record.productId}].discount[${ind}]`}
                      message="message"
                    />
                  </div>

                  {/* <input
                    className="form-control"
                    type="text"
                    placeholder="Username"
                    name={`pre.${record.productId}.discount.${ind}`}
                    ref={register({
                      required: true,
                      maxLength: 20
                    })}
                  /> */}
                  {errors[`pre[${record.productId}].discount[${ind}]`]}
                  {errors[`pre.${record.productId}.discount.${ind}`] &&
                    errors[`pre.${record.productId}.discount.${ind}`]?.message}
                  {/* <div>This field is required</div> */}
                  {/* <input
                    placeholder={`Username-${ind}`}
                    required
                    // aria-describedby="helpId"
                    // aria-errormessage="This field is required"
                    // errorClass={errors[`pre.${record.productId}.shop.${ind}`] ? 'true' : 'false'}
                    name={`pre.${record.productId}.discount.${ind}`}
                    ref={register({
                      required: true
                      // maxLength: 6,
                      // minLength: 2
                      // validate: {
                      //   message: value =>
                      //     value === watch('password') ? clearError() : 'confirm password fail'
                      // }
                    })}
                  />
                  {errors[`pre.${record.productId}.discount.${ind}`]} */}
                  {/* {errors[`pre.${record.productId}.discount.${ind}`] && (
                    <div role="alert">This field is required</div>
                  )} */}
                </div>
              )
            })
          }}></Column>
      </Table>
    </form>
    // <Form onSubmit={handleOnsubmit} size="default" hasFeedback horizontal>

    //   {/* <Input name="text1" required value="" label="随意" placeholder="请输入！" /> */}
    //   <Form.Item>
    //     <Button htmlType="submit">提交</Button>
    //   </Form.Item>
    // </Form>
  )
}

export default Demo
