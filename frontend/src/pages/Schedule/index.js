import React, { useState } from 'react';
import { ScheduleContainer, Wrap } from './style';
import { useSelector } from 'react-redux';

function Schedule() {
  const [data, setData] = useState('');
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <ScheduleContainer>
      {isAuthenticated ? '' : <Wrap>로그인이 필요한 서비스입니다.</Wrap>}
    </ScheduleContainer>
  );
}

export default Schedule;
