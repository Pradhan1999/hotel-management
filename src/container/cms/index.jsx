import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Modal, Carousel, Select, Input } from 'antd';

import { Space, Table, Tag } from 'antd';
import AddCms from './AddCms';
import { GlobalUtilityStyle } from '../styled';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { getAllCms } from '../../utility/services/cms';
const { Search } = Input;

const columns = [
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    width: 140,
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    width: 150,
  },

  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Edit </a>
        <a>Delete</a>
      </Space>
    ),
    width: 150,
  },
];

const Rooms = () => {
  const [isAddCms, setisAddCms] = useState(false);
  const [allCms, setAllCms] = useState([]);

  const PageRoutes = [
    {
      path: '/',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '/cms',
      breadcrumbName: 'Cms',
    },
  ];

  const getAllData = () => {
    getAllCms({})
      .then((res) => {
        if (res) {
          setAllCms(res?.data?.data);
        }
      })
      .catch((err) => console.log('err', err));
  };

  useEffect(() => {
    getAllData();
  }, []);

  const onSearch = (value) => console.log(value);

  return (
    <>
      <PageHeader
        title="Cms"
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
                    {/* <Search
                      placeholder="Search by room name"
                      allowClear
                      enterButton="Search"
                      size="middle"
                      onSearch={onSearch}
                    /> */}
                  </div>
                </div>
              }
              moreBtn={
                <Button type="primary" onClick={() => setisAddCms(true)}>
                  Add
                </Button>
              }
              // title="Rooms"
              border={false}
              size="default"
            >
              <Table scroll={{ x: '100%', y: 'auto' }} columns={columns} dataSource={allCms} />
            </Cards>
          </Col>
        </Row>
      </GlobalUtilityStyle>

      <Modal
        title="Add"
        destroyOnClose
        open={isAddCms}
        width={1024}
        // onOk={handleAddCmss}
        footer={false}
        onCancel={() => setisAddCms(false)}
      >
        <AddCms setisAddCms={setisAddCms} />
      </Modal>
    </>
  );
};

export default Rooms;
