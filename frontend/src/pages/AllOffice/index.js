import { Button, Input, Table } from 'antd';
import Form from 'antd/lib/form/Form';
import { ScaContainer } from 'pages/ScheduleAdd/style';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadOfficeAction } from 'redux/actions/office_actions';

function AllOffice() {
  const [value, setValues] = useState({
    subject: '',
    subjectId: 0,
    professorName: '',
  });

  const { office } = useSelector((state) => state.office);

  const dispatch = useDispatch();

  const columns = [
    {
      title: '연구실 명',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: '위치',
      align: 'center',
      dataIndex: 'location',
    },
    {
      title: '공지사항',
      align: 'center',
      dataIndex: 'notice',
    },
    {
      title: '상태',
      align: 'center',
      dataIndex: 'state',
    },
  ];

  const onChange = (e) => {
    setValues({
      [e.target.name]: e.target.value,
    });
  };

  const onSearch = useCallback(
    (e) => {
      e.preventDefault();

      const data = {
        professorName: value.professorName,
      };

      dispatch(loadOfficeAction(data));
    },
    [dispatch, value],
  );

  return (
    <ScaContainer>
      <h1>연구실 확인</h1>
      <hr />
      <div style={{ marginTop: '16px', marginBottom: '32px' }}>
        <Form style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Input
            id="professorName"
            name="professorName"
            placeholder="검색할 교수명을 입력하세요"
            onChange={onChange}
            style={{ marginRight: '8px' }}
          />
          <Button onClick={onSearch} type="primary">
            검색
          </Button>
        </Form>
      </div>
      <Table
        columns={columns}
        dataSource={Array.isArray(office) ? office : []}
      />
    </ScaContainer>
  );
}

export default AllOffice;
