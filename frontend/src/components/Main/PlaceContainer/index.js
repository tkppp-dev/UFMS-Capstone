import React, { useState, useEffect, useCallback } from 'react';
import { Col, Modal, Row, Select, Table } from 'antd';
import { OfficeContainer, CardItem } from './style';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  buildingListDataAction,
  floorListAction,
  floorNumListAction,
} from 'redux/actions/reservation_actions';

const { Option } = Select;

const columns = [
  {
    title: '강의실 명',
    dataIndex: 'name',
    align: 'center',
    width: '80%',
    onFilter: (value, record) => record.name.indexOf(value) === 0,
    render: (name, record) => (
      <Link to={`/place/${name}/${record.capacity}`} style={{ color: 'black' }}>
        {name}
      </Link>
    ),
  },
  {
    title: '인원',
    dataIndex: 'capacity',
    align: 'center',
    width: '20%',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.capacity - b.capacity,
  },
];

function PlaceContainer() {
  const [isModalVisible, setisModalVisible] = useState(false);
  const [isFloorSelected, setIsFloorSelected] = useState(false);
  const [buildingName, setBuildingName] = useState('');

  const { buildings, buildingData, floors, classes } = useSelector(
    (state) => state.reservation,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(buildingListDataAction());
  }, [dispatch]);

  const showModal = useCallback(
    (name) => {
      setisModalVisible(true);
      setBuildingName(name);

      dispatch(floorNumListAction(name));
    },
    [dispatch, buildingName],
  );

  const handleOk = () => {
    setisModalVisible(false);
    setIsFloorSelected(false);
  };
  const handleCancel = () => {
    setisModalVisible(false);
    setIsFloorSelected(false);
  };

  const onChangeHanlder = useCallback(
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

  return (
    <OfficeContainer>
      <Row>
        {Array.isArray(buildingData)
          ? buildingData.map((building) => (
              <Col span={8} style={{ marginBottom: '16px' }} key={building.id}>
                <CardItem
                  title={building.name}
                  extra={
                    <div
                      onClick={() => showModal(building.name)}
                      style={{ color: '#1990ff', cursor: 'pointer' }}
                    >
                      More
                    </div>
                  }
                  style={{
                    width: 300,
                  }}
                >
                  <img src={building.img} />
                </CardItem>
              </Col>
            ))
          : '현재 예약 가능한 건물이 없습니다.'}
      </Row>
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer=""
        width={800}
      >
        <div id="modal-container">
          {isFloorSelected ? (
            <div>
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{ padding: '4px' }}>층을 선택하세요 : </div>

                <Select onChange={onChangeHanlder} defaultValue="x">
                  <Option value="x">층</Option>
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
              <h2 style={{ textAlign: 'center' }}>{buildingName}</h2>
              <Table
                columns={columns}
                dataSource={classes}
                pagination={{ position: ['none', 'none'] }}
              />
            </div>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div style={{ padding: '4px' }}>층을 선택하세요 : </div>
              <Select onChange={onChangeHanlder} defaultValue="x">
                <Option value="x">층</Option>
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
          )}
        </div>
      </Modal>
    </OfficeContainer>
  );
}

export default PlaceContainer;
