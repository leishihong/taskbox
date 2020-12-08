import React, { useRef, useState } from 'react'
import { Form, Rule, Switch, Select } from 'shineout'
import 'shineout/dist/theme.antd.css'
import { Table, Button, Input } from 'antd'
import { TableList } from './ds'

const { Column } = Table
const { Option } = Select

const rules = Rule(
  // validate function package
  {
    password: {
      func: (value, formData, cb, props) =>
        new Promise((resolve, reject) => {
          if (!/\d+/.test(value) || !/[a-z]+/i.test(value)) {
            reject(new Error(props.message.replace('{title}', props.title)))
          } else {
            resolve(true)
          }
        })
    },
    isExist: (value, _, callback) => {
      if (value.indexOf('so') >= 0) callback(new Error(`"${value}" is existed.`))
      else callback(true)
    }
  },
  // language package
  {
    password: {
      message: '{title} at least has one numeral and one letter'
    }
  }
)
let obg = {}
TableList.map(item => {
  item.promotionVariations.map((child, ind) => {
    obg[`pre.${item.productId}.discount.${ind}`] = 'This is required'
  })
})

export default function () {
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
  const error = () => {}

  return (
    <>
      <Form
        value={obg}
        throttle={500}
        // initValidate
        error={obg}
        formRef={f => (IFormRef.current = f)}
        scrollToError={30}
        onSubmit={d => console.log(d)}>
        <Table dataSource={TableList} rowKey={row => row.productId} pagination={false}>
          <Column
            title="variationName"
            render={(text, record, index) => {
              const findEnabled =
                record.promotionVariations &&
                record.promotionVariations.filter(item => !item.enabled)
              return record.promotionVariations.map((item, ind) => {
                return (
                  <div key={`pre.${record.productId}.discount.${ind}`}>
                    <Form.Item style={{ marginBottom: 0 }}>
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
                    </Form.Item>
                  </div>
                )
              })
            }}
          />
          <Column
            title="DiscountedPrice"
            render={(text, record, index) => {
              return record.promotionVariations.map((item, ind) => {
                return (
                  <div key={`pre.${record.productId}.discountPrice.${ind}`}>
                    <Form.Item required={item.enabled} style={{ marginBottom: 0 }}>
                      <Input
                        disabled={!item.enabled}
                        name={`pre.${record.productId}.discountPrice.${ind}`}
                        rules={[rules.required, rules.isExist]}
                      />
                    </Form.Item>
                  </div>
                )
              })
            }}
          />
          <Column
            title="Discount"
            render={(text, record, index) => {
              return record.promotionVariations.map((item, ind) => {
                return (
                  <div key={`pre.${record.productId}.discount.${ind}`}>
                    <Form.Item required={item.enabled} style={{ marginBottom: 0 }}>
                      <Input
                        disabled={!item.enabled}
                        name={`pre.${record.productId}.discount.${ind}`}
                        rules={[
                          item.enabled ? rules.required(item.enabled ? '必填项哦' : null) : null
                        ]}
                        maxLength={2}
                        addonAfter="%"
                      />
                    </Form.Item>
                  </div>
                )
              })
            }}
          />
          <Column
            title="PurchaseLimit"
            render={(text, record, index) => {
              return (
                <Form.Item required style={{ marginBottom: 0 }}>
                  <Input
                    name={`pre.${record.productId}.purchaseLimit`}
                    rules={[rules.required('必填项哦')]}
                    addonAfter={
                      <Select value={'PERCENT'} style={{ width: 60 }}>
                        <Option value="PERCENT">%</Option>
                        <Option value="VALUE">Rp</Option>
                      </Select>
                    }
                  />
                </Form.Item>
              )
            }}
          />
        </Table>
      </Form>
      <Button
        onClick={() => {
          IFormRef.current.submit()
          console.log(IFormRef.current, IFormRef.current.validate(), IFormRef.current.getValue())
        }}>
        Submit Form
      </Button>
    </>
  )
}
