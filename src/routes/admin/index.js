import { Spin } from 'antd';
import React, { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import withAdminLayout from '../../layout/withAdminLayout';

const Dashboard = lazy(() => import('../../container/dashboard'));
// const TestList = lazy(() => import('./testList'));
const QuestionBank = lazy(() => import('../../container/questionBank'));
// const ContactUs = lazy(() => import('../../container/contact/Contact'));
// const Customers = lazy(() => import('../../container/Customers'));

const NotFound = lazy(() => import('../../container/pages/404'));

// const DemoTwo = lazy(() => import('../../container/dashboard/DemoTwo'));
// const DemoThree = lazy(() => import('../../container/dashboard/DemoThree'));
// const DemoFour = lazy(() => import('../../container/dashboard/DemoFour'));
// const DemoFive = lazy(() => import('../../container/dashboard/DemoFive'));
// const DemoSix = lazy(() => import('../../container/dashboard/DemoSix'));
// const DemoSeven = lazy(() => import('../../container/dashboard/DemoSeven'));
const DemoEight = lazy(() => import('../../container/dashboard/DemoEight'));
// const DemoNine = lazy(() => import('../../container/dashboard/DemoNine'));
// const DemoTen = lazy(() => import('../../container/dashboard/DemoTen'));

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
        <Route index path="/*" element={<DemoEight />} />
        <Route index path="orders/*" element={<QuestionBank />} />
        <Route index path="users/*" element={<QuestionBank />} />
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
