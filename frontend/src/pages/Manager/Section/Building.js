import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ManagerContainer, Wrap } from '../style';
import { Button, Input, Form, Table } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import {
  addBuildingAction,
  deleteFacilityAction,
  editBuildingAction,
} from 'redux/actions/manager_actions';
import { buildingListDataAction } from 'redux/actions/reservation_actions';
import { Link } from 'react-router-dom';

function Manager() {
  const [value, setForm] = useState({
    name: '',
    description: '',
    highestFloor: 0,
    lowestFloor: 0,
    img: '',
  });

  const [editData, setEdit] = useState({
    editname: '',
    editdescription: '',
    edithighestFloor: 0,
    editlowestFloor: 0,
    editimg: '',
  });

  const [classData, setClassData] = useState('');

  const { isAuthenticated } = useSelector((state) => state.auth);
  const { buildingData } = useSelector((state) => state.reservation);

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

      const { name, description, highestFloor, lowestFloor, img } = value;
      const data = {
        name,
        description,
        highestFloor,
        lowestFloor,
        img,
      };

      dispatch(addBuildingAction(data));
    },
    [value],
  );

  const onEditSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const {
        editname,
        editdescription,
        edithighestFloor,
        editlowestFloor,
        editimg,
      } = editData;

      const data = {
        id: classData.id,
        name: editname,
        description: editdescription,
        highestFloor: edithighestFloor,
        lowestFloor: editlowestFloor,
        img: editimg,
      };

      dispatch(editBuildingAction(data));
    },
    [editData, dispatch, classData],
  );

  useEffect(() => {
    dispatch(buildingListDataAction());
  }, [dispatch]);

  const onDeleteClick = useCallback(
    (e) => {
      var result = window.confirm('글을 삭제하시겠습니까?');

      if (result) {
        const data = {
          buildingId: e,
        };

        console.log(data);

        dispatch(deleteFacilityAction(data));
      }
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
      render: (description) => (
        <div>
          {description.length > 80
            ? description.slice(0, 80) + '...'
            : description}
        </div>
      ),
    },
    {
      title: 'Action',
      align: 'center',
      render: (record) => (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={() => showEditModal(record)}>수정</Button>
          <Button type="danger" onClick={() => onDeleteClick(record.id)}>
            삭제
          </Button>
        </div>
      ),
    },
  ];

  return (
    <ManagerContainer>
      {console.log(buildingData)}
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

          <Table columns={columns} dataSource={buildingData} />
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
                id="name"
                name="name"
                type="text"
                onChange={onChange}
                placeholder="건물명을 입력해주세요"
              />
            </Form.Item>
            <Form.Item label="설명">
              <Input
                id="description"
                name="description"
                type="text"
                onChange={onChange}
                placeholder="설명을 입력해주세요"
              />
            </Form.Item>
            <Form.Item label="최고층">
              <Input
                id="highestFloor"
                name="highestFloor"
                type="text"
                onChange={onChange}
                placeholder="최고층을 입력해주세요(Ex. 3)"
              />
            </Form.Item>
            <Form.Item label="최저층">
              <Input
                id="lowestFloor"
                name="lowestFloor"
                type="text"
                onChange={onChange}
                placeholder="최저층을 입력해주세요(Ex. 1)"
              />
            </Form.Item>
            <Form.Item label="이미지를">
              <Input
                id="img"
                name="img"
                type="text"
                onChange={onChange}
                placeholder="이미지를 입력해주세요"
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
          <h1>건물 정보 수정</h1>
          <hr />
          <Form style={{ marginTop: '16px' }} onFinish={onEditSubmit}>
            <Form.Item label="건물명">
              <Input
                id="editname"
                name="editname"
                type="text"
                onChange={onEditChange}
                placeholder="건물명을 입력해주세요"
              />
            </Form.Item>
            <Form.Item label="설명">
              <Input
                id="editdescription"
                name="editdescription"
                type="text"
                onChange={onEditChange}
                placeholder="설명을 입력해주세요"
              />
            </Form.Item>
            <Form.Item label="최고층">
              <Input
                id="edithighestFloor"
                name="edithighestFloor"
                type="text"
                onChange={onEditChange}
                placeholder="최고층을 입력해주세요(Ex. 3)"
              />
            </Form.Item>
            <Form.Item label="최저층">
              <Input
                id="editlowestFloor"
                name="editlowestFloor"
                type="text"
                onChange={onEditChange}
                placeholder="최저층을 입력해주세요(Ex. 1)"
              />
            </Form.Item>
            <Form.Item label="이미지를">
              <Input
                id="editimg"
                name="editimg"
                type="text"
                onChange={onEditChange}
                placeholder="이미지를 입력해주세요"
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
