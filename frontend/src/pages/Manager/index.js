import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ManagerContainer, Wrap } from './style';
import { Button, Card, Input, Select } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { getOfficeAction } from 'redux/actions/office_actions';
import Form from 'antd/lib/form/Form';
import { Link } from 'react-router-dom';

function Manager() {
  const [value, setForm] = useState({
    professor: '',
  });

  const { isAuthenticated } = useSelector((state) => state.auth);
  const { offices } = useSelector((state) => state.office);

  const [isModalVisible, setisModalVisible] = useState(false);

  const dispatch = useDispatch();

  const onChange = (e) => {
    setForm({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const showModal = () => {
    setisModalVisible(true);
  };

  const handleOk = () => {
    setisModalVisible(false);
  };
  const handleCancel = () => {
    setisModalVisible(false);
  };

  const getOffice = useCallback(
    (e) => {
      e.preventDefault();

      dispatch(getOfficeAction(value.professor));
    },
    [dispatch, value],
  );

  return (
    <ManagerContainer>
      {isAuthenticated ? (
        <div style={{ width: '90%' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              marginTop: '32px',
              marginBottom: '16px',
            }}
          >
            <Input
              id="professor"
              name="professor"
              placeholder="조회할 교수 이름을 입력하세요."
              style={{ marginRight: '8px' }}
              onChange={onChange}
            />
            <Button type="primary" onClick={getOffice}>
              연구실 조회
            </Button>
          </div>

          <Button>
            <Link to="/manage/office/add">연구실 추가</Link>
          </Button>
        </div>
      ) : (
        <Wrap>
          <div>로그인이 필요한 서비스입니다.</div>
        </Wrap>
      )}
    </ManagerContainer>
  );
}

export default Manager;
