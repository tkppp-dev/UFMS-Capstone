import React from 'react';
import { Button, Table, Tooltip } from 'antd';

const columns = [
  {
    title: '번호',
    dataIndex: 'key',
    key: 'key',
    width: '5%',
    align: 'center',
  },
  {
    title: '답변여부',
    dataIndex: 'answer',
    key: 'answer',
    width: '10%',
    align: 'center',
  },
  {
    title: '제목',
    dataIndex: 'title',
    key: 'title',
    align: 'center',
    width: '60%',
    render: (title) => (
      <div style={{ textAlign: 'start' }}>
        {title.length >= 100 ? title.slice(0, 100) + '...' : title}
      </div>
    ),
  },
  {
    title: '작성자',
    dataIndex: 'name',
    key: 'name',
    width: '10%',
    align: 'center',
  },
  {
    title: '등록일자',
    dataIndex: 'register_date',
    key: 'register_date',
    width: '15%',
    align: 'center',
  },
];

const data = [
  {
    key: '1',
    answer: '답변 완료',
    name: 'John Brown',
    title:
      'New York No. 1 Lake Park, New York No. 1 Lake Park New York No. 1 Lake Park, New York No. 1 Lake Park New York No. 1 Lake Park, New York No. 1 Lake Park',
    register_date: '2021-10-29',
  },
  {
    key: '2',
    answer: '답변 완료',
    name: 'Jim Green',
    title: 'London No. 2 Lake Park, London No. 2 Lake Park',
    register_date: '2021-10-29',
  },
  {
    key: '3',
    answer: '답변 미완료',
    name: 'Joe Black',
    title: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
    register_date: '2021-10-29',
  },
];

function PlaceRent() {
  return (
    <div style={{ width: '90%', marginLeft: '5%', marginTop: '64px' }}>
      <Table
        columns={columns}
        dataSource={data}
        style={{ width: '100%' }}
        pagination={{ position: ['none', 'bottomCenter'] }}
      />
      <Button type="primary" style={{ float: 'right' }}>
        글 작성
      </Button>
    </div>
  );
}

export default PlaceRent;
