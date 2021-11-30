import { Button } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MyPageContainer, Profile, Schedule, Wrap } from './style';

function MyPage() {
  const { user } = useSelector((state) => state.auth);
  const { office } = useSelector((state) => state.office);

  return (
    <MyPageContainer>
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
          {user.privileges === 'PROFESSOR' ? (
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
          )}
        </Profile>
        <Schedule>
          <div>
            <h2>현재 스케줄</h2>
            <div>
              <h3>스케줄 이름</h3> : 컴퓨터공학 캡스톤디자인 2반
            </div>
            <div>
              <h3>위치</h3> : 율곡관 301호
            </div>
            <div>
              <h3>시간</h3> : 12:00~13:30
            </div>
          </div>

          <div>
            <h2 style={{ marginTop: '16px' }}>다음 스케줄</h2>
            <div>
              <h3>스케줄 이름</h3> : 컴퓨터공학 캡스톤디자인 2반
            </div>
            <div>
              <h3>위치</h3> : 율곡관 301호
            </div>
            <div>
              <h3>시간</h3> : 12:00~13:30
            </div>
            <Button style={{ float: 'right' }} type="primary">
              <Link to="/schedule">스케줄 관리하러 가기</Link>
            </Button>
          </div>
        </Schedule>
      </Wrap>
    </MyPageContainer>
  );
}

export default MyPage;
