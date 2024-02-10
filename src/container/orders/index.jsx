import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Table, Modal, Space, Popconfirm, message } from 'antd';
import AddOrder from './AddOrder';
import { GlobalUtilityStyle } from '../styled';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { getAllOrder, deleteOrder } from '../../utility/services/orders';

const Users = () => {
  const [allOrder, setAllOrder] = useState([]);
  const [isAddOrder, setIsAddOrder] = useState(false);
  const [isEditOrder, setIsEditOrder] = useState({});
  const PageRoutes = [
    {
      path: '/',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '/orders',
      breadcrumbName: 'Orders',
    },
  ];

  const getAllOrders = () => {
    getAllOrder({})
      .then((res) => {
        if (res) {
          setAllOrder(res?.data?.data);
        }
      })
      .catch((err) => console.log('err', err));
  };

  useEffect(() => {
    getAllOrders();
  }, []);
  const columns = [
    {
      title: 'Name',
      dataIndex: 'customerName',
      key: 'customerName',
      width: 150,
    },
    {
      title: 'Email',
      dataIndex: 'customerEmail',
      key: 'customerEmail',
      width: 150,
    },
    {
      title: 'Check In Time',
      dataIndex: 'checkInDate',
      key: 'checkInDate',
      width: 150,
    },
    {
      title: 'Check Out Time',
      dataIndex: 'checkOutDate',
      key: 'checkOutDate',
      width: 150,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 150,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button size="middle" onClick={() => setIsEditOrder({ isOpen: true, orderId: record?._id })}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this Order?"
            onConfirm={() => {
              deleteOrder({ id: record?._id })
                .then((res) => {
                  // console.log('res', res);
                  message.success('Order Deleted Successfully');
                  getAllOrders();
                })
                .catch((err) => console.log('err', err));
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button danger size="middle">
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
      width: 150,
    },
  ];

  return (
    <>
      <PageHeader
        title="Orders"
        routes={PageRoutes}
        className="flex items-center justify-between px-8 xl:px-[15px] pt-2 pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
      />
      <GlobalUtilityStyle className="p-3  ">
        <Row gutter={16}>
          <Col sm={24} xs={24} lg={24} className="">
            <Cards
              moreBtn={
                <Button type="primary" onClick={() => setIsAddOrder(true)}>
                  Add
                </Button>
              }
              title="Orders"
              border={false}
              size="default"
            >
              <Table scroll={{ x: '100%', y: 'auto' }} columns={columns} dataSource={allOrder} />
            </Cards>
          </Col>
        </Row>
      </GlobalUtilityStyle>
      <Modal
        title={isAddOrder ? 'Add Order' : 'Edit Order'}
        destroyOnClose
        open={isAddOrder || isEditOrder.isOpen}
        width={1024}
        // onOk={handleAddCmss}
        footer={false}
        onCancel={() => {
          setIsAddOrder(false);
          setIsEditOrder({ isOpen: false, orderId: null });
        }}
      >
        <AddOrder
          setIsAddOrder={setIsAddOrder}
          getAllOrder={getAllOrders}
          isEditOrder={isEditOrder}
          setIsEditOrder={setIsEditOrder}
        />
      </Modal>
    </>
  );
};

export default Users;
