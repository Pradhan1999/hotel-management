/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
// import RichTextEditor from 'react-rte';
// import { EditOutlined } from '@ant-design/icons';
// import { ContentState, EditorState } from 'draft-js';
import {
  Row,
  Col,
  Form,
  Spin,
  Pagination,
  Table,
  Button,
  Input,
  Select,
  Modal,
  Popconfirm,
  message,
  notification,
} from 'antd';
import RichTextEditor from 'react-rte';

import { PaginationWrapper } from './Style';
import AddQuestionEditor from './AddQuestionEditor';
import { GlobalUtilityStyle } from '../styled';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import {
  addQuestions,
  deleteQuestions,
  getAllQuestions,
  getSingleDetails,
  updateQuestion,
} from '../../redux/questions/service';

function QuestionBank() {
  // function convertMinutesToHoursAndMinutes(totalMinutes) {
  //   const hours = Math.floor(totalMinutes / 60);
  //   const minutes = totalMinutes % 60;

  //   if (hours > 0) {
  //     return `${hours}hr ${minutes}m`;
  //   }
  //   if (minutes > 0) {
  //     return `${minutes}m`;
  //   }
  // }

  const [form] = Form.useForm();
  const [modal, setModal] = useState({ visible: false, id: '' });
  const [loading, setLoading] = useState(false);
  const [richText, setRichText] = useState(RichTextEditor.createEmptyValue());
  const [start, setStart] = useState(0);
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [getQuestionPaperDetails, setGetQuestionPaperDetails] = useState([]);
  const getQuestionDetailsFun = () => {
    setLoading(true);
    getAllQuestions({ start, limit })
      .then((res) => {
        setGetQuestionPaperDetails(res?.data);
        setLoading(false);
      })
      .catch((err) => {
        notification?.error({ message: err?.message });
        setLoading(false);
      });
  };
  const columns = [
    {
      title: 'Sr no.',
      key: 'srNo',
      render: (_, __, index) => <div> {index + 1 + limit * (currentPage - 1)}</div>,
    },
    {
      title: 'Question Name',
      dataIndex: 'name',
      key: 'name',
      render: (name) => {
        const htmlContent = name;
        const startTagIndex = htmlContent.indexOf('>') + 1;
        const endTagIndex = htmlContent.lastIndexOf('<');
        const content = htmlContent.slice(startTagIndex, endTagIndex).trim();

        const plainText = content.replace(/<[^>]+>/g, '');

        const slicedText = plainText.slice(0, 70);

        const finalHTML = `<p>${slicedText}...</p>`;
        return <div dangerouslySetInnerHTML={{ __html: finalHTML }} />;
      },
    },
    {
      title: 'Test Paper',
      dataIndex: 'testPaperDetails',
      key: 'testPaperDetails',
      render: (name, records) => (
        <div
          style={{
            color: records?.sampleTestId?.length > 0 || records?.testId ? 'green' : 'red',
          }}
        >
          {/* {records?.testPaperDetails ? (
            <div dangerouslySetInnerHTML={{ __html: records?.testPaperDetails?.name }} />
          ) : (
            <>N/A</>
          )} */}
          {records?.sampleTestId?.length > 0 || records?.testId ? 'Assigned' : 'Not Assigned'}
        </div>
      ),
    },

    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      width: 100,
      render: (_, record) => (
        <div className="flex">
          <Button
            className="mr-2"
            onClick={() => {
              setModal({
                id: record?._id,
                visible: true,
              });
            }}
          >
            Edit
          </Button>

          <Popconfirm
            title="Are you sure to delete the question?"
            onConfirm={() => {
              deleteQuestions(record?._id)
                .then(() => {
                  message.success('Question Deleted Successfully');
                  getQuestionDetailsFun();
                  if (getQuestionPaperDetails?.data?.length === 1) {
                    setStart(0);
                    setLimit(10);
                    setCurrentPage(1);
                  }
                })
                .catch((err) => {
                  notification?.error({
                    message: err?.message,
                  });
                });
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger">Delete</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getQuestionDetailsFun();
  }, [start, limit, currentPage]);

  const saveQuestionsFun = (values) => {
    setLoading(true);
    if (!modal?.id) {
      addQuestions({
        body: {
          name: richText?.toString('html'),
          answer: {
            option: values?.answer,
            explanation: values?.explanation,
          },
          options: [
            {
              option: 'A',
              text: values?.first,
            },
            {
              option: 'B',
              text: values?.second,
            },
            {
              option: 'C',
              text: values?.third,
            },
            {
              option: 'D',
              text: values?.fourth,
            },
          ],
        },
      }).then(() => {
        message.success(`Question Added successfully`);
        getQuestionDetailsFun();
        setLoading(false);
        form.resetFields();
        setRichText(RichTextEditor.createEmptyValue());
        setModal({
          visible: false,
          id: '',
        });
      });
    } else {
      updateQuestion({
        body: {
          name: richText?.toString('html'),
          answer: {
            option: values?.answer,
            explanation: values?.explanation,
          },
          options: [
            {
              option: 'A',
              text: values?.first,
            },
            {
              option: 'B',
              text: values?.second,
            },
            {
              option: 'C',
              text: values?.third,
            },
            {
              option: 'D',
              text: values?.fourth,
            },
          ],
        },
        id: modal?.id,
      }).then(() => {
        message.success(`Question Updated successfully`);
        getQuestionDetailsFun();
        setLoading(false);
        form.resetFields();
        setRichText(RichTextEditor.createEmptyValue());
        setModal({
          visible: false,
          id: '',
        });
      });
    }
  };
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

          const data = RichTextEditor.createValueFromString(res?.data?.data?.name, 'html');

          setRichText(data);
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
  ];

  return (
    <>
      <PageHeader
        title="Question"
        routes={PageRoutes}
        className="flex items-center justify-between px-8 xl:px-[15px] pt-2 pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
      />
      <GlobalUtilityStyle className="p-3  ">
        <Row gutter={16}>
          <Col sm={24} xs={24} lg={24} className="">
            <Cards
              moreBtn={
                <Button
                  onClick={() => {
                    setModal({
                      visible: true,
                      id: '',
                    });
                  }}
                  type="primary"
                >
                  Add
                </Button>
              }
              title="Questions"
              border={false}
              size="default"
            >
              <Spin spinning={loading}>
                <div className="bg-white dark:bg-white10 p-[2px] rounded-[10px]">
                  <div className="table-responsive table-th-shape-none table-head-rounded table-th-text-light hover-tr-none ltr:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:first-child]:rounded-l-10 rtl:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:first-child]:rounded-r-10 rtl:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:first-child]:rounded-none ltr:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:last-child]:rounded-r-10 rtl:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:last-child]:rounded-l-10 rtl:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:last-child]:rounded-none">
                    <Table
                      pagination={false}
                      dataSource={getQuestionPaperDetails?.data}
                      columns={columns}
                      loading={loading}
                    />
                  </div>
                </div>
              </Spin>
            </Cards>
            <Col xs={24} className="pb-30">
              <PaginationWrapper style={{ marginTop: 10 }}>
                {getQuestionPaperDetails?.data?.length ? (
                  <Pagination
                    onChange={(page, pageSize) => {
                      setStart(pageSize * (page - 1));

                      setCurrentPage(page);
                      setLimit(pageSize);
                    }}
                    pageSizeOptions={['10', '20', '50', '100']}
                    showSizeChanger
                    onShowSizeChange={(_, size) => {
                      setLimit(size);
                      setCurrentPage(1);
                      setStart(0);
                    }}
                    pageSize={limit}
                    defaultCurrent={1}
                    total={getQuestionPaperDetails?.totalDocs}
                  />
                ) : null}
              </PaginationWrapper>
            </Col>
          </Col>
        </Row>
        <Modal
          width={800}
          open={modal?.visible}
          closable
          onCancel={() => {
            form.resetFields();

            setModal({
              visible: false,
              id: '',
            });
          }}
          footer={false}
        >
          <Form layout="vertical" form={form} name="basicforms" onFinish={(values) => saveQuestionsFun(values)}>
            <div className="p-4">
              <div className="mb-4 text-xl">Add Multiple Choice Question</div>

              <AddQuestionEditor richText={richText} onChange={setRichText} />

              <Row gutter={[20]}>
                <Col sm={24} xs={24} lg={12}>
                  <Form.Item
                    label="Option A"
                    name="first"
                    rules={[{ required: true, message: 'Please enter your First Option!' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col sm={24} xs={24} lg={12}>
                  <Form.Item
                    label="Option B"
                    name="second"
                    rules={[{ required: true, message: 'Please enter your Second Option!' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[20]}>
                <Col sm={24} xs={24} lg={12}>
                  <Form.Item
                    label="Option C"
                    name="third"
                    rules={[{ required: true, message: 'Please enter your Third Option!' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col sm={24} xs={24} lg={12}>
                  <Form.Item
                    label="Option D"
                    name="fourth"
                    rules={[{ required: true, message: 'Please enter your Fourth Option!' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                label="Answer"
                name="answer"
                rules={[{ required: true, message: 'Please enter your correct answer!' }]}
              >
                <Select defaultValue="Select Correct  Option" style={{ width: '100%' }}>
                  <Select.Option value="A">A</Select.Option>
                  <Select.Option value="B">B</Select.Option>
                  <Select.Option value="C">C</Select.Option>
                  <Select.Option value="D">D</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Explanation"
                name="explanation"
                // rules={[{ required: true, message: 'Please enter your explanation!' }]}
              >
                <Input placeholder="Enter the Explanation" />
              </Form.Item>
              <div className="flex justify-end w-full">
                <Button
                  className="mr-2"
                  onClick={() => {
                    form.resetFields();
                    setModal({
                      visible: false,
                      id: '',
                    });
                  }}
                >
                  Cancel
                </Button>
                <Button
                  loading={loading}
                  type="primary"
                  onClick={() => {
                    form.submit();
                  }}
                >
                  {modal?.id ? 'Update' : 'Add'}
                </Button>
              </div>
            </div>
          </Form>
        </Modal>
      </GlobalUtilityStyle>
    </>
  );
}

export default QuestionBank;
