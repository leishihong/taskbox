import React, { useRef } from 'react'
import {
  Table,
  Button,
  Form,
  Input,
  FormGroup,
  ControlLabel,
  FormControl,
  Schema,
  Avatar,
  List,
  FlexboxGrid,
  Checkbox
} from 'rsuite'
// import { Form, Input } from 'antd'
import BuiderHoc from './Buider'
import './rsuite.less'
import { TableList } from './ds'
import RcForm from './RcForm'
import FinalForm from './FinalForm'
import Formily from './Formily'
import AlifdForm from './AlifdForm'
const { StringType, NumberType } = Schema.Types

const { Column, HeaderCell, Cell } = Table
const ListItem = List.Item

const styleCenter = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '60px'
}

let obg = {}
TableList.map(item => {
  item.promotionVariations.map((child, ind) => {
    obg[`pre.${item.productId}.discount.${ind}`] = StringType().isRequired(
      'This field is required.'
    )
  })
})
function App(props) {
  const {
    // form: { getFieldDecorator }
  } = props
  const FormRef = useRef()

  function TextField(props) {
    const { name, label, accepter, ...rest } = props
    return (
      <FormGroup>
        <ControlLabel>{label} </ControlLabel>
        <FormControl name={name} accepter={accepter} {...rest} />
      </FormGroup>
    )
  }
  const model = Schema.Model({
    ...obg,
    name: StringType().isRequired('This field is required.')
  })
  const handelSubmit = () => {
    // props.form.validateFieldsAndScroll((error, values) => {
    //   console.log(error, values)
    // })
    // FormRef.current.handleSubmit()
    console.log(FormRef.current.handleFieldSuccess(), 'FormRef.current')
    console.log(FormRef.current.checkAsync())
    // FormRef.current.handelSubmit()
    console.log(FormRef.current.getFormValue(), 'Ref')
  }

  return (
    <div>
      <AlifdForm />
      {/* <RcForm /> */}
      {/* <Formily /> */}
      {/* <FinalForm></FinalForm> */}
      {/* <BuiderHoc obg={obg} /> */}
      {/* <Button appearance="primary" onClick={() => handelSubmit()}>
        Button
      </Button>
      <Form model={model} ref={FormRef}>
        <Table
          // virtualized
          loading={false}
          // ref={FormRef}
          bordered
          wordWrap={true}
          autoHeight
          // affixHeader
          renderEmpty={() => 'wushuju '}
          // affixHorizontalScrollbar
          data={TableList}
          onRowClick={data => {
            console.log(data)
          }}>
          <Column width={170}>
            <HeaderCell>Product Name</HeaderCell>
            <Cell>
              {(rowData, index) => {
                return (
                  <div>
                    <Avatar size="lg" src={rowData.productImage} />
                    {rowData.productName}
                  </div>
                )
              }}
            </Cell>
          </Column>

          <Column width={200}>
            <HeaderCell>Variation</HeaderCell>
            <Cell>
              {rowData => {
                // return rowData.promotionVariations.map((item, ind) => (
                //   <Form.Item style={{ marginBottom: 0 }}>
                //     {getFieldDecorator(`per.${rowData.productId}.shop.${ind}`, {
                //       rules: [{ required: true, message: 'This file is required' }]
                //     })(<Input />)}
                //   </Form.Item>
                // ))
                return rowData.promotionVariations.map((item, ind) => (
                  <TextField name={`pre.${rowData.productId}.discount.${ind}`} />
                ))
              }}
            </Cell>
          </Column>

          <Column width={200}>
            <HeaderCell>Original Price</HeaderCell>
            <Cell>
              {rowData => {
                return 'wordWrapwordWrapwordWrapwordWrapwordWrapwordWrapwordWrapwordWrapwordWrapwordWrapwordWrapwordWrapwordWrapwordWrapwordWrapwordWrapwordWrapwordWrapwordWrapwordWrap'
                // <Form model={model}>
                //   <TextField name={rowData.shopName} />
                // </Form>
              }}
            </Cell>
          </Column>

          <Column width={200}>
            <HeaderCell>Discounted Price</HeaderCell>
            <Cell dataKey="city" />
          </Column>

          <Column width={200}>
            <HeaderCell>Discount</HeaderCell>
            <Cell dataKey="street" />
          </Column>

          <Column width={300}>
            <HeaderCell>Purchase Limit</HeaderCell>
            <Cell dataKey="companyName" />
          </Column>
          <Column width={120} fixed="right">
            <HeaderCell>Action</HeaderCell>
            <Cell>
              {rowData => {
                function handleAction() {
                  alert(`id:${rowData.id}`)
                }
                return (
                  <span>
                    <a onClick={handleAction}> Edit </a> | <a onClick={handleAction}> Remove </a>
                  </span>
                )
              }}
            </Cell>
          </Column>
        </Table>
      </Form> */}
    </div>
  )
}

export default App
