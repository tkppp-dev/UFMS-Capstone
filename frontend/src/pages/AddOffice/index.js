import { TimePicker } from 'antd';
import Form from 'antd/lib/form/Form';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { officeAddAction } from 'redux/actions/office_actions';
import {
  NoticeInput,
  SubmitButton,
  Title,
  LocationInput,
  AddContainer,
} from './style';

function AddOffice() {
  const { userId } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    location: '',
    notice: '',
    startTime: '',
    endTime: '',
  });

  const dispatch = useDispatch();

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onTimeChange = (time, timeString) => {
    setForm({
      ...form,
      startTime: timeString[0],
      endTime: timeString[1],
    });
  };

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const { location, notice, startTime, endTime } = form;

      let data = { location, notice, startTime, endTime, memberId: userId };

      dispatch(officeAddAction(data));
    },
    [form, userId, dispatch],
  );

  return (
    <AddContainer>
      <Title>사무실 / 연구실 추가하기</Title>
      <Form onFinish={onSubmit}>
        <LocationInput
          name="location"
          id="location"
          placeholder="위치를 입력하세요"
          onChange={onChange}
        />
        <div style={{ marginTop: '16px' }}>
          <label for="time">시간을 선택하세요 : </label>
          <TimePicker.RangePicker
            id="time"
            name="time"
            onChange={onTimeChange}
          />
        </div>
        <NoticeInput
          name="notice"
          id="notice"
          onChange={onChange}
          placeholder="공지사항을 입력하세요"
        />
        <SubmitButton type="primary" onClick={onSubmit}>
          작성하기
        </SubmitButton>
      </Form>
    </AddContainer>
  );
}

export default AddOffice;
