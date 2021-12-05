import React, { useCallback, useEffect, useState } from 'react';
import { ScheduleContainer, Wrap } from './style';
import { useDispatch, useSelector } from 'react-redux';
import {
  scheduleAction,
  scheduleDeleteAction,
  scheduleListAction,
} from 'redux/actions/schedule_actions';
import { Button, Card, Col, Row, Select } from 'antd';
import { Link } from 'react-router-dom';

const { Option } = Select;

function Schedule() {
  const [data, setData] = useState([]);
  const [week, setWeek] = useState(['일', '월', '화', '수', '목', '금', '토']);
  const [selectWeek, setSelectWeek] = useState('');

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { schedule, schedules } = useSelector((state) => state.schedule);

  const dispatch = useDispatch();

  const handleChange = (value) => {
    setSelectWeek(value);
    setData([]);
  };

  const onDeleteSchedule = useCallback(
    (id) => {
      const scheduleId = id;

      dispatch(scheduleDeleteAction(scheduleId));
    },
    [dispatch],
  );

  useEffect(() => {
    let today = new Date();
    let end = new Date();

    end.setDate(today.getDate() + 7);

    const data = {
      memberId: user ? user.memberId : '',
      startDate: today.toISOString().slice(0, 10),
      endDate: end.toISOString().slice(0, 10),
    };

    dispatch(scheduleAction(data));
    dispatch(scheduleListAction(data.memberId));
  }, [dispatch, user]);

  const info = Array.isArray(schedule)
    ? schedule.map((data) => {
        data.map((dt) =>
          week[new Date(dt.date).getDay()] === selectWeek ? (
            <Col
              span={6}
              style={{ marginBottom: '16px' }}
              key={dt.reservationId}
            >
              {console.log(dt)}
              <Card
                title={dt.reservationName}
                extra={
                  <div
                    onClick={() => onDeleteSchedule(dt.reservationId)}
                    style={{ color: '#1990ff', cursor: 'pointer' }}
                  >
                    삭제
                  </div>
                }
                style={{
                  width: 300,
                  height: '200px',
                }}
              >
                <div>날짜 : {dt.date}</div>
                <div>시간 : {dt.time}</div>
                <div>장소 : {dt.facility}</div>
                <div>상태 : {dt.reservationStatus}</div>
              </Card>
            </Col>
          ) : (
            ''
          ),
        );
      })
    : '';

  return (
    <ScheduleContainer>
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
          {isAuthenticated ? info : <Wrap>로그인이 필요한 서비스입니다.</Wrap>}
        </Row>
        <Row>
          {isAuthenticated
            ? Array.isArray(schedules)
              ? schedules.map((schedule) => (
                  <Col
                    span={6}
                    style={{ marginBottom: '16px' }}
                    key={schedule.scheduleId}
                  >
                    <Card
                      title={schedule.subjectName}
                      extra={
                        <div
                          onClick={() => onDeleteSchedule(schedule.scheduleId)}
                          style={{ color: '#1990ff', cursor: 'pointer' }}
                        >
                          삭제
                        </div>
                      }
                      style={{
                        width: 300,
                        height: '200px',
                      }}
                    >
                      <div>교과명 : {schedule.subjectName}</div>
                      <div>위치 : {schedule.room}</div>
                      <div>교수 : {schedule.professor}</div>
                      <div>시간 : {schedule.lectureDate}</div>
                    </Card>
                  </Col>
                ))
              : ''
            : ''}
        </Row>
      </div>
      {isAuthenticated ? '' : <Wrap>로그인이 필요한 서비스입니다.</Wrap>}
    </ScheduleContainer>
  );
}

export default Schedule;
