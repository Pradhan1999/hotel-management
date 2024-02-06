import { Button, Form, Input, InputNumber, Modal, Select, Upload, message } from 'antd';
import React, { useState } from 'react';
import { UploadOutlined, EyeOutlined, DeleteOutlined, LinkOutlined } from '@ant-design/icons';
import { addRooms } from '../../utility/services/rooms';
import { uploadImage } from '../../utility/services/upload';

const { Option } = Select;
const { TextArea } = Input;

const AddRoom = ({ setisAddRoom, isEditRoom, setIsEditRoom, getAllRoomList }) => {
  const [contents, setContents] = useState([]);
  const [previewImage, setPreviewImage] = useState();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewTitle, setPreviewTitle] = useState();
  const [firstImageUpload, setFirstImageUpload] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const [uploadLoading, setUploadLoading] = useState(false);

  const handleChange = (info) => {
    setUploadLoading(true);
    setFirstImageUpload(true);
    setContents((prev) => [...prev, info.file.originFileObj]);
    const formData = new FormData();
    formData.append('file', info.file.originFileObj);

    uploadImage(formData)
      .then((res) => {
        setImageUrls((prev) => [...prev, { id: info.file.uid, name: res?.data?.name }]);
        setUploadLoading(false);
      })
      .catch((err) => {
        console.log('err', err);
        setUploadLoading(false);
      });
  };

  const handlePreview = async (file_) => {
    const file = file_;
    setPreviewImage(file?._id ? file?.url : URL.createObjectURL(file));
    setPreviewVisible(true);
    setPreviewTitle(file?.name || file?.url.substring(file?.url.lastIndexOf('/') + 1));
  };

  const onFinish = (values) => {
    const body = {
      roomNumber: values?.roomNumber,
      type: values?.type,
      status: values?.status,
      price: values?.price,
      images: imageUrls && imageUrls.map((item) => item?.name),
    };

    addRooms({
      body: body,
    })
      ?.then((res) => {
        message.success('Room added successfully');
        setisAddRoom(false);
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
            <Upload onChange={handleChange} fileList={[]}>
              <Button className="flex items-center" icon={<UploadOutlined />}>
                Click to Upload
              </Button>
            </Upload>
            <div className="w-full" style={{ maxHeight: '230px', overflowY: 'auto' }}>
              {contents?.length > 0 &&
                contents?.map((val) => (
                  <div key={val?.url} className="flex border rounded-md justify-between items-center p-1 px-3 my-1">
                    <div className="flex">
                      <span className="mr-2">
                        <LinkOutlined />
                      </span>
                      {val?.url ? val?.url?.substring(val?.url.lastIndexOf('/') + 1) : val?.name}
                    </div>
                    <div className="flex gap-3 text-base">
                      <div className="cursor-pointer">
                        {firstImageUpload && (
                          <div
                            onClick={() => {
                              handlePreview(val);
                            }}
                          >
                            <EyeOutlined />
                          </div>
                        )}
                      </div>
                      <div className="cursor-pointer">
                        <div
                          onClick={() => {
                            const files = contents?.filter((v) => v?.uid !== val?.uid || v?._id !== val?._id);
                            setContents(files);
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
            <Button
              onClick={() => {
                setisAddRoom(false);
                setIsEditRoom({ isOpen: false, roomId: '' });
                setImageUrls([]);
              }}
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" loading={uploadLoading}>
              Submit
            </Button>
          </div>
        </Form>
      </div>
      <Modal
        // width="1200px"
        width={410}
        title={previewTitle}
        // bodyStyle={{ height: 800 }}
        visible={previewVisible}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        {/* <iframe title="iframe" src={previewImage} style={{ width: '400px' }} /> */}
        <img src={previewImage} alt={previewImage} style={{ width: '400px' }} className="object-contain" />
      </Modal>
    </>
  );
};

export default AddRoom;
