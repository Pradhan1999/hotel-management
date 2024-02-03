/* eslint-disable react/prop-types */
import UilBook from '@iconscout/react-unicons/icons/uil-book-alt';
import UilClock from '@iconscout/react-unicons/icons/uil-clock';
import { useNavigate } from 'react-router-dom';

import { Button, Card, Col, Popconfirm } from 'antd';
import propTypes from 'prop-types';
import React from 'react';

function CourseCard({ courseData, deleteFun, setTestPaperModal, setImageUrl }) {
  const { _id, imageUrl, name, totalTime, questions, noOfQuestions, testDescription, type } = courseData;
  const navigate = useNavigate();
  function convertMinutesToHoursAndMinutes(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours > 0) {
      return `${hours}hr ${minutes}m`;
    }
    if (minutes > 0) {
      return `${minutes}m`;
    }
  }
  return (
    <Col xxl={6} lg={8} sm={12} xs={24}>
      <div className="mb-[25px] [&>.ant-card>.ant-card-body]:p-[18px]">
        <Card bordered="false" className="bg-gray-100">
          <div className="  flex flex-col justify-between w-full">
            <div className="mb-[10px] w-full h-[200px] rounded-[10px]  shadow-sm bg-white ">
              <img className="w-full h-full rounded-lg" src={imageUrl} alt="Demo" />
            </div>
            <div>
              <h4 className="text-xl 3xl:text-lg font-semibold mb-3 ">
                {name?.length > 20 ? `${name?.slice(0, 20)}...` : name}
              </h4>
            </div>
            <div>
              <div className="inline-flex  mr-2 items-center gap-[3px] bg-secondary-transparent text-secondary h-8 px-5 3xl:px-2.5 rounded-[20px]">
                <UilBook className="w-[14px]" />
                <span className="text-[13px] 3xl:text-xs font-medium leading-none">{questions?.length} Questions</span>
              </div>
              <div className="inline-flex items-center gap-[3px] bg-[#fb358626] text-primary h-8 px-5 3xl:px-2.5 rounded-[20px]">
                <UilClock className="w-[14px]" />
                <span className="text-[13px] 3xl:text-xs font-medium leading-none">
                  {totalTime ? convertMinutesToHoursAndMinutes(totalTime) : `${0}s`}
                </span>
              </div>
            </div>
            <div className="mt-3">
              <Button
                type="primary"
                onClick={() => {
                  navigate(`/testList/${_id}`);
                }}
              >
                View
              </Button>
              <Popconfirm
                className="mx-2"
                title={
                  <div>
                    <div>Are you sure to delete this Test?</div>
                    <div className="text-red-600">*All questions will be un-assigned </div>
                  </div>
                }
                onConfirm={() => {
                  deleteFun(_id);
                }}
                onCancel={() => {
                  setTestPaperModal({
                    visible: false,
                    id: '',
                    value: '',
                    imageUrl: '',
                    noOfQuestions: 0,
                    testDescription: '',
                    type: '',
                  });
                }}
                okText="Yes"
                cancelText="No"
              >
                <Button type="danger">Delete</Button>
              </Popconfirm>

              <Button
                style={{ background: '#000', color: '#fff' }}
                onClick={() => {
                  setTestPaperModal({
                    visible: true,
                    id: _id,
                    value: name,
                    imageUrl,
                    totalTime,
                    noOfQuestions,
                    testDescription,
                    type,
                  });
                  setImageUrl(imageUrl);
                }}
              >
                Edit
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </Col>
  );
}

CourseCard.propTypes = {
  courseData: propTypes.object,
};

export default CourseCard;
