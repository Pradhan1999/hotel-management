import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const NotFound = lazy(() => import('../../container/pages/404'));
const TestListComponent = lazy(() => import('../../container/testList'));
const TestQuestionPaper = lazy(() => import('../../container/testQuestionPaper'));
// const MyComplaints = lazy(() => import('../../container/pages/complaint/MyComplaints'));

function TestList() {
  return (
    <Routes>
      <Route path="" element={<TestListComponent />} />
      <Route path="/:testId" element={<TestQuestionPaper />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default TestList;
