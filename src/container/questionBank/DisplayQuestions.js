/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import { useLocation } from 'react-router-dom';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Popconfirm } from 'antd';
import { deleteQuestions } from '../../redux/questions/service';

function DisplayQuestions({
  data,
  index,
  setLimit,
  setStart,
  getTestPaperDetails,
  start,
  getQuestionDetailsFun,
  setLoading,
  setModal,
}) {
  const { pathname } = useLocation();

  const testId = pathname?.split('/')[2];

  return (
    <>
      <div>
        <div className="absolute top-0 right-0 p-3">
          <Popconfirm
            title={
              <div>
                <div>Are you sure to delete this Question?</div>
              </div>
            }
            onConfirm={() => {
              setLoading(true);
              deleteQuestions(data?._id, testId)
                .then(() => {
                  getTestPaperDetails();
                  getQuestionDetailsFun();
                  setLoading(false);
                  setLimit(10);
                  setStart(0);
                })
                .catch(() => {
                  setLoading(false);
                });
            }}
            onCancel={() => {}}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined
              className="w-[20px] cursor-pointer"
              style={{
                color: 'red',
              }}
            />
          </Popconfirm>
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
          <div>Q:{index + 1 + start} </div>
        </div>
        <div className="flex w-full">
          <div className="text-base  w-1/5 items-center">Name:- </div>
          <div className="text-lg font-normal w-4/5 text-[#0096FF]">
            <div dangerouslySetInnerHTML={{ __html: data?.name }} />
          </div>
        </div>
        <div className="flex w-full items-center">
          <div className="text-base w-1/5">Correct Option:- </div>
          <div className="text-lg font-normal w-4/5 text-[#0096FF]">
            {data.options?.find((i) => i?.option === data?.answer?.option)?.option}
          </div>
        </div>
        <div className="flex w-full items-center">
          <div className="text-base w-1/5 ">Explanation:- </div>
          <div className="text-lg font-normal w-4/5 text-[#0096FF]">{data?.answer?.explanation}</div>
        </div>
        <div className="">
          <div className="text-base w-1/5">Options:- </div>
          <div className="flex justify-between w-full">
            {data.options?.map((j) => {
              return (
                <div className=" mt-3" key={j}>
                  <span className=" capitalize font-normal">{j?.option} :</span>
                  <span className="text-[#0096FF] capitalize font-normal"> {j?.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default DisplayQuestions;
