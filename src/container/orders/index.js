import React from 'react';
import { Row, Col, Button } from 'antd';

import { GlobalUtilityStyle } from '../styled';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';

const Orders = () => {
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
            <Cards moreBtn={<Button type="primary">Add</Button>} title="Orders" border={false} size="default">
              Orders
            </Cards>
          </Col>
        </Row>
      </GlobalUtilityStyle>
    </>
  );
};

export default Orders;
