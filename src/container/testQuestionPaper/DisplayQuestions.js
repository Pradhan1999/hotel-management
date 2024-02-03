/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import { EditOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';

function DisplayQuestions({ data, selectedQuestionNumber, setModal }) {
  return (
    <>
      <div>
        <div className="absolute top-0 right-0 p-3">
          <EditOutlined
            className="cursor-pointer"
            onClick={() => {
              setModal({
                visible: true,
                id: data?._id,
              });
            }}
          />
        </div>
        <div className="flex ">
          <div>Q:{selectedQuestionNumber} </div>
        </div>
        <Row gutter={[20]}>
          <Col sm={24} xs={24} lg={6} className="">
            <div className="text-base   items-center">Name:- </div>
          </Col>
          <Col sm={24} xs={24} lg={18} className="">
            <div className="text-lg font-normal w-4/5 text-[#0096FF]">
              <div dangerouslySetInnerHTML={{ __html: data?.name }} />
            </div>
          </Col>
        </Row>

        <Row gutter={[20]}>
          <Col sm={24} xs={24} lg={6} className="">
            <div className="text-base   items-center">Correct Option:- </div>
          </Col>
          <Col sm={24} xs={24} lg={18} className="">
            <div className="text-lg font-normal w-4/5 text-[#0096FF]">
              {data.options?.find((i) => i?.option === data?.answer?.option)?.option}
            </div>
          </Col>
        </Row>

        <Row gutter={[20]}>
          <Col sm={24} xs={24} lg={6} className="">
            <div className="text-base  ">Explanation:- </div>
          </Col>
          <Col sm={24} xs={24} lg={18} className="">
            <div className="text-lg font-normal w-4/5 text-[#0096FF]">{data?.answer?.explanation}</div>
          </Col>
        </Row>

        <Row gutter={[20]}>
          <Col sm={24} xs={24} lg={24} className="">
            <div className="text-base ">Options:- </div>
          </Col>
          <Col sm={24} xs={24} lg={24} className="">
            {data.options?.map((j) => {
              return (
                <div className=" mt-3" key={j}>
                  <span className=" capitalize font-normal">{j?.option} :</span>
                  <span className="text-[#0096FF] capitalize font-normal"> {j?.text}</span>
                </div>
              );
            })}
          </Col>
        </Row>
      </div>
    </>
  );
}

export default DisplayQuestions;
