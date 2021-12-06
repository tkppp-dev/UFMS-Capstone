import { Button, Input, Table } from 'antd';
import Form from 'antd/lib/form/Form';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addScheduleAction,
  searchSubjectAction,
} from 'redux/actions/schedule_actions';
import { ScaContainer } from './style';

function ScheduleAdd() {
  const [value, setValues] = useState({
    subject: '',
    subjectId: 0,
  });

  const { user, userId } = useSelector((state) => state.auth);
  const { subjects } = useSelector((state) => state.schedule);

  const dispatch = useDispatch();

  const columns = [
    {
      title: '과목명',
      dataIndex: 'subjectName',
      align: 'center',
    },
    {
      title: '분반',
      align: 'center',
      dataIndex: 'classroom',
    },
    {
      title: '이수구분',
      align: 'center',
      dataIndex: 'completionType',
    },
    {
      title: '날짜/시간',
      align: 'center',
      dataIndex: 'lectureDate',
    },
    {
      title: '교수',
      align: 'center',
      dataIndex: 'professor',
    },
    {
      title: '위치',
      align: 'center',
      dataIndex: 'room',
    },
    {
      title: '학기',
      align: 'center',
      dataIndex: 'semester',
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setValues({
        subjectId: selectedRowKeys[0],
      });
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  const onChange = (e) => {
    setValues({
      [e.target.name]: e.target.value,
    });
  };

  const onSearch = useCallback(
    (e) => {
      e.preventDefault();

      const data = {
        searchData: value.subject,
        type: user.privileges === 'PROFESSOR' ? 'professor' : 'subject',
      };

      dispatch(searchSubjectAction(data));
    },
    [dispatch, value],
  );

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const data = {
        memberId: userId,
        subjectId: value.subjectId,
      };

      console.log(data);

      dispatch(addScheduleAction(data));
    },
    [dispatch, value, userId],
  );

  return (
    <ScaContainer>
      <h1>스케줄 추가하기</h1>
      <hr />
      <div style={{ marginTop: '16px', marginBottom: '32px' }}>
        <Form style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Input
            id="subject"
            name="subject"
            placeholder="검색할 과목을 입력하세요"
            onChange={onChange}
            style={{ marginRight: '8px' }}
          />
          <Button onClick={onSearch} type="primary">
            검색
          </Button>
        </Form>
      </div>
      <Table
        rowSelection={{
          type: 'radio',
          ...rowSelection,
        }}
        rowKey={'id'}
        pagination={{ position: ['none', 'none'] }}
        columns={columns}
        dataSource={Array.isArray(subjects) ? subjects : []}
      />
      <Button
        type="primary"
        style={{
          float: 'right',
          marginTop: '16px',
        }}
        onClick={onSubmit}
      >
        추가하기
      </Button>
    </ScaContainer>
  );
}

export default ScheduleAdd;
