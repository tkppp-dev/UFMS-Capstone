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
import axios from 'axios';

const { Option } = Select;

function getListData(value, selectWeek) {
  let listData = [];
  let week = ['일', '월', '화', '수', '목', '금', '토'];

  value.map((data) => {
    data.map((dt) =>
      week[new Date(dt.date).getDay()] === selectWeek
        ? listData.push(dt)
        : console.log(''),
    );
  });

  return listData;
}

function Schedule() {
  const [selectWeek, setSelectWeek] = useState('');

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { schedule, schedules } = useSelector((state) => state.schedule);

  const list = getListData(schedule, selectWeek);

  const dispatch = useDispatch();

  const handleChange = (value) => {
    setSelectWeek(value);
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

  const onDeleteReservation = useCallback((e) => {
    axios.delete(`/reservation/${Number(e)}`).then((res) => {
      alert('예약이 삭제되었습니다.');
      window.location.reload();
    });
  }, []);
  const info = Array.isArray(list)
    ? list.map((data) => (
        <Col span={6} style={{ marginBottom: '16px' }} key={data.reservationId}>
          <Card
            title={data.reservationName}
            extra={
              <div
                onClick={() => onDeleteReservation(data.reservationId)}
                style={{ color: '#FF4D4E', cursor: 'pointer' }}
              >
                삭제
              </div>
            }
            style={{
              width: 300,
              height: '200px',
            }}
          >
            <div>날짜 : {data.date}</div>
            <div>시간 : {data.time}</div>
            <div>장소 : {data.facility}</div>
            <div>상태 : {data.reservationStatus}</div>
          </Card>
        </Col>
      ))
    : '';

  return (
    <ScheduleContainer>
      <div
        style={{
          width: '90%',
          marginLeft: '5%',
          marginTop: '32px',
          borderBottom: '1px solid #dbdbdb',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <h1>강의 스케줄</h1>
        <Button type="primary">
          <Link to="/schedule/add">강의 스케줄 추가</Link>
        </Button>
      </div>

      <div style={{ width: '90%', marginLeft: '5%', marginTop: '32px' }}>
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
                          style={{ color: '#FF4D4E', cursor: 'pointer' }}
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

        <div
          style={{
            marginTop: '64px',
            borderBottom: '1px solid #dbdbdb',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <h1>강의실 예약 내역</h1>
          {isAuthenticated ? (
            <div>
              <Select defaultValue="X" onChange={handleChange}>
                <Option value="X">요일을 선택하세요</Option>
                <Option value="월">월요일</Option>
                <Option value="화">화요일</Option>
                <Option value="수">수요일</Option>
                <Option value="목">목요일</Option>
                <Option value="금">금요일</Option>
                <Option value="토">토요일</Option>
                <Option value="일">일요일</Option>
              </Select>
            </div>
          ) : (
            ''
          )}
        </div>

        <Row style={{ marginTop: '32px', marginBottom: '64px' }}>
          {isAuthenticated ? info : <Wrap>로그인이 필요한 서비스입니다.</Wrap>}
          {Array.isArray(list) ? (
            list.length <= 0 ? (
              <div>예약 내역이 존재하지 않습니다.</div>
            ) : (
              ''
            )
          ) : (
            ''
          )}
        </Row>
      </div>
      {isAuthenticated ? '' : <Wrap>로그인이 필요한 서비스입니다.</Wrap>}
    </ScheduleContainer>
  );
}

export default Schedule;
