import React, { useEffect } from 'react';
import { Button, Table } from 'antd';
import { Link } from 'react-router-dom';
import { RentContainer } from './style';
import { useDispatch, useSelector } from 'react-redux';
import { loadInqueriesAction } from 'redux/actions/inquery_actions';

const data = [
  {
    key: '1',
    name: 'John Brown',
    title:
      'New York No. 1 Lake Park, New York No. 1 Lake Park New York No. 1 Lake Park, New York No. 1 Lake Park New York No. 1 Lake Park, New York No. 1 Lake Park',
    register_date: '2021-10-29',
  },
  {
    key: '2',
    name: 'Jim Green',
    title: 'London No. 2 Lake Park, London No. 2 Lake Park',
    register_date: '2021-10-29',
  },
];

function Inquery() {
  const { inqueries } = useSelector((state) => state.inquery);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadInqueriesAction());
  }, [dispatch]);

  const columns = [
    {
      title: '번호',
      dataIndex: 'key',
      key: 'key',
      width: '5%',
      align: 'center',
    },
    {
      title: '제목',
      dataIndex: 'title',
      key: 'title',
      align: 'center',
      width: '60%',
      render: (title) => (
        <Link
          // to={`/inquery/detail/${id}`}
          to="/inquery/detail/1"
          style={{ color: 'black', textAlign: 'start' }}
        >
          {title.length >= 100 ? title.slice(0, 100) + '...' : title}
        </Link>
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

  return (
    <RentContainer>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ position: ['none', 'bottomCenter'] }}
      />
      <Link to="/inquery/write">
        <Button type="primary">글 작성</Button>
      </Link>
    </RentContainer>
  );
}

export default Inquery;
