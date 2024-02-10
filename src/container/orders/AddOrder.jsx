import { Button, Form, Input, Select, message, Row, Col, DatePicker, Spin } from 'antd';
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { addOrder, getSingleOrder, updateOrder } from '../../utility/services/orders';
import { getAllRooms } from '../../utility/services/rooms';
const { Option } = Select;

const AddOrder = ({ setIsAddOrder, isEditOrder, setIsEditOrder, getAllOrder }) => {
  const [loading, setLoading] = useState(false);
  const [roomData, setRoomData] = useState([]);
  const [roomIdData, setRoomIdData] = useState({});

  const [form] = Form.useForm();

  const onFinish = (values) => {
    // console.log(values);

    const body = values;
    setLoading(true);
    if (isEditOrder?.orderId) {
      updateOrder({
        id: isEditOrder?.orderId,
        body: body,
      })
        .then((res) => {
          setIsEditOrder({ isOpen: false, orderId: '' });
          getAllOrder();
          message.success('Order updated successfully');
        })
        .catch((err) => {
          message.error('Room Already Booked');
        });
    } else {
      addOrder({
        body: body,
      })
        ?.then((res) => {
          message.success('Order added successfully');
          setIsAddOrder(false);
          getAllOrder({ start: 0, limit: 10 });
          setLoading(false);
          //   console.log('res', res);
        })
        .catch((err) => {
          message.error('Room is already Booked');
          console.log('err :>> ', err);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    // populate single room data
    if (isEditOrder?.orderId) {
      setLoading(true);
      getSingleOrder({ id: isEditOrder?.orderId })
        .then((res) => {
          const data = res.data;
          data.checkInDate = moment(data.checkInDate);
          data.checkOutDate = moment(data.checkOutDate);
          //   console.log('data', data);
          //   setRoomIdData({ option: data.roomNumber, value: data.roomId });
          setRoomData([{ _id: data.roomId, roomNumber: data.roomNumber }]);
          form.setFieldsValue(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log('err', err);
          setLoading(false);
        });
    }
  }, [isEditOrder?.orderId]);

  const fetchRoomSuggestions = async (number) => {
    setLoading(true);

    getAllRooms({ roomNumber: number })
      .then((res) => {
        const data = res?.data?.rooms;
        setRoomData(data); // Update room options state with fetched data
        setLoading(false);
      })
      .catch((error) => {
        message.error('Error fetching room suggestions');
        setLoading(false);
      });
  };

  return (
    <>
      <Spin spinning={loading}></Spin>
      <div>
        <Form
          form={form}
          name="orders"
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
              <Form.Item label="Room Number" name="roomId" rules={[{}]}>
                <Select
                  showSearch
                  placeholder="Select room number"
                  loading={loading}
                  filterOption={false} // Disable client-side filtering
                  onSearch={fetchRoomSuggestions}
                  optionLabelProp="children"
                >
                  {roomData.map((room) => (
                    <Option key={room._id} value={room._id}>
                      {room.roomNumber}
                    </Option>
                  ))}
                </Select>
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
            <Button
              onClick={() => {
                setIsAddOrder(false);
                setIsEditOrder({ isOpen: false, orderId: '' });
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

export default AddOrder;
