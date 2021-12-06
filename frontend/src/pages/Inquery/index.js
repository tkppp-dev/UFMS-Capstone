import React, { useEffect } from 'react';
import { Button, Table } from 'antd';
import { Link } from 'react-router-dom';
import { RentContainer } from './style';
import { useDispatch, useSelector } from 'react-redux';
import { loadInqueriesAction } from 'redux/actions/inquery_actions';

function Inquery() {
  const { inqueries } = useSelector((state) => state.inquery);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadInqueriesAction());
  }, [dispatch]);

  const columns = [
    {
      title: '번호',
      dataIndex: 'id',
      key: 'id',
      width: '5%',
      align: 'center',
    },
    {
      title: '제목',
      dataIndex: 'title',
      key: 'title',
      align: 'center',
      width: '60%',
      render: (title, record) => (
        <Link
          to={`/inquery/detail/${record.id}`}
          style={{ color: 'black', textAlign: 'start' }}
        >
          {title.length >= 100 ? title.slice(0, 100) + '...' : title}
        </Link>
      ),
    },
    {
      title: '작성자',
      dataIndex: 'author',
      key: 'author',
      width: '10%',
      align: 'center',
    },
    {
      title: '등록일자',
      dataIndex: 'modifiedDate',
      key: 'modifiedDate',
      width: '15%',
      align: 'center',
      render: (modifiedDate) => <div>{modifiedDate.slice(0, 10)}</div>,
    },
  ];

  return (
    <RentContainer>
      <Table
        columns={columns}
        dataSource={inqueries}
        pagination={{ position: ['none', 'bottomCenter'] }}
      />
      <Link to="/inquery/write">
        <Button type="primary">글 작성</Button>
      </Link>
    </RentContainer>
  );
}

export default Inquery;
