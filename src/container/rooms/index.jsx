import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Modal } from 'antd';

import { Space, Table, Tag } from 'antd';
import AddRoom from './AddRoom';
import { GlobalUtilityStyle } from '../styled';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { getAllRooms } from '../../utility/services/rooms';

const columns = [
  {
    title: 'Room Number',
    dataIndex: 'roomNumber',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const Rooms = () => {
  const [isAddRoom, setisAddRoom] = useState(false);
  const [allRooms, setAllRooms] = useState([]);

  const PageRoutes = [
    {
      path: '/',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '/rooms',
      breadcrumbName: 'Rooms',
    },
  ];

  const getAllRoomList = () => {
    getAllRooms({})
      .then((res) => {
        if (res) {
          setAllRooms(res?.data?.rooms);
        }
      })
      .catch((err) => console.log('err', err));
  };

  useEffect(() => {
    getAllRoomList();
  }, []);

  return (
    <>
      <PageHeader
        title="Rooms"
        routes={PageRoutes}
        className="flex items-center justify-between px-8 xl:px-[15px] pt-2 pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
      />
      <GlobalUtilityStyle className="p-3  ">
        <Row gutter={16}>
          <Col sm={24} xs={24} lg={24} className="">
            <Cards
              moreBtn={
                <Button type="primary" onClick={() => setisAddRoom(true)}>
                  Add
                </Button>
              }
              title="Rooms"
              border={false}
              size="default"
            >
              <Table columns={columns} dataSource={allRooms} />
            </Cards>
          </Col>
        </Row>
      </GlobalUtilityStyle>

      <Modal
        title="Add Room"
        destroyOnClose
        open={isAddRoom}
        // onOk={handleAddRooms}
        footer={false}
        onCancel={() => setisAddRoom(false)}
      >
        <AddRoom setisAddRoom={setisAddRoom} />
      </Modal>
    </>
  );
};

export default Rooms;
