import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ManagerContainer, Wrap } from './style';
import { Button, Input, Form, Select, Table } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import {
  addFacilityAction,
  deleteFacilityAction,
  editFacilityAction,
} from 'redux/actions/manager_actions';
import {
  buildingListAction,
  floorListAction,
  floorNumListAction,
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

  const [isFloorSelected, setIsFloorSelected] = useState(false);
  const [buildingName, setBuildingName] = useState('');
  const [classData, setClassData] = useState('');

  const [editData, setEdit] = useState({
    editbuilding: '',
    editname: classData ? classData.name : '',
    editcapacity: classData ? classData.capacity : 0,
    editcategory: '',
    editcost: 0,
    editfloor: '',
  });

  const { isAuthenticated } = useSelector((state) => state.auth);
  const { buildings, floors, classes } = useSelector(
    (state) => state.reservation,
  );

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

      const { building, name, capacity, category, cost, floor } = value;
      const data = {
        building,
        name,
        capacity,
        category,
        cost,
        floor,
      };

      dispatch(addFacilityAction(data));
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
        id: classData.facilityId,
      };

      dispatch(editFacilityAction(data));
    },
    [editData, dispatch],
  );

  useEffect(() => {
    dispatch(buildingListAction());
  }, [dispatch]);

  const onChangeBuilding = useCallback(
    (e) => {
      dispatch(floorNumListAction(e));
      setBuildingName(e);
    },
    [dispatch],
  );

  const onChangeFloor = useCallback(
    (e) => {
      setIsFloorSelected(true);

      const data = {
        building: buildingName,
        floor: e,
      };

      dispatch(floorListAction(data));
    },
    [dispatch, buildingName],
  );

  const onDeleteClick = useCallback(
    (e) => {
      const data = {
        facilityId: e,
      };

      dispatch(deleteFacilityAction(data));
    },
    [dispatch],
  );

  const columns = [
    {
      title: '강의실 명',
      dataIndex: 'name',
      align: 'center',
      width: '65%',
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
      title: '인원',
      dataIndex: 'capacity',
      align: 'center',
      width: '23%',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.capacity - b.capacity,
    },
    {
      title: 'Action',
      align: 'center',
      render: (record) => (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={() => showEditModal(record)}>수정</Button>
          <Button
            type="danger"
            onClick={() => onDeleteClick(record.facilityId)}
          >
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
          <Button onClick={showModal}>시설물 추가</Button>

          <div
            style={{
              marginTop: '24px',
              marginBottom: '16px',
            }}
          >
            <label for="selector" style={{ marginRight: '8px' }}>
              수정 및 삭제할 시설을 선택하세요 :
            </label>
            <Select
              defaultValue="x"
              onChange={onChangeBuilding}
              id="selector"
              style={{ marginRight: '4px' }}
            >
              <Option value="x">건물을 선택하세요</Option>
              {Array.isArray(buildings)
                ? buildings.map((building, index) => (
                    <Option key={index} value={building}>
                      {building}
                    </Option>
                  ))
                : ''}
            </Select>
            <Select onChange={onChangeFloor} defaultValue="x">
              <Option value="x">층을 선택하세요</Option>
              {Array.isArray(floors) ? (
                floors.map((floor) => (
                  <Option key={floor} value={floor}>
                    {floor}
                  </Option>
                ))
              ) : (
                <div>해당 건물에 예약 가능한 층이 없습니다.</div>
              )}
            </Select>
          </div>
          <Table columns={columns} dataSource={classes} />
          <div
            style={{ float: 'right', marginTop: '16px', marginBottom: '32px' }}
          >
            <Button>
              <Link to="/manager/building">건물 관리하기</Link>
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
          <h1>시설물 추가</h1>
          <hr />
          <Form style={{ marginTop: '16px' }} onFinish={onSubmit}>
            <Form.Item label="빌딩명">
              <Input
                id="building"
                name="building"
                type="text"
                onChange={onChange}
                placeholder="빌딩명을 입력해주세요"
              />
            </Form.Item>
            <Form.Item label="시설명">
              <Input
                id="name"
                name="name"
                type="text"
                onChange={onChange}
                placeholder="시설명을 입력해주세요"
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
          <h1>시설물 추가</h1>
          <hr />
          <Form style={{ marginTop: '16px' }} onFinish={onEditSubmit}>
            <Form.Item label="빌딩명">
              <Input
                id="editbuilding"
                name="editbuilding"
                type="text"
                onChange={onEditChange}
                placeholder="빌딩명을 입력해주세요"
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
