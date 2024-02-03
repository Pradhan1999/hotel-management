import React, { useState, useEffect } from 'react';
import { Row, Col, Pagination, notification, Button, Modal, Input, Upload, Spin, message, Select } from 'antd';
// import { useNavigate } from 'react-router-dom';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import UilClock from '@iconscout/react-unicons/icons/uil-clock';
import CourseCard from './CourseCard';
import BlankPage from './BlankPage';
import { PageHeader } from '../../components/page-headers/page-headers';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Cards } from '../../components/cards/frame/cards-frame';

import { PaginationStyle } from '../styled';

import { addTestPaper, getTestPaper, updateTestPaper, deleteTestPaper } from '../../redux/testPaper/services';

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};
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
const PageRoutes = [
  {
    path: '/',
    breadcrumbName: 'Dashboard',
  },
  {
    path: 'testList',
    breadcrumbName: 'Test List',
  },
];
function TestList() {
  const [start, setStart] = useState(0);
  const [limit, setLimit] = useState(10);
  const [allTestPaper, setAllTestPaper] = useState([]);
  const [imageUrl, setImageUrl] = useState();
  const [addTestListLoading, setAddTestListLoading] = useState(false);
  const [testPaperModal, setTestPaperModal] = useState({
    visible: false,
    id: '',
    value: '',
    imageUrl: '',
    totalTime: '',
    noOfQuestions: 0,
    testDescription: '',
    type: 'Select Type',
  });
  const [loading, setLoading] = useState(false);
  const [fetchDataLoading, setFetchDataLoading] = useState(false);
  const handleChange = (info) => {
    // Get this url from response in real world.
    setTestPaperModal({
      ...testPaperModal,
      imageUrl: info.file.originFileObj,
    });
    getBase64(info.file.originFileObj, (url) => {
      setLoading(false);
      setImageUrl(url);
    });
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  // const navigate = useNavigate();
  const getTestPaperModalFun = () => {
    setFetchDataLoading(true);
    getTestPaper({
      start,
      limit,
    })
      .then((res) => {
        setFetchDataLoading(false);

        setAllTestPaper(res?.data);
      })
      .catch(() => {
        setFetchDataLoading(false);
      });
  };

  useEffect(() => {
    getTestPaperModalFun();
  }, []);

  const addTestPaperFun = () => {
    setAddTestListLoading(true);
    const formData = new FormData();
    formData.append('name', testPaperModal?.value);
    if (testPaperModal?.imageUrl?.uid) formData.append('files', testPaperModal?.imageUrl);
    formData.append('totalTime', testPaperModal?.totalTime);
    formData.append('noOfQuestions', testPaperModal?.noOfQuestions);
    formData.append('testDescription', testPaperModal?.testDescription);
    formData.append('type', testPaperModal?.type);

    if (testPaperModal?.id) {
      updateTestPaper({
        id: testPaperModal?.id,
        body: formData,
      })
        .then(() => {
          setAddTestListLoading(false);
          message.success('Test Updated Successfully');

          getTestPaperModalFun();
          setTestPaperModal({
            visible: false,
            id: '',
            value: '',
            imageUrl: '',
            totalTime: '',
            noOfQuestions: 0,
            testDescription: '',
            type: '',
          });
          setImageUrl('');
        })
        .catch((err) => {
          setAddTestListLoading(false);
          notification.error({
            message: err?.message,
          });
        });
    }

    if (!testPaperModal?.id) {
      addTestPaper({
        body: formData,
      })
        .then(() => {
          setAddTestListLoading(false);
          message.success('Test Added Successfully');
          getTestPaperModalFun();
          setTestPaperModal({
            visible: false,
            id: '',
            value: '',
            imageUrl: '',
            totalTime: '',
            noOfQuestions: 0,
            testDescription: '',
            type: '',
          });
          setImageUrl('');
        })
        .catch((err) => {
          setAddTestListLoading(false);
          notification.error({
            message: err?.message,
          });
        });
    }
  };
  const deleteFun = (id) => {
    deleteTestPaper(id)
      .then(() => {
        getTestPaperModalFun();
        message.success('Deleted Successfully');
      })
      .catch((err) => {
        notification?.error({
          message: err?.message,
        });
      });
  };
  return (
    <Spin spinning={fetchDataLoading}>
      <PageHeader
        className="flex items-center justify-between px-8 xl:px-[15px] pt-2 pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
        title="Test List"
        routes={PageRoutes}
      />
      <main className="min-h-[715px] lg:min-h-[580px] px-8 xl:px-[15px] pb-[30px] bg-transparent">
        <Row gutter={25} className="mt-sm-10">
          <Cards headless>
            <div className="flex w-full justify-end my-2 text-xl">
              <Button
                onClick={() => {
                  setTestPaperModal({
                    visible: true,
                    id: '',
                    value: '',
                    imageUrl: '',
                    totalTime: '',
                    noOfQuestions: 0,
                    testDescription: '',
                    type: '',
                  });
                }}
              >
                Add Test Paper
              </Button>
            </div>
            <div className="flex flex-wrap w-full">
              {allTestPaper?.data?.length ? (
                <>
                  {allTestPaper?.data?.map((value, index) => (
                    <CourseCard
                      key={index}
                      courseData={value}
                      deleteFun={deleteFun}
                      setTestPaperModal={setTestPaperModal}
                      setImageUrl={setImageUrl}
                    />
                  ))}
                </>
              ) : (
                <>{!fetchDataLoading ? <BlankPage setTestPaperModal={setTestPaperModal} /> : <></>}</>
              )}
            </div>
            <Col xs={24}>
              <>
                {allTestPaper?.data?.length ? (
                  <PaginationStyle>
                    <div className="ant-pagination-custom-style text-end">
                      <Pagination
                        onChange={(page, pageSize) => {
                          setStart(pageSize * (page - 1));
                          setLimit(pageSize);
                        }}
                        pageSizeOptions={['10', '20', '50', '100']}
                        showSizeChanger
                        onShowSizeChange={(_, size) => {
                          setLimit(size);
                          setStart(0);
                        }}
                        pageSize={limit}
                        defaultCurrent={1}
                        total={allTestPaper?.totalDocs}
                      />
                    </div>
                  </PaginationStyle>
                ) : null}
              </>
            </Col>
          </Cards>
        </Row>
        <Modal width={800} open={testPaperModal?.visible} closable={false} footer={false}>
          <div className="p-4">
            <div className="text-lg mb-2">Create Test Question</div>
            <div className="mt-4">Enter Test Name</div>

            <Input
              placeholder="Enter Test Name"
              className="my-2"
              value={testPaperModal?.value}
              onChange={(e) => {
                setTestPaperModal({
                  ...testPaperModal,
                  value: e?.target?.value,
                });
              }}
            />

            <Row>
              <Col sm={24} lg={12}>
                <div className="mt-4">Enter Total Time</div>
                <div className="flex  items-center">
                  <Input
                    placeholder="Enter total time in minutes"
                    className="my-2 w-1/2"
                    value={testPaperModal?.totalTime}
                    onChange={(e) => {
                      setTestPaperModal({
                        ...testPaperModal,
                        totalTime: e?.target?.value,
                      });
                    }}
                  />

                  <div className="inline-flex ml-2 items-center gap-[3px] bg-[#fb358626] text-primary h-8 px-5 3xl:px-2.5 rounded-[20px]">
                    <UilClock className="w-[14px]" />
                    <span className="text-[13px] 3xl:text-xs font-medium leading-none">
                      {testPaperModal?.totalTime ? convertMinutesToHoursAndMinutes(testPaperModal?.totalTime) : `${0}s`}
                    </span>
                  </div>
                </div>
              </Col>
              <Col sm={24} lg={12}>
                <div className="my-4">Enter Test Paper Type</div>
                <div className="flex justify-between items-center">
                  <Select
                    size="large"
                    value={testPaperModal?.type}
                    className={`text-sm text-[${testPaperModal?.type ? 'gray-800' : 'gray-300'}] capitalize `}
                    style={{
                      width: '100%',
                    }}
                    onChange={(e) => {
                      setTestPaperModal({
                        ...testPaperModal,
                        type: e,
                      });
                    }}
                  >
                    {['sample', 'mock']?.map((i) => {
                      return (
                        <Select.Option className="capitalize text-base" key={i} value={i}>
                          {i}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </div>
              </Col>
            </Row>
            <div className="mt-4">Enter Description</div>
            <div className="flex justify-between items-center">
              <Input.TextArea
                placeholder="Enter Description"
                className="my-2 w-full"
                value={testPaperModal?.testDescription}
                onChange={(e) => {
                  setTestPaperModal({
                    ...testPaperModal,
                    testDescription: e?.target?.value,
                  });
                }}
                rows={3}
              />
            </div>
            <div className="mt-4">Enter Number of questions</div>
            <div className="flex justify-between items-center">
              <Input
                // eslint-disable-next-line no-underscore-dangle
                disabled={!!testPaperModal?.id}
                placeholder="Enter total number of questions"
                className="my-2 w-1/2"
                value={testPaperModal?.noOfQuestions}
                onChange={(e) => {
                  setTestPaperModal({
                    ...testPaperModal,
                    noOfQuestions: Number(e?.target?.value),
                  });
                }}
              />
            </div>
            <div className="mt-2">
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                // beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="avatar"
                    style={{
                      width: '100%',
                      padding: 10,
                    }}
                  />
                ) : (
                  uploadButton
                )}
              </Upload>
            </div>

            <div className="flex mt-2 w-full justify-end">
              <Button
                className="mr-2"
                onClick={() => {
                  setTestPaperModal({
                    visible: false,
                    id: '',
                    value: '',
                    imageUrl: '',
                  });
                  setImageUrl('');
                }}
              >
                Cancel
              </Button>
              <Button loading={addTestListLoading} onClick={addTestPaperFun}>
                {testPaperModal?.id ? 'Update' : 'Add'}
              </Button>
            </div>
          </div>
        </Modal>
      </main>
    </Spin>
  );
}

export default TestList;
