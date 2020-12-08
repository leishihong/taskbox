import React, { useRef, useState, Fragment } from 'react'
import { Form, Input, Table } from '@alifd/next'
import { Select, Switch } from 'antd'
import { TableList } from './ds'

const { Column } = Table
const { Option } = Select

const FormItem = Form.Item

const AlifdForm = () => {
  const IFormRef = useRef()
  const [_, forceUpdate] = useState([])
  const handelSwitchEnabled = (event, parentInd, childInd, { productId, discount }) => {
    TableList[parentInd].promotionVariations[childInd].enabled = !TableList[parentInd]
      .promotionVariations[childInd].enabled
    // const discountValues = `promotionVariations.${productId}.discount.${childInd}`
    // setFields({
    //   [discountValues]: {
    //     value: discount || '',
    //     errors: null
    //   }
    // })
    forceUpdate([TableList])
  }
  const handleSubmit = () => {}
  const rowSelection = {
    onChange: function (selectedKeys) {
      console.log(selectedKeys)
    }
  }
  return (
    <Form labelTextAlign="left" size="large" labelAlign="inset">
      <Table dataSource={TableList} rowSelection={rowSelection}>
        <Table.Column
          title="Promotion"
          dataIndex="variationName"
          cell={(value, index, record) => record.productId}
        />
        <Table.Column
          title="variationName"
          cell={(value, index, record) => {
            const findEnabled =
              record.promotionVariations && record.promotionVariations.filter(item => !item.enabled)
            return record.promotionVariations.map((item, ind) => {
              return (
                <FormItem style={{ marginBottom: 10 }} key={ind}>
                  <Switch
                    size="small"
                    checked={item.enabled}
                    disabled={
                      !(
                        findEnabled.length !== record.promotionVariations.length - 1 ||
                        !item.enabled
                      )
                    }
                    onChange={e => handelSwitchEnabled(e, index, ind, item)}
                  />
                </FormItem>
              )
            })
          }}
        />
        <Table.Column
          title="DiscountedPrice"
          cell={(value, index, record) => {
            return record.promotionVariations.map((item, ind) => {
              return (
                <FormItem
                  required={item.enabled}
                  style={{ marginBottom: 10 }}
                  key={`pre.${record.productId}.discountPrice.${ind}`}>
                  <Input
                    name={`pre.${record.productId}.discountPrice.${ind}`}
                    trim
                    defaultValue="frank"
                  />
                </FormItem>
              )
            })
          }}
        />
        <Table.Column
          title="Discount"
          cell={(value, index, record) => {
            return record.promotionVariations.map((item, ind) => {
              return (
                <FormItem
                  required={item.enabled}
                  style={{ marginBottom: 10 }}
                  key={`pre.${record.productId}.discount.${ind}`}>
                  <Input
                    name={`pre.${record.productId}.discount.${ind}`}
                    trim
                    defaultValue="frank"
                  />
                </FormItem>
              )
            })
          }}
        />
        <Table.Column
          title="PurchaseLimit"
          cell={(value, index, record) => {
            return (
              <Form.Item required style={{ marginBottom: 0 }}>
                <Input name={`pre.${record.productId}.purchaseLimit`} trim defaultValue="frank" />
              </Form.Item>
            )
          }}
        />
      </Table>
      <FormItem label=" ">
        <Form.Submit style={{ width: '100%' }} type="primary" validate onClick={handleSubmit}>
          Submit
        </Form.Submit>
      </FormItem>
    </Form>
  )
}

export default AlifdForm
