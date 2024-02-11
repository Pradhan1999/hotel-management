import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Modal, Input, Popconfirm } from 'antd';

import { Space, Table } from 'antd';
import AddCms from './AddCms';
import { GlobalUtilityStyle } from '../styled';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { deleteCms, getAllCms } from '../../utility/services/cms';

const Cms = () => {
  const [isAddCms, setisAddCms] = useState(false);
  const [isEditCms, setIsEditCms] = useState({ isOpen: false, cmsId: '' });
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
          <Button size="middle" onClick={() => setIsEditCms({ isOpen: true, cmsId: record?._id })}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={() => {
              deleteCms({ id: record?._id })
                .then((res) => {
                  console.log('res', res);
                  message.success('Deleted Successfully');
                  getAllData();
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
              // title={
              //   <div className="flex items-center gap-3">
              //     <div className="font-normal">Sort By:</div>
              //     <div>
              //       <Select
              //         style={{
              //           width: 120,
              //         }}
              //         placeholder="Type"
              //         // onChange={handleChange}
              //         options={[
              //           {
              //             value: 'Standard',
              //             label: 'Standard',
              //           },
              //           {
              //             value: 'Deluxe',
              //             label: 'Deluxe',
              //           },
              //           {
              //             value: 'Suite',
              //             label: 'Suite',
              //           },
              //         ]}
              //       />
              //     </div>
              //     <div>
              //       {/* <Search
              //         placeholder="Search by room name"
              //         allowClear
              //         enterButton="Search"
              //         size="middle"
              //         onSearch={onSearch}
              //       /> */}
              //     </div>
              //   </div>
              // }
              moreBtn={
                <Button type="primary" onClick={() => setisAddCms(true)}>
                  Add
                </Button>
              }
              border={false}
              size="default"
            >
              <Table scroll={{ x: '100%', y: 'auto' }} columns={columns} dataSource={allCms} />
            </Cards>
          </Col>
        </Row>
      </GlobalUtilityStyle>

      <Modal
        title={`${isAddCms ? 'Add' : 'Edit'}`}
        destroyOnClose
        open={isAddCms || isEditCms.isOpen}
        width={1024}
        // onOk={handleAddCmss}
        footer={false}
        onCancel={() => {
          setisAddCms(false);
          setIsEditCms({ isOpen: false, cmsId: '' });
        }}
      >
        <AddCms setisAddCms={setisAddCms} getAllData={getAllData} isEditCms={isEditCms} setIsEditCms={setIsEditCms} />
      </Modal>
    </>
  );
};

export default Cms;
