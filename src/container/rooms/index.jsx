import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Modal, Carousel, Select, Input } from 'antd';

import { Space, Table, Tag } from 'antd';
import AddRoom from './AddRoom';
import { GlobalUtilityStyle } from '../styled';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { getAllRooms } from '../../utility/services/rooms';
const { Search } = Input;

const contentStyle = {
  height: '120px',
  color: '#fff',
  lineHeight: '130px',
  textAlign: 'center',
  background: '#364d79',
  borderRadius: '10px',
};

const columns = [
  {
    title: 'Images',
    dataIndex: 'images',
    key: 'images',
    render: (_, record) => (
      <div>
        <Carousel autoplay>
          {record?.images?.map((img, idx) => (
            <div key={idx}>
              <img src={img} alt={img} style={contentStyle} />
            </div>
          ))}
        </Carousel>
      </div>
    ),
    width: 160,
  },
  {
    title: 'Room Number',
    dataIndex: 'roomNumber',
    alignItem: 'center',
    key: 'name',
    render: (text) => <a>{text}</a>,
    width: 140,
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    width: 140,
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    width: 150,
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    width: 150,
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
    width: 150,
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

  const onSearch = (value) => console.log(value);

  return (
    <>
      <PageHeader
        title="Rooms"
        routes={PageRoutes}
        className="flex items-center justify-between px-8 xl:px-[15px] pt-2 pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
      />
      <GlobalUtilityStyle className="p-3">
        <Row gutter={16}>
          <Col sm={24} xs={24} lg={24} className="">
            <Cards
              title={
                <div className="flex items-center gap-3">
                  <div className="font-normal">Sort By:</div>
                  <div>
                    <Select
                      style={{
                        width: 120,
                      }}
                      placeholder="Type"
                      // onChange={handleChange}
                      options={[
                        {
                          value: 'Standard',
                          label: 'Standard',
                        },
                        {
                          value: 'Deluxe',
                          label: 'Deluxe',
                        },
                        {
                          value: 'Suite',
                          label: 'Suite',
                        },
                      ]}
                    />
                  </div>
                  <div>
                    <Search
                      placeholder="Search by room name"
                      allowClear
                      enterButton="Search"
                      size="middle"
                      onSearch={onSearch}
                    />
                  </div>
                </div>
              }
              moreBtn={
                <Button type="primary" onClick={() => setisAddRoom(true)}>
                  Add
                </Button>
              }
              // title="Rooms"
              border={false}
              size="default"
            >
              <Table scroll={{ x: '100%', y: 'auto' }} columns={columns} dataSource={allRooms} />
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
