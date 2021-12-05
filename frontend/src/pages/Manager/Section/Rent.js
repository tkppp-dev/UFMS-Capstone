import { Button, Select, Table } from 'antd';
import { Wrap } from 'pages/PlaceDetail/style';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { rentalListAction } from 'redux/actions/rental_actions';
import { RentalContainer } from 'pages/Rental/style';
import { loadingRentAction } from 'redux/actions/manager_actions';
import axios from 'axios';
import { Link } from 'react-router-dom';

const { Option } = Select;

function Rent() {
  const columns = [
    {
      title: '번호',
      dataIndex: 'id',
      key: 'id',
      width: '5%',
      align: 'center',
    },
    {
      title: '그룹명',
      dataIndex: 'groupName',
      key: 'groupName',
      align: 'center',
      width: '10%',
    },
    {
      title: '목적',
      dataIndex: 'purpose',
      key: 'purpose',
      align: 'center',
    },
    {
      title: '기간',
      dataIndex: 'startDate',
      key: 'startDate',
      align: 'center',
      width: '20%',
      render: (startDate, record) => (
        <div>
          {startDate} ~ {record.endDate}
        </div>
      ),
    },
    {
      title: '상태',
      dataIndex: 'rentalStatus',
      key: 'rentalStatus',
      align: 'center',
      width: '10%',
    },
    {
      title: '승인',
      align: 'center',
      width: '12%',
      render: (record) => (
        <div>
          <Button type="primary" onClick={() => onSubmit(record.id)}>
            승인
          </Button>
        </div>
      ),
    },
  ];

  const { facilities } = useSelector((state) => state.rental);
  const { rentList } = useSelector((state) => state.manager);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(rentalListAction());
  }, [dispatch]);

  const onChangeHanlder = useCallback(
    (e) => {
      const facilityName = e;

      dispatch(loadingRentAction(facilityName));
    },
    [dispatch],
  );

  const onSubmit = useCallback((e) => {
    axios.get(`/rental/complete/${e}`).then((res) => {
      alert('대관 예약이 승인되었습니다.');
    });
  }, []);

  return (
    <RentalContainer>
      <Wrap>
        <div style={{ marginBottom: '16px' }}>
          <span>대관 신청 승인을 위한 시설을 선택해주세요 : </span>
          <Select defaultValue="x" onChange={onChangeHanlder}>
            <Option value="x">시설명</Option>
            {Array.isArray(facilities) ? (
              facilities.map((facility) => (
                <Option key={facility} value={facility}>
                  {facility}
                </Option>
              ))
            ) : (
              <div>해당 시설에 예약이 없습니다.</div>
            )}
          </Select>
        </div>

        <Table
          columns={columns}
          dataSource={Array.isArray(rentList) ? rentList : ''}
          pagination={{ position: ['none', 'bottomCenter'] }}
        />
        <div
          style={{ float: 'right', marginTop: '16px', marginBottom: '32px' }}
        >
          <Button>
            <Link to="/manager">시설 관리하기</Link>
          </Button>
          <Button>
            <Link to="/manager/building">건물 관리하기</Link>
          </Button>
        </div>
      </Wrap>
    </RentalContainer>
  );
}

export default Rent;
