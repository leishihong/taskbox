import React from 'react'
import useForm from 'rc-form-hooks'
import { Input, Button } from 'antd'
export default () => {
  const { getFieldDecorator, validateFields, errors, values } = useForm()
  const handleSubmit = e => {
    e.preventDefault()
    validateFields()
      .then(console.log)
      .catch(e => console.error(e.message))
  }
  return (
    <form onSubmit={handleSubmit}>
      {getFieldDecorator('username', {
        rules: [{ required: true, message: 'Please input username!' }]
      })(<Input type="text" />)}
      <span className={'value'}>{values.username}</span>
      <span className={'error'}>{errors.username?.message}</span>
      <Button
        onClick={() => {
          console.log(errors, 'errors')
          validateFields()
            .then(console.log)
            .catch(e => console.error(e.message))
        }}>
        submit
      </Button>
    </form>
  )
}
