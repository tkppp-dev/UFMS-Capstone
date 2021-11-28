import React, { useState, useEffect, useCallback } from 'react';
import { Col, Modal, Row, Select, Table } from 'antd';
import { OfficeContainer, CardItem } from './style';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  buildingListAction,
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
    render: (name) => (
      <Link to={`/place/1`} style={{ color: 'black' }}>
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

  const { buildings, floors, classes } = useSelector(
    (state) => state.reservation,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(buildingListAction());
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

  const onChangeHanlder = (e) => {
    setIsFloorSelected(true);
  };

  const onClickFloor = useCallback(
    (floor) => {
      const data = {
        building: buildingName,
        floor: floor,
      };

      dispatch(floorListAction(data));
    },
    [dispatch, buildingName],
  );

  return (
    <OfficeContainer>
      <Row>
        {Array.isArray(buildings)
          ? buildings.map((building) => (
              <Col span={8} style={{ marginBottom: '16px' }} key={building}>
                <CardItem
                  title={building}
                  extra={
                    <div
                      onClick={() => showModal(building)}
                      style={{ color: '#1990ff', cursor: 'pointer' }}
                    >
                      More
                    </div>
                  }
                  style={{
                    width: 300,
                  }}
                >
                  <img src="https://placeimg.com/300/200/arch" />
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
              <Select
                onChange={onChangeHanlder}
                value={floors}
                defaultValue="x"
              >
                <Option value="x">층을 선택하세요.</Option>
                {Array.isArray(floors) ? (
                  floors.map((floor) => (
                    <Option
                      key={floor}
                      value={floor}
                      onClick={() => onClickFloor(floor)}
                    >
                      {floor}
                    </Option>
                  ))
                ) : (
                  <div>해당 건물에 예약 가능한 층이 없습니다.</div>
                )}
              </Select>
              <h2 style={{ textAlign: 'center' }}>{buildingName}</h2>
              <Table columns={columns} dataSource={classes} />
            </div>
          ) : (
            <Select onChange={onChangeHanlder} value={floors} defaultValue="x">
              <Option value="x">층을 선택하세요.</Option>
              {Array.isArray(floors) ? (
                floors.map((floor) => (
                  <Option
                    key={floor}
                    value={floor}
                    onClick={() => onClickFloor(floor)}
                  >
                    {floor}
                  </Option>
                ))
              ) : (
                <div>해당 건물에 예약 가능한 층이 없습니다.</div>
              )}
            </Select>
          )}
        </div>
      </Modal>
    </OfficeContainer>
  );
}

export default PlaceContainer;
