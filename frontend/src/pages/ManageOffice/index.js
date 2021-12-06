import { Card, Input, Row } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { Button } from 'antd/lib/radio';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadOfficeAction,
  officeAddAction,
  officeDeleteAction,
  officeEditAction,
  officeEditStateAction,
} from 'redux/actions/office_actions';
import {
  ButtonContainer,
  ColBox,
  ManageContainer,
  ModalContainer,
  Title,
} from './style';

function ManageOffice() {
  const [isModalVisible, setisModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  const [modalValue, setModalValue] = useState({
    id: '',
    notice: '',
    state: '',
    name: '',
    location: '',
  });

  const showModal = (labId, notice, state) => {
    setisModalVisible(true);

    setModalValue({
      id: labId,
      notice,
      state,
    });
  };

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const handleOk = () => {
    setisModalVisible(false);
  };
  const handleCancel = () => {
    setisModalVisible(false);
  };

  const handleAddOk = () => {
    setIsAddModalVisible(false);
  };
  const handleAddCancel = () => {
    setIsAddModalVisible(false);
  };

  const { user, userId } = useSelector((state) => state.auth);
  const { office } = useSelector((state) => state.office);

  const dispatch = useDispatch();

  useEffect(() => {
    const data = {
      professorName: user.username,
    };
    dispatch(loadOfficeAction(data));
  }, [dispatch, user]);

  const onChange = (e) => {
    setModalValue({
      ...modalValue,
      [e.target.name]: e.target.value,
    });
  };

  const onEditSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const { id, notice } = modalValue;
      const data = { id: id, notice };

      dispatch(officeEditAction(data));
    },
    [modalValue, dispatch],
  );

  const onEditStateSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const { id, state } = modalValue;
      const data = { id, state };

      dispatch(officeEditStateAction(data));
    },
    [modalValue, dispatch],
  );

  const onDeleteClick = useCallback(
    (e) => {
      var result = window.confirm('글을 삭제하시겠습니까?');

      if (result) {
        dispatch(officeDeleteAction(e));

        window.location.reload();
      }
    },
    [dispatch],
  );

  const onAddOffice = useCallback(
    (e) => {
      const { name, location } = modalValue;

      const data = {
        name,
        location,
        memberId: userId,
      };

      dispatch(officeAddAction(data));
    },
    [dispatch, modalValue],
  );

  return (
    <ManageContainer>
      <Title>
        <h2>사무실 / 연구실 관리</h2>
        <Button onClick={showAddModal}>추가하기</Button>
      </Title>
      <Row>
        {Array.isArray(office)
          ? office.map((off) => (
              <ColBox key={off.labId} span={8} style={{ marginBottom: '16px' }}>
                <Card
                  title={off.name}
                  extra={
                    <ButtonContainer>
                      <div
                        onClick={() =>
                          showModal(off.labId, off.notice, off.state)
                        }
                      >
                        Edit
                      </div>
                      <div onClick={() => onDeleteClick(off.labId)}>Delete</div>
                    </ButtonContainer>
                  }
                  style={{
                    width: 300,
                  }}
                >
                  <div>공지사항 : {off.notice}</div>
                </Card>
              </ColBox>
            ))
          : ''}
      </Row>
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer=""
        width={800}
      >
        <ModalContainer id="modal-container">
          <Input
            id="notice"
            name="notice"
            type="text"
            placeholder="수정할 공지사항을 작성하세요"
            style={{ width: '88%', marginBottom: '16px' }}
            onChange={onChange}
          />
          <Button onClick={onEditSubmit}>수정하기</Button>
          <Input
            id="state"
            name="state"
            type="text"
            placeholder="수정할 상태를 작성하세요"
            style={{ width: '88%' }}
            onChange={onChange}
          />
          <Button onClick={onEditStateSubmit}>수정하기</Button>
        </ModalContainer>
      </Modal>
      <Modal
        visible={isAddModalVisible}
        onOk={handleAddOk}
        onCancel={handleAddCancel}
        footer=""
        width={800}
      >
        <div id="modal-container">
          <Input
            type="text"
            id="name"
            name="name"
            placeholder="연구실명을 입력해주세요."
            onChange={onChange}
          />
          <Input
            type="text"
            id="location"
            name="location"
            placeholder="위치를 입력해주세요."
            onChange={onChange}
          />
          <Button onClick={onAddOffice}>추가하기</Button>
        </div>
      </Modal>
    </ManageContainer>
  );
}

export default ManageOffice;
