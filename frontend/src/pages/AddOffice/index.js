import { Input } from 'antd';
import Form from 'antd/lib/form/Form';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { officeAddAction } from 'redux/actions/office_actions';
import { SubmitButton, Title, LocationInput, AddContainer } from './style';

function AddOffice() {
  const { userId } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    location: '',
    name: '',
  });

  const dispatch = useDispatch();

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const { location, name } = form;

      let data = { location, name, memberId: userId };

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
          <Input
            id="name"
            name="name"
            onChange={onChange}
            placeholder="연구실 명을 입력하세요."
            style={{ height: '48px' }}
          />
        </div>
        <SubmitButton type="primary" onClick={onSubmit}>
          작성하기
        </SubmitButton>
      </Form>
    </AddContainer>
  );
}

export default AddOffice;
