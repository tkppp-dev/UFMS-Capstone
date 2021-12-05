import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ManagerContainer, Wrap } from '../style';
import { Button, Input, Form, Select, Table } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import {
  addBuildingAction,
  addFacilityAction,
  deleteFacilityAction,
} from 'redux/actions/manager_actions';
import {
  buildingListAction,
  buildingListDataAction,
} from 'redux/actions/reservation_actions';
import { Link } from 'react-router-dom';

const { Option } = Select;

function Manager() {
  const [value, setForm] = useState({
    building: '',
    name: '',
    capacity: 0,
    category: '',
    cost: 0,
    floor: '',
  });

  const [editData, setEdit] = useState({
    editbuilding: '',
    editname: '',
    editcapacity: 0,
    editcategory: '',
    editcost: 0,
    editfloor: '',
  });

  const [classData, setClassData] = useState('');

  const { isAuthenticated } = useSelector((state) => state.auth);
  const { buildingData, classes } = useSelector((state) => state.reservation);

  const [isModalVisible, setisModalVisible] = useState(false);
  const [isEditModalVisible, setisEditModalVisible] = useState(false);

  const dispatch = useDispatch();

  const onChange = (e) => {
    setForm({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const onEditChange = (e) => {
    setEdit({
      ...editData,
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

  const showEditModal = (data) => {
    setClassData(data);
    setisEditModalVisible(true);
  };

  const handleEditOk = () => {
    setisEditModalVisible(false);
  };
  const handleEditCancel = () => {
    setisEditModalVisible(false);
  };

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const { building, capacity, category, cost, floor } = value;
      const data = {
        building,
        name: building,
        capacity,
        category,
        cost,
        floor,
      };

      dispatch(addBuildingAction(data));
    },
    [value],
  );

  const onEditSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const {
        editbuilding,
        editname,
        editcapacity,
        editcategory,
        editcost,
        editfloor,
      } = editData;

      const data = {
        building: editbuilding,
        name: editname,
        capacity: editcapacity,
        category: editcategory,
        cost: editcost,
        floor: editfloor,
        id: classes.id,
      };

      // dispatch(editBuildingAction(data));
    },
    [editData, dispatch],
  );

  useEffect(() => {
    dispatch(buildingListDataAction());
  }, [dispatch]);

  const onDeleteClick = useCallback(
    (e) => {
      dispatch(deleteFacilityAction(e));
    },
    [dispatch],
  );

  const columns = [
    {
      title: '건물명',
      dataIndex: 'name',
      align: 'center',
      width: '15%',
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      render: (name, record) => (
        <Link
          to={`/place/${name}/${record.capacity}`}
          style={{ color: 'black' }}
        >
          {name}
        </Link>
      ),
    },
    {
      title: '설명',
      dataIndex: 'description',
      align: 'center',
      width: '73%',
      render: (description) => <div>{description.slice(0, 80)}...</div>,
    },
    {
      title: 'Action',
      align: 'center',
      render: (record) => (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={() => showEditModal(record)}>수정</Button>
          <Button type="danger" onClick={() => onDeleteClick(record)}>
            삭제
          </Button>
        </div>
      ),
    },
  ];

  return (
    <ManagerContainer>
      {isAuthenticated ? (
        <div
          style={{
            width: '90%',
            marginTop: '32px',
            marginLeft: '5%',
          }}
        >
          <Button onClick={showModal} style={{ marginBottom: '32px' }}>
            건물 추가
          </Button>

          <Table
            columns={columns}
            dataSource={buildingData}
            pagination={{ position: ['none', 'none'] }}
          />
          <div
            style={{ float: 'right', marginTop: '16px', marginBottom: '32px' }}
          >
            <Button>
              <Link to="/manager">시설 관리하기</Link>
            </Button>
            <Button>
              <Link to="/manager/rent">대관 승인하기</Link>
            </Button>
          </div>
        </div>
      ) : (
        <Wrap>
          <div>로그인이 필요한 서비스입니다.</div>
        </Wrap>
      )}
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer=""
        width={800}
      >
        <div id="modal-container">
          <h1>건물 추가</h1>
          <hr />
          <Form style={{ marginTop: '16px' }} onFinish={onSubmit}>
            <Form.Item label="건물명">
              <Input
                id="building"
                name="building"
                type="text"
                onChange={onChange}
                placeholder="건물명을 입력해주세요"
              />
            </Form.Item>
            <Form.Item label="수용인원">
              <Input
                id="capacity"
                name="capacity"
                type="number"
                onChange={onChange}
                placeholder="수용인원을 입력해주세요 (Ex. 40)"
              />
            </Form.Item>
            <Form.Item label="카테고리">
              <Input
                id="category"
                name="category"
                type="text"
                onChange={onChange}
                placeholder="카테고리를 입력해주세요"
              />
            </Form.Item>
            <Form.Item label="비용">
              <Input
                id="cost"
                name="cost"
                type="number"
                onChange={onChange}
                placeholder="비용을 입력해주세요 (Ex. 30000)"
              />
            </Form.Item>
            <Form.Item label="층">
              <Input
                id="floor"
                name="floor"
                type="text"
                onChange={onChange}
                placeholder="해당 시설의 층을 입력해주세요"
              />
            </Form.Item>
            <Button type="primary" style={{ width: '100%' }} onClick={onSubmit}>
              추가하기
            </Button>
          </Form>
        </div>
      </Modal>

      <Modal
        visible={isEditModalVisible}
        onOk={handleEditOk}
        onCancel={handleEditCancel}
        footer=""
        width={800}
      >
        <div id="modal-container">
          <h1>건물 변경</h1>
          <hr />
          <Form style={{ marginTop: '16px' }} onFinish={onEditSubmit}>
            <Form.Item label="건물명">
              <Input
                id="editbuilding"
                name="editbuilding"
                type="text"
                onChange={onEditChange}
                placeholder="건물명을 입력해주세요"
              />
            </Form.Item>
            <Form.Item label="시설명">
              <Input
                id="editname"
                name="editname"
                type="text"
                onChange={onEditChange}
                placeholder="시설명을 입력해주세요"
              />
            </Form.Item>
            <Form.Item label="수용인원">
              <Input
                id="editcapacity"
                name="editcapacity"
                type="number"
                onChange={onEditChange}
                placeholder="수용인원을 입력해주세요 (Ex. 40)"
              />
            </Form.Item>
            <Form.Item label="카테고리">
              <Input
                id="editcategory"
                name="editcategory"
                type="text"
                onChange={onEditChange}
                placeholder="카테고리를 입력해주세요"
              />
            </Form.Item>
            <Form.Item label="비용">
              <Input
                id="editcost"
                name="editcost"
                type="number"
                onChange={onEditChange}
                placeholder="비용을 입력해주세요 (Ex. 30000)"
              />
            </Form.Item>
            <Form.Item label="층">
              <Input
                id="editfloor"
                name="editfloor"
                type="text"
                onChange={onEditChange}
                placeholder="해당 시설의 층을 입력해주세요"
              />
            </Form.Item>
            <Button
              type="primary"
              style={{ width: '100%' }}
              onClick={onEditSubmit}
            >
              수정하기
            </Button>
          </Form>
        </div>
      </Modal>
    </ManagerContainer>
  );
}

export default Manager;
