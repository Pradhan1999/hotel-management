import { Button, Form, Input, InputNumber, Select, Upload } from 'antd';
import React from 'react';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;
const { TextArea } = Input;

const AddRoom = ({ setisAddRoom }) => {
  const onFinish = (values) => {
    console.log(values);
  };
  return (
    <>
      <div>
        {/* <Form name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
          <Form.Item
            name={['user', 'name']}
            label="Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['user', 'email']}
            label="Email"
            rules={[
              {
                type: 'email',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['user', 'age']}
            label="Age"
            rules={[
              {
                type: 'number',
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item name={['user', 'website']} label="Website">
            <Input />
          </Form.Item>
          <Form.Item name={['user', 'introduction']} label="Introduction">
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              ...layout.wrapperCol,
              offset: 8,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form> */}
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
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
          <Form.Item name="type" label="Type">
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

          <Form.Item label="Description" name="description">
            <TextArea />
          </Form.Item>

          <Form.Item name="status" label="Status">
            <Select
              placeholder="Select option..."
              // onChange={onGenderChange}
              allowClear
            >
              <Option value="Active">Active</Option>
              <Option value="InActive">InActive</Option>
              <Option value="Booked">Booked</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Price" name="price">
            <InputNumber className="w-full" />
          </Form.Item>

          <Form.Item label="Image" name="image">
            <Upload>
              <Button className="flex items-center" icon={<UploadOutlined />}>
                Click to Upload
              </Button>
            </Upload>
          </Form.Item>

          <div className="flex justify-end gap-2">
            <Button onClick={() => setisAddRoom(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default AddRoom;
