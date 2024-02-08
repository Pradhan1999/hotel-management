import { Button, Form, Input, Select, Upload, message } from 'antd';
import React, { useState } from 'react';
import { UploadOutlined, EyeOutlined, DeleteOutlined, LinkOutlined } from '@ant-design/icons';
import { addRooms } from '../../utility/services/rooms';
import { uploadImage } from '../../utility/services/upload';

const { Option } = Select;

const AddRoom = ({ setisAddRoom }) => {
  const [filesData, setFilesData] = useState([]);
  const [previewImage, setPreviewImage] = useState('');
  const [isPreviewModal, setIsPreviewModal] = useState(false);
  const [previewTitle, setPreviewTitle] = useState();
  const [loading, setLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);

  const handleChange = (info) => {
    setUploadLoading(true);

    const formData = new FormData();
    formData.append('file', info.file.originFileObj);

    // uploadImage(formData)
    //   .then((res) => {
    setFilesData((prev) => [
      ...prev,
      {
        id: info.file.uid,
        file: info.file.originFileObj,
        // name: res?.data?.name
      },
    ]);
    setUploadLoading(false);
    // })
    // .catch((err) => {
    //   message.error('Error while uploading');
    //   setUploadLoading(false);
    // });
  };

  const handlePreview = async (file_) => {
    const file = file_;
    setPreviewImage(file?.prodUrl ? file?.prodUrl : URL.createObjectURL(file?.file));
    setIsPreviewModal(true);
    setPreviewTitle(file?.file ? file?.file?.name : file?.name);
  };

  const onFinish = (values) => {
    console.log(values);

    const body = {};

    addRooms({
      body: body,
    })
      ?.then((res) => {
        console.log('res', res);
      })
      .catch((err) => {
        console.log('err :>> ', err);
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
          <Form.Item
            label="Title"
            name="title"
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
            <Select placeholder="Select option..." allowClear>
              <Option value="Header-Banner">Header-Banner</Option>
              <Option value="Footer">Footer</Option>
              <Option value="Contact-Us">Contact-Us</Option>
              <Option value="About-Us">About-Us</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Image" name="image">
            <Upload onChange={handleChange} fileList={[]}>
              <Button className="flex items-center" icon={<UploadOutlined />}>
                Click to Upload
              </Button>
            </Upload>
            <div className="w-full" style={{ maxHeight: '230px', overflowY: 'auto' }}>
              {filesData?.length > 0 &&
                filesData?.map((val) => (
                  <div key={val?.id} className="flex border rounded-md justify-between items-center p-1 px-3 my-1">
                    <div className="flex">
                      <span className="mr-2">
                        <LinkOutlined />
                      </span>
                      {val?.file ? val?.file?.name : val?.name}
                    </div>
                    <div className="flex gap-3 text-base">
                      <div className="cursor-pointer">
                        <div
                          onClick={() => {
                            handlePreview(val);
                          }}
                        >
                          <EyeOutlined />
                        </div>
                      </div>
                      <div className="cursor-pointer">
                        <div
                          onClick={() => {
                            const filteredRemovedFiles = filesData?.filter((elem) =>
                              elem?.file ? elem?.file?.uid !== val?.id : elem?.id !== val?.id,
                            );
                            setFilesData(filteredRemovedFiles);
                          }}
                        >
                          <DeleteOutlined style={{ color: 'red' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
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
