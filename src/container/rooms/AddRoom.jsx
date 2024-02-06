import { Button, Form, Input, InputNumber, Select, Upload, message } from 'antd';
import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { addRooms } from '../../utility/services/rooms';

const { Option } = Select;
const { TextArea } = Input;

const AddRoom = ({ setisAddRoom, isEditRoom, setIsEditRoom, getAllRoomList }) => {
  const [fileList, setFileList] = useState([]);
  console.log('fileList', fileList);

  const handleChange = (info) => {
    let newFileList = [...info.fileList];

    newFileList = newFileList.map((file) => {
      if (file.response) {
        file.url = file.response.url;
      }
      return file?.originFileObj;
    });
    setFileList(newFileList);
  };
  const onFinish = (values) => {
    const body = {
      roomNumber: values?.roomNumber,
      type: values?.type,
      status: values?.status,
      price: values?.price,
      // images: values?.roomNumber,
    };

    addRooms({
      body: body,
    })
      ?.then((res) => {
        console.log('res', res);
        getAllRoomList();
      })
      .catch((err) => {
        console.log('err :>> ', err);
      });
  };
  return (
    <>
      <div>
        <Form
          name="Rooms"
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
            <Upload multiple={true} onChange={handleChange} fileList={fileList}>
              <Button className="flex items-center" icon={<UploadOutlined />}>
                Click to Upload
              </Button>
            </Upload>
          </Form.Item>

          <div className="flex justify-end gap-2">
            <Button
              onClick={() => {
                setisAddRoom(false);
                setIsEditRoom({ isOpen: false, roomId: '' });
              }}
            >
              Cancel
            </Button>
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
