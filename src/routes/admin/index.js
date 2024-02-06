import { Spin } from 'antd';
import React, { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import withAdminLayout from '../../layout/withAdminLayout';

// const Dashboard = lazy(() => import('../../container/dashboard'));
const DemoEight = lazy(() => import('../../container/dashboard/DemoEight'));
const Rooms = lazy(() => import('../../container/rooms'));
const Cms = lazy(() => import('../../container/cms'));
const Orders = lazy(() => import('../../container/orders'));
const Users = lazy(() => import('../../container/AllUsers'));
const NotFound = lazy(() => import('../../container/pages/404'));

const Admin = React.memo(() => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <Suspense
      fallback={
        <div className="spin flex items-center justify-center bg-white dark:bg-dark h-screen w-full fixed z-[999] ltr:left-0 rtl:right-0 top-0">
          <Spin />
        </div>
      }
    >
      <Routes>
        <Route index path="/*" element={<DemoEight />} /> //dashboard
        <Route index path="rooms/*" element={<Rooms />} />
        <Route index path="users/*" element={<Users />} />
        <Route index path="cms/*" element={<Cms />} />
        <Route index path="orders/*" element={<Orders />} />
        {/* <Route path="demo-2" element={<DemoTwo />} />
        <Route path="demo-3" element={<DemoThree />} />
        <Route path="demo-4" element={<DemoFour />} />
        <Route path="demo-5" element={<DemoFive />} />
        <Route path="demo-6" element={<DemoSix />} />
        <Route path="demo-7" element={<DemoSeven />} />
        <Route path="demo-8" element={<DemoEight />} />
        <Route path="demo-9" element={<DemoNine />} />
        <Route path="demo-10" element={<DemoTen />} /> */}
        {/* <Route path="testList/*" element={<TestList />} />
        <Route path="question-bank/*" element={<QuestionBank />} />
        <Route path="customers/*" element={<Customers />} />
        <Route path="contactUs/*" element={<ContactUs />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
});

export default withAdminLayout(Admin);
