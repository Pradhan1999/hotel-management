import { Button, Form, Input, Select, message, Row, Col, DatePicker } from 'antd';
import React, { useState } from 'react';
import { UploadOutlined, EyeOutlined, DeleteOutlined, LinkOutlined } from '@ant-design/icons';
import { addOrder } from '../../utility/services/orders';
import { uploadImage } from '../../utility/services/upload';

const { Option } = Select;

const AddOrder = ({ setIsAddOrder, getAllOrder }) => {
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    console.log(values);

    const body = values;
    setLoading(true);
    addOrder({
      body: body,
    })
      ?.then((res) => {
        message.success('Order added successfully');
        setIsAddOrder(false);
        getAllOrder({ start: 0, limit: 10 });
        setLoading(false);
        console.log('res', res);
      })
      .catch((err) => {
        message.error('Something went wrong');
        console.log('err :>> ', err);
        setLoading(false);
      });
  };
  return (
    <>
      <div>
        <Form
          name="cms"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row gutter={16}>
            {' '}
            {/* Add gutter to provide space between columns */}
            <Col span={12}>
              {' '}
              {/* Each field takes half of the row */}
              <Form.Item
                label="Name"
                name="customerName"
                rules={[
                  {
                    required: true,
                    message: 'Required! ',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Email"
                name="customerEmail"
                rules={[
                  {
                    required: true,
                    message: 'Required! ',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Check-in Date"
                name="checkInDate"
                rules={[
                  {
                    required: true,
                    message: 'Required! ',
                  },
                ]}
              >
                <DatePicker />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Check-out Date"
                name="checkOutDate"
                rules={[
                  {
                    required: true,
                    message: 'Required! ',
                  },
                ]}
              >
                <DatePicker />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Amount"
                name="amountToBePaid"
                rules={[
                  {
                    required: true,
                    message: 'Required! ',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Room Number"
                name="roomNumber"
                rules={[
                  {
                    required: true,
                    message: 'Required! ',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="roomType" label="Room Type">
                <Select
                  placeholder="Select option..."
                  // onChange={onGenderChange}
                  allowClear
                >
                  <Option value="Standard">Standard</Option>
                  <Option value="Deluxe">Deluxe</Option>
                  <Option value="Suite">Suite</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="status" label="Status">
                <Select
                  placeholder="Select option..."
                  // onChange={onGenderChange}
                  allowClear
                >
                  <Option value="payment_pending">Payment Pending</Option>
                  <Option value="completed">Completed</Option>
                  <Option value="confirmed">Confirmed</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <div className="flex justify-end gap-2 mt-2">
            <Button onClick={() => setIsAddOrder(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default AddOrder;
