import React, { useCallback, useEffect, useState } from 'react';
import { ScheduleContainer, Wrap } from './style';
import { useDispatch, useSelector } from 'react-redux';
import {
  scheduleDeleteAction,
  scheduleListAction,
} from 'redux/actions/schedule_actions';
import { Button, Card, Col, Row, Select } from 'antd';
import { Link } from 'react-router-dom';

const { Option } = Select;

function Schedule() {
  const [data, setData] = useState('');
  const [week, setWeek] = useState(['일', '월', '화', '수', '목', '금', '토']);
  const [selectWeek, setSelectWeek] = useState('');

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { schedules } = useSelector((state) => state.schedule);

  const dispatch = useDispatch();

  const handleChange = (value) => {
    setSelectWeek(value);
  };

  const onDeleteSchedule = useCallback(
    (scheduleId) => {
      dispatch(scheduleDeleteAction(scheduleId));
    },
    [dispatch],
  );

  useEffect(() => {
    let today = new Date();

    // const data = {
    //   memberId: user.memberId,
    //   startDate: today.toISOString().slice(0, 10),
    //   endDate: today.toISOString().slice(0, 10),
    // };

    const data = {
      endDate: '2021-12-04',
      memberId: 0,
      startDate: '2021-12-04',
    };

    dispatch(scheduleListAction(data));
  }, [dispatch]);

  const information = Array.isArray(schedules)
    ? schedules.map(
        (
          date,
          reservationName,
          facility,
          time,
          reservationStatus,
          reservationId,
        ) =>
          week[new Date(schedules.data).getDay()] === selectWeek ? (
            <Col span={6} style={{ marginBottom: '16px' }} key={reservationId}>
              <Card
                title={reservationName}
                extra={
                  <div
                    // onClick={() => showModal(building)}
                    style={{ color: '#1990ff', cursor: 'pointer' }}
                  >
                    More
                  </div>
                }
                style={{
                  width: 300,
                  height: '200px',
                }}
              >
                <div>날짜 : {date}</div>
                <div>시간 : {time}</div>
                <div>장소 : {facility}</div>
                <div>상태 : {reservationStatus}</div>
              </Card>
            </Col>
          ) : (
            ''
          ),
      )
    : '';

  return (
    <ScheduleContainer>
      {console.log(schedules)}
      {isAuthenticated ? (
        <div
          style={{
            marginTop: '32px',
            marginBottom: '32px',
            display: 'flex',
            justifyContent: 'space-between',
            marginLeft: '5%',
            marginRight: '5%',
          }}
        >
          <Select defaultValue="월" onChange={handleChange}>
            <Option value="월">월요일</Option>
            <Option value="화">화요일</Option>
            <Option value="수">수요일</Option>
            <Option value="목">목요일</Option>
            <Option value="금">금요일</Option>
            <Option value="토">토요일</Option>
            <Option value="일">일요일</Option>
          </Select>
          <Button type="primary">
            <Link to="/schedule/add">스케줄 추가</Link>
          </Button>
        </div>
      ) : (
        ''
      )}

      <div style={{ width: '90%', marginLeft: '5%' }}>
        <Row>
          {isAuthenticated ? (
            information
          ) : (
            <Wrap>로그인이 필요한 서비스입니다.</Wrap>
          )}
        </Row>
      </div>
      {isAuthenticated ? '' : <Wrap>로그인이 필요한 서비스입니다.</Wrap>}
    </ScheduleContainer>
  );
}

export default Schedule;
