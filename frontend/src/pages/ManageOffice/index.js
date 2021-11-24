import { Card, Col, Input, Row } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { Button } from 'antd/lib/radio';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  loadOfficeAction,
  officeDeleteAction,
  officeEditAction,
} from 'redux/actions/office_actions';
import { ManageContainer } from './style';

function ManageOffice() {
  const [isModalVisible, setisModalVisible] = useState(false);
  const [modalValue, setModalValue] = useState({
    id: '',
    notice: '',
    startTime: '',
    endTime: '',
  });

  const showModal = (data) => {
    setisModalVisible(true);
    setModalValue(data);
  };

  const handleOk = () => {
    setisModalVisible(false);
  };
  const handleCancel = () => {
    setisModalVisible(false);
  };

  const { userId } = useSelector((state) => state.auth);
  const { office } = useSelector((state) => state.office);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadOfficeAction(userId));
  }, [dispatch, userId]);

  const onChange = (e) => {
    setModalValue({
      ...modalValue,
      [e.target.name]: e.target.value,
    });
  };

  const onEditSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const { id, notice, startTime, endTime } = modalValue;
      const data = { id, notice, startTime, endTime };

      dispatch(officeEditAction(data));
    },
    [modalValue, dispatch],
  );

  const onDeleteClick = useCallback(
    (id) => {
      dispatch(officeDeleteAction(id));
    },
    [dispatch],
  );

  return (
    <ManageContainer>
      <div style={{ borderBottom: '1px solid #dbdbdb', marginBottom: '32px' }}>
        <h2>사무실 / 연구실 관리</h2>
      </div>
      <Row>
        {/* {Array.isArray(office) ? office.map((id, location, startTime, endTime, notice) => (
            <Col key={id} span={8} style={{ marginBottom: '16px' }}>
              <Card
              title={location}
              extra={
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <div
                    onClick={() => showModal(id, startTime, endTime, notice)}
                    style={{
                        color: '#1990ff',
                        cursor: 'pointer',
                        marginRight: '8px',
                    }}
                    >
                    Edit
                    </div>
                    <div style={{ color: 'red', cursor: 'pointer' }} onClick={() => onDeleteClick(id)}>Delete</div>
                </div>
              }
              style={{
                width: 300,
              }}
            >
                <div>사용 시간 : {startTime} ~ {endTime}</div>
              <div>공지사항 : {notice}</div>
            </Card></Col>
          )): "" } */}
        <Col span={8} style={{ marginBottom: '16px' }}>
          <Card
            title="율무관 501호"
            extra={
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div
                  onClick={showModal}
                  style={{
                    color: '#1990ff',
                    cursor: 'pointer',
                    marginRight: '8px',
                  }}
                >
                  Edit
                </div>
                <div
                  style={{ color: 'red', cursor: 'pointer' }}
                  onClick={onDeleteClick}
                >
                  Delete
                </div>
              </div>
            }
          >
            <div>사용 시간 : 13:30 ~ 15:00</div>
            <div>공지사항 : 없음</div>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title="율무관 501호"
            extra={
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div
                  onClick={showModal}
                  style={{
                    color: '#1990ff',
                    cursor: 'pointer',
                    marginRight: '8px',
                  }}
                >
                  Edit
                </div>
                <div
                  style={{ color: 'red', cursor: 'pointer' }}
                  onClick={onDeleteClick}
                >
                  Delete
                </div>
              </div>
            }
          >
            <div>사용 시간 : 13:30 ~ 15:00</div>
            <div>공지사항 : 없음</div>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title="율무관 501호"
            extra={
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div
                  onClick={showModal}
                  style={{
                    color: '#1990ff',
                    cursor: 'pointer',
                    marginRight: '8px',
                  }}
                >
                  Edit
                </div>
                <div
                  style={{ color: 'red', cursor: 'pointer' }}
                  onClick={onDeleteClick}
                >
                  Delete
                </div>
              </div>
            }
          >
            <div>사용 시간 : 13:30 ~ 15:00</div>
            <div>공지사항 : 없음</div>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title="율무관 501호"
            extra={
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div
                  onClick={showModal}
                  style={{
                    color: '#1990ff',
                    cursor: 'pointer',
                    marginRight: '8px',
                  }}
                >
                  Edit
                </div>
                <div
                  style={{ color: 'red', cursor: 'pointer' }}
                  onClick={onDeleteClick}
                >
                  Delete
                </div>
              </div>
            }
          >
            <div>사용 시간 : 13:30 ~ 15:00</div>
            <div>공지사항 : 없음</div>
          </Card>
        </Col>
      </Row>
      <Button style={{ marginTop: '32px', float: 'right' }} type="primary">
        <Link to="/manage/office/add">추가하기</Link>
      </Button>
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer=""
        width={800}
      >
        <div
          id="modal-container"
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Input
            id="notice"
            name="notice"
            type="text"
            placeholder="수정할 공지사항을 작성하세요"
            style={{ width: '88%' }}
            onChange={onChange}
          />
          <Button onClick={onEditSubmit}>수정하기</Button>
        </div>
      </Modal>
    </ManageContainer>
  );
}

export default ManageOffice;
