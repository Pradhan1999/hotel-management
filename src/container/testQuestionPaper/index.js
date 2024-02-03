/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
// import RichTextEditor from 'react-rte';
// import { EditOutlined } from '@ant-design/icons';
// import { ContentState, EditorState } from 'draft-js';
import RichTextEditor from 'react-rte';
import { Row, Col, Button, Form, Spin, Image, Divider, Modal, message, notification } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import DisplayQuestions from './DisplayQuestions';
import { GlobalUtilityStyle } from '../styled';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { addTestDescription, getQuestions, getSingleDetails } from '../../redux/questions/service';
import { getSingleTestDetails } from '../../redux/testPaper/services';
import AddQuestionEditor from '../questionBank/AddQuestionEditor';

function TestQuestionPaper() {
  const { pathname } = useLocation();
  const testId = pathname?.split('/')[2];
  const [getTestPaperData, setGetTestPaperData] = useState({});
  const [paragraphModal, setParagraphModal] = useState(false);
  const [paragrahtext, setParagraphText] = useState(RichTextEditor.createEmptyValue());
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
  const [form] = Form.useForm();
  const [modal, setModal] = useState({ visible: false, id: '' });
  const [loading, setLoading] = useState(false);
  // const [richText, setRichText] = useState(RichTextEditor.createEmptyValue());
  const getTestPaperDetails = () => {
    if (testId)
      getSingleTestDetails(testId).then((res) => {
        setGetTestPaperData(res?.data?.data);
      });
  };
  useEffect(() => {
    getTestPaperDetails();
  }, [testId]);

  const [selectedQuestionNumber, setSelectedQuestionNumber] = useState(1);
  const [getQuestionPaperDetails, setGetQuestionPaperDetails] = useState([]);
  const getQuestionDetailsFun = () => {
    setLoading(true);
    getQuestions({ testId })
      .then((res) => {
        setGetQuestionPaperDetails(res?.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (selectedQuestionNumber && testId) getQuestionDetailsFun();
  }, [testId, selectedQuestionNumber]);
  const getSingleQuestionDetails = () => {
    if (modal?.id) {
      getSingleDetails(modal?.id)
        .then((res) => {
          form.setFieldsValue({
            ...res?.data?.data,
            answer: res?.data?.data?.answer?.option,
            explanation: res?.data?.data?.answer?.explanation,
            first: res?.data?.data?.options?.[0]?.text,
            second: res?.data?.data?.options?.[1]?.text,
            third: res?.data?.data?.options?.[2]?.text,
            fourth: res?.data?.data?.options?.[3]?.text,
          });

          // setRichText(res?.data?.data?.name);
        })
        .catch(() => {});
    }
  };

  useEffect(() => {
    getSingleQuestionDetails();
  }, [modal?.id]);

  const PageRoutes = [
    {
      path: '/',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '/testList',
      breadcrumbName: 'Test List',
    },
    {
      path: '',
      breadcrumbName: 'Test Details',
    },
  ];
  const addTestDescriptionFun = () => {
    addTestDescription({
      body: {
        questionPaperDescription: paragrahtext?.toString('html'),
      },
      id: testId,
    })
      .then(() => {
        message.success(`Description ${getTestPaperData?.questionPaperDescription ? 'Updated' : 'Added'} successfully`);
        getTestPaperDetails();
        setParagraphModal(false);
      })
      .catch((err) => {
        notification?.error({ message: err?.message });
      });
  };
  const numbers = getTestPaperData?.noOfQuestions
    ? Array.from(Array(Number(getTestPaperData?.noOfQuestions) + 1).keys())
    : [];
  numbers.shift();
  const moreContent = (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        overflowY: 'auto',
        maxHeight: '200px',
      }}
    >
      {numbers?.map((i) => {
        return (
          <Button
            key={i}
            // type="primary"
            style={{
              height: '30px',
              width: '50px',
              margin: 4,
              backgroundColor: selectedQuestionNumber === i ? '#3498db' : '#fff',
              color: selectedQuestionNumber === i ? '#fff' : '#000',
              textAlign: 'center',
              fontSize: '0.8em',
              borderRadius: '5px',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            }}
            onClick={() => {
              setSelectedQuestionNumber(i);
            }}
          >
            {i}
          </Button>
        );
      })}
    </div>
  );
  return (
    <>
      <PageHeader
        title="Test Details"
        routes={PageRoutes}
        className="flex items-center justify-between px-8 xl:px-[15px] pt-2 pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
      />
      <GlobalUtilityStyle className="p-3  ">
        <Row gutter={16}>
          <Col sm={24} xs={24} lg={8} className="">
            <Cards headless border={false} size="default">
              <Row gutter={[20]} className="mb-10">
                <Col sm={12} xs={12} lg={12} className="">
                  <div className="text-lg  text-blue-500">Basic Details</div>
                </Col>
                <Col sm={12} xs={12} lg={12} className="">
                  {!!getTestPaperData?.questionPaperDescription === false ? (
                    <Button
                      onClick={() => {
                        setParagraphModal(true);
                      }}
                    >
                      Add Paragraph
                    </Button>
                  ) : (
                    <></>
                  )}
                </Col>
              </Row>
              <div className="flex justify-between w-full">
                <Image width={200} src={getTestPaperData?.imageUrl} />
              </div>
              <Divider />
              <Row gutter={[20]}>
                <Col sm={24} xs={24} lg={8} className="">
                  <div className="">Name: </div>
                </Col>
                <Col sm={24} xs={24} lg={16} className="">
                  <div className="text-[#0096FF] text-lg font-medium">{getTestPaperData?.name}</div>
                </Col>
              </Row>
              <Divider />

              <Row gutter={[20]}>
                <Col sm={24} xs={24} lg={8} className="">
                  <div>Duration: </div>
                </Col>
                <Col sm={24} xs={24} lg={16} className="">
                  <div className="text-[#0096FF] text-lg font-medium">
                    {convertMinutesToHoursAndMinutes(getTestPaperData?.totalTime)}
                  </div>
                </Col>
              </Row>
              <Divider />
              <Row gutter={[20]}>
                <Col sm={24} xs={24} lg={8} className="">
                  <div>Question :</div>
                </Col>
                <Col sm={24} xs={24} lg={16} className="">
                  <div className="text-[#0096FF] text-lg font-medium">{getTestPaperData?.questions?.length}</div>
                </Col>
              </Row>

              {getTestPaperData?.questionPaperDescription ? (
                <>
                  <Divider />
                  <div className="">
                    <div className="flex justify-between">
                      <div>Description : </div>
                      <EditOutlined
                        onClick={() => {
                          setParagraphModal(true);
                          const data = RichTextEditor.createValueFromString(
                            getTestPaperData?.questionPaperDescription,
                            'html',
                          );
                          setParagraphText(data);
                        }}
                      />
                    </div>
                    <div
                      className="mt-3 text-[#0096FF] text-lg font-medium capitalize"
                      dangerouslySetInnerHTML={{ __html: getTestPaperData?.questionPaperDescription }}
                    />
                  </div>
                  <Divider />
                </>
              ) : (
                <></>
              )}
            </Cards>
          </Col>
          <Col sm={24} xs={24} lg={16} className="">
            <Cards moreBtn={moreContent} title="Questions" border={false} size="default">
              <Spin spinning={loading}>
                {getQuestionPaperDetails?.data
                  ?.filter((_, _idx) => _idx + 1 === selectedQuestionNumber)
                  ?.map((i, index) => {
                    return (
                      <Cards key={i?._id} headless className="my-2">
                        <DisplayQuestions
                          data={i}
                          loading={loading}
                          setLoading={setLoading}
                          setModal={setModal}
                          availableLength={getQuestionPaperDetails?.data?.length}
                          modal={modal}
                          index={index}
                          selectedQuestionNumber={selectedQuestionNumber}
                        />
                      </Cards>
                    );
                  })}
              </Spin>
            </Cards>
          </Col>
        </Row>
        <Modal
          open={paragraphModal}
          footer={false}
          closable
          onCancel={() => {
            setParagraphModal(false);
          }}
        >
          <div className="p-2">
            <AddQuestionEditor richText={paragrahtext} onChange={setParagraphText} />
            <div className="flex justify-end mt-3">
              <Button
                onClick={() => {
                  setParagraphModal(false);
                }}
              >
                Cancel
              </Button>
              <Button type="primary" onClick={addTestDescriptionFun}>
                Save
              </Button>
            </div>
          </div>
        </Modal>
      </GlobalUtilityStyle>
    </>
  );
}

export default TestQuestionPaper;
