import React, { useEffect, useState } from 'react';
import { Row, Col, Table, Pagination } from 'antd';
import { GlobalUtilityStyle, PaginationStyle } from '../styled';
import Heading from '../../components/heading/heading';
import { AutoComplete } from '../../components/autoComplete/autoComplete';
import { getCustomers } from '../../redux/2brcicCustomers/service';

function Customers() {
  const [getCustomerData, setCustomerData] = useState([]);
  const [start, setStart] = useState(0);
  const [limit, setLimit] = useState(10);
  const [keyword, setKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = (searchText) => {
    if (getCustomerData?.totalDocs) setKeyword(searchText);
  };
  const getContactUsFun = () => {
    getCustomers({ start, limit, keyword }).then((res) => {
      setCustomerData(res?.data);
    });
  };
  useEffect(() => {
    getContactUsFun();
  }, [start, limit, keyword]);

  const usersTableColumns = [
    {
      title: 'Sr no.',
      key: 'srNo',
      render: (_, __, index) => <div> {index + 1 + limit * (currentPage - 1)}</div>,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      align: 'center',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      align: 'center',
      key: 'phone',
    },

    // {
    //   title: 'Action',
    //   dataIndex: 'action',
    //   key: 'action',
    //   render: () => (
    //     <div className=" flex w-full  justify-end">
    //       <Button type="light" className="mr-2">
    //         Pending
    //       </Button>
    //       <Button type="danger">Delete</Button>
    //     </div>
    //   ),
    // },
  ];

  return (
    <>
      <div className="flex items-center justify-between pt-[42px] pb-[35px] px-[25px] text-dark dark:text-white87 font-medium text-[17px] md:justify-center md:flex-col gap-[20px]">
        <div className="inline-flex flex-wrap items-center md:justify-center gap-[20px]">
          <Heading as="h4" className="text-dark dark:text-white87 text-[22px] font-semibold mb-0">
            Customers
          </Heading>
          <div className="ltr:ml-[5px] rtl:mr-[5px] [&>.ant-select>.ant-select-selector]:min-w-[350px] sm:[&>.ant-select>.ant-select-selector]:min-w-[100%] [&>.ant-select>.ant-select-selector>.ant-select-selection-search>.ant-input-affix-wrapper]:rounded-md  [&>div>div>span>span]:border-none">
            <AutoComplete onSearch={handleSearch} placeholder="Search by Name" width="100%" patterns />
          </div>
        </div>
      </div>

      <main className="min-h-[715px] lg:min-h-[580px] px-8 xl:px-[15px] pb-[30px] bg-transparent">
        <Row gutter={15}>
          <Col xs={24}>
            <GlobalUtilityStyle>
              <PaginationStyle>
                {/* <div className="flex mb-10">
                  {['All', 'pending', 'completed']?.map((i) => {
                    return (
                      <Button
                        className="mr-3 capitalize"
                        type={status === i ? 'primary' : 'secondary'}
                        onClick={() => {
                          setStatus(i);
                        }}
                      >
                        {i}
                      </Button>
                    );
                  })}
                </div> */}
                <div className="ant-pagination-custom-style table-responsive hover-tr-none table-th-shape-none table-last-th-text-right table-th-border-none table-head-rounded table-selection-col-pl-25 table-tr-selected-background-transparent table-td-border-none bg-white dark:bg-white10 p-[25px] rounded-[10px] ltr:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:first-child]:rounded-l-10 rtl:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:first-child]:rounded-r-10 rtl:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:first-child]:rounded-none ltr:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:last-child]:rounded-r-10 rtl:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:last-child]:rounded-l-10 rtl:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:last-child]:rounded-none">
                  <Table
                    className="[&>div>div>.ant-table]:mb-7 [&>div>div>.ant-table]:pb-5 [&>div>div>.ant-table]:border-b [&>div>div>.ant-table]:border-regular dark:[&>div>div>.ant-table]:border-white10 ltr:[&>div>div>div>div>div>table>thead>tr>th:first-child]:pl-[20px] ltr:[&>div>div>div>div>div>table>tbody>tr>td:first-child]:pl-[20px] rtl:[&>div>div>div>div>div>table>thead>tr>th:first-child]:pr-[20px] rtl:[&>div>div>div>div>div>table>tbody>tr>td:first-child]:pr-[20px]"
                    dataSource={getCustomerData?.data}
                    columns={usersTableColumns}
                    pagination={false}
                  />
                </div>
                {getCustomerData?.data?.length ? (
                  <div className="w-full justify-end flex mt-3">
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
                        setStart(0);
                        setCurrentPage(1);
                      }}
                      pageSize={limit}
                      defaultCurrent={1}
                      total={getCustomerData?.totalDocs}
                    />
                  </div>
                ) : null}
              </PaginationStyle>
            </GlobalUtilityStyle>
          </Col>
        </Row>
      </main>
    </>
  );
}

export default Customers;
