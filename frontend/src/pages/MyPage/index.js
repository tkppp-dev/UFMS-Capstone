import { Button } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadOfficeAction } from 'redux/actions/office_actions';
import {
  scheduleNextAction,
  scheduleNowAction,
} from 'redux/actions/schedule_actions';
import { MyPageContainer, Profile, Schedule, Wrap } from './style';

function MyPage() {
  const { user, userId } = useSelector((state) => state.auth);
  const { office } = useSelector((state) => state.office);
  const { now, next } = useSelector((state) => state.schedule);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(scheduleNowAction(userId));
    dispatch(scheduleNextAction(userId));
    dispatch(loadOfficeAction(userId));
  }, [dispatch, userId]);

  return (
    <MyPageContainer>
      <Button type="primary" style={{ marginLeft: '5%', marginTop: '32px' }}>
        <Link to="/manager">관리자 페이지로 이동</Link>
      </Button>
      <Wrap>
        <Profile>
          <div>
            <h2>프로필</h2>
            <div>
              <b>이름</b> : {user.username}
            </div>
            <div>
              <b>학번</b> : 17011583
            </div>
            <div>
              <b>학과</b> : 컴퓨터공학과
            </div>
          </div>
          {/* {user.privileges === 'PROFESSOR' ? (
            <div>
              <h2>나의 사무실 / 연구실 관리</h2>
              <div>
                <h3>율곡관 501호</h3>
              </div>
              <div>
                <b>상태</b> 재실
              </div>
              <div>
                <b>공지사항</b> 세미나 참석으로 부재
              </div>
              <Button
                style={{ float: 'right', marginTop: '16px' }}
                type="primary"
              >
                <Link to="/manage/office">관리하기</Link>
              </Button>
            </div>
          ) : (
            <div>
              <h2>나의 사무실 / 연구실 관리</h2>교수자만 사용 가능합니다.
            </div>
          )} */}
          <div>
            <h2>나의 사무실 / 연구실 관리</h2>
            {Array.isArray(office.data)
              ? office.data.map((off) => (
                  <div>
                    <div>
                      <h3>{off.name}</h3>
                    </div>
                    <div>
                      <b>위치</b> {off.location}
                    </div>
                    <div>
                      <b>상태</b> {off.state}
                    </div>
                    <div>
                      <b>공지사항</b> {off.notice}
                    </div>
                  </div>
                ))
              : ''}
            <Button
              style={{ float: 'right', marginTop: '16px' }}
              type="primary"
            >
              <Link to="/manage/office">관리하기</Link>
            </Button>
          </div>
        </Profile>
        <Schedule>
          <div>
            <h2>현재 스케줄</h2>
            {now ? (
              <div>
                <div>
                  <h3>스케줄 이름</h3> : {now.reservationName}
                </div>
                <div>
                  <h3>위치</h3> : {now.facility}
                </div>
                <div>
                  <h3>시간</h3> : {now.time}
                </div>
                <div>
                  <h3>상태</h3> : {now.reservationStatus}
                </div>
              </div>
            ) : (
              <div>현재 스케줄이 없습니다.</div>
            )}
          </div>

          <div>
            <h2 style={{ marginTop: '16px' }}>다음 스케줄</h2>
            {next ? (
              <div>
                <div>
                  <h3>스케줄 이름</h3> : {next.reservationName}
                </div>
                <div>
                  <h3>위치</h3> : {next.facility}
                </div>
                <div>
                  <h3>시간</h3> : {next.time}
                </div>
                <div>
                  <h3>상태</h3> : {next.reservationStatus}
                </div>
              </div>
            ) : (
              <div>다음 스케줄이 없습니다.</div>
            )}
          </div>
          <Button style={{ float: 'right' }} type="primary">
            <Link to="/schedule">스케줄 관리하러 가기</Link>
          </Button>
        </Schedule>
      </Wrap>
    </MyPageContainer>
  );
}

export default MyPage;
