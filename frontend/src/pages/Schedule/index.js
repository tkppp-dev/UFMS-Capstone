import React from 'react';
import { useSelector } from 'react-redux';
import { ScheduleContainer, Wrap } from './style';

function Schedule() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <ScheduleContainer>
      <Wrap>
        {true ? <div>schedule</div> : <div>로그인이 필요한 서비스입니다.</div>}
      </Wrap>
    </ScheduleContainer>
  );
}

export default Schedule;
