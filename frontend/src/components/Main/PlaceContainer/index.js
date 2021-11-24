import React, { useState, useEffect } from 'react';
import { Card, Modal, Table } from 'antd';
import { OfficeContainer, CardRow, CardItem } from './style';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  buildingListAction,
  floorListAction,
} from 'redux/actions/reservation_actions';

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

const data = [
  {
    key: '1',
    name: '충무관 B201호',
    capacity: 40,
  },
  {
    key: '2',
    name: '충무관 B202호',
    capacity: 42,
  },
  {
    key: '3',
    name: '충무관 B203호',
    capacity: 50,
  },
  {
    key: '4',
    name: '충무관 B204호',
    capacity: 46,
  },
  {
    key: '5',
    name: '충무관 B205호',
    capacity: 44,
  },
];

function PlaceContainer() {
  const [isModalVisible, setisModalVisible] = useState(false);
  const [isFloorSelected, setIsFloorSelected] = useState(false);
  const [buildingName, setBuildingName] = useState('');

  // const { buildings, classes } = useSelector((state) => state.reservation);

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(buildingListAction());
  // }, [dispatch]);

  const showModal = (name) => {
    setisModalVisible(true);
    setBuildingName(name);
  };

  const handleOk = () => {
    setisModalVisible(false);
    setIsFloorSelected(false);
  };
  const handleCancel = () => {
    setisModalVisible(false);
    setIsFloorSelected(false);
  };

  const [floor, setFloor] = useState();

  // const onChangeHanlder = (e) => {
  //   setFloor(e.currentTarget.value);

  //   const data = {
  //     building: buildingName,
  //     floor: e.currentTarget.value,
  //   };

  //   dispatch(floorListAction(data));

  //   setIsFloorSelected(true);
  // };

  const Options = [
    { key: 1, value: '1층' },
    { key: 2, value: '2층' },
    { key: 3, value: '3층' },
    { key: 4, value: '4층' },
    { key: 5, value: '5층' },
  ];

  return (
    <OfficeContainer>
      <CardRow>
        {/* {Array.isArray(buildings)
          ? buildings.map(({ id, name, image }) => (
              <CardItem
                key={id}
                title={name}
                extra={
                  <div
                    onClick={() => showModal(name)}
                    style={{ color: '#1990ff', cursor: 'pointer' }}
                  >
                    More
                  </div>
                }
                style={{
                  width: 300,
                }}
              >
                <img src={image} />
              </CardItem>
            ))
          : '현재 예약 가능한 건물이 없습니다.'} */}
        <CardItem
          title="충무관"
          extra={
            <div
              onClick={showModal}
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
        <Card
          title="영실관"
          extra={
            <div
              onClick={showModal}
              style={{ color: '#1990ff', cursor: 'pointer' }}
            >
              More
            </div>
          }
          style={{
            width: 300,
            height: '213px',
            borderBottom: '2px solid #1990ff',
          }}
        >
          <p>영실관 201호</p>
          <p>영실관 202호</p>
          <p>영실관 203호</p>
        </Card>
        <Card
          title="용덕관"
          extra={
            <div
              onClick={showModal}
              style={{ color: '#1990ff', cursor: 'pointer' }}
            >
              More
            </div>
          }
          style={{
            width: 300,
            height: '213px',
            marginBottom: '32px',
            borderBottom: '2px solid #1990ff',
          }}
        >
          <p>용덕관 201호</p>
          <p>용덕관 202호</p>
          <p>용덕관 203호</p>
        </Card>
      </CardRow>

      <CardRow>
        <Card
          title="광개토관"
          extra={
            <div
              onClick={showModal}
              style={{ color: '#1990ff', cursor: 'pointer' }}
            >
              More
            </div>
          }
          style={{
            width: 300,
            height: '213px',
            borderBottom: '2px solid #1990ff',
          }}
        >
          <p>광개토관 201호</p>
          <p>광개토관 202호</p>
          <p>광개토관 203호</p>
        </Card>
        <Card
          title="이당관"
          extra={
            <div
              onClick={showModal}
              style={{ color: '#1990ff', cursor: 'pointer' }}
            >
              More
            </div>
          }
          style={{
            width: 300,
            height: '213px',
            borderBottom: '2px solid #1990ff',
          }}
        >
          <p>이당관 201호</p>
          <p>이당관 202호</p>
          <p>이당관 203호</p>
        </Card>
        <Card
          title="군자관"
          extra={
            <div
              onClick={showModal}
              style={{ color: '#1990ff', cursor: 'pointer' }}
            >
              More
            </div>
          }
          style={{
            width: 300,
            height: '213px',
            marginBottom: '32px',
            borderBottom: '2px solid #1990ff',
          }}
        >
          <p>군자관 201호</p>
          <p>군자관 202호</p>
          <p>군자관 203호</p>
        </Card>
      </CardRow>

      <CardRow>
        <Card
          title="집현관"
          extra={
            <div
              onClick={showModal}
              style={{ color: '#1990ff', cursor: 'pointer' }}
            >
              More
            </div>
          }
          style={{
            width: 300,
            height: '213px',
            borderBottom: '2px solid #1990ff',
          }}
        >
          <p>집현관 201호</p>
          <p>집현관 202호</p>
          <p>집현관 203호</p>
        </Card>
        <Card
          title="세종관"
          extra={
            <div
              onClick={showModal}
              style={{ color: '#1990ff', cursor: 'pointer' }}
            >
              More
            </div>
          }
          style={{
            width: 300,
            height: '213px',
            borderBottom: '2px solid #1990ff',
          }}
        >
          <p>세종관 201호</p>
          <p>세종관 202호</p>
          <p>세종관 203호</p>
        </Card>
        <Card
          title="율곡관"
          extra={
            <div
              onClick={showModal}
              style={{ color: '#1990ff', cursor: 'pointer' }}
            >
              More
            </div>
          }
          style={{
            width: 300,
            height: '213px',
            marginBottom: '32px',
            borderBottom: '2px solid #1990FF',
          }}
        >
          <p>율곡관 201호</p>
          <p>율곡관 202호</p>
          <p>율곡관 203호</p>
        </Card>
      </CardRow>

      <CardRow>
        <Card
          title="대양AI센터"
          extra={
            <div
              onClick={showModal}
              style={{ color: '#1990ff', cursor: 'pointer' }}
            >
              More
            </div>
          }
          style={{
            width: 300,
            height: '213px',
            borderBottom: '2px solid #1990ff',
          }}
        >
          <p>대양AI센터 201호</p>
          <p>대양AI센터 202호</p>
          <p>대양AI센터 203호</p>
        </Card>
        <Card
          title="다산관"
          extra={
            <div
              onClick={showModal}
              style={{ color: '#1990ff', cursor: 'pointer' }}
            >
              More
            </div>
          }
          style={{
            width: 300,
            height: '213px',
            borderBottom: '2px solid #1990ff',
          }}
        >
          <p>다산관 201호</p>
          <p>다산관 202호</p>
          <p>다산관 203호</p>
        </Card>
        <Card
          title="학생회관"
          extra={
            <div
              onClick={showModal}
              style={{ color: '#1990ff', cursor: 'pointer' }}
            >
              More
            </div>
          }
          style={{
            width: 300,
            height: '213px',
            borderBottom: '2px solid #1990ff',
          }}
        >
          <p>학생회관 201호</p>
          <p>학생회관 202호</p>
          <p>학생회관 203호</p>
        </Card>
      </CardRow>
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer=""
        width={800}
      >
        <div id="modal-container">
          {true ? (
            <div>
              <h2 style={{ textAlign: 'center' }}>{buildingName}</h2>
              <Table columns={columns} dataSource={data} />
              {/* <Table columns={columns} dataSource={classes} /> */}
            </div>
          ) : (
            // <select onChange={onChangeHanlder} value={floor}>
            //   {Options.map((item, index) => (
            //     <option key={item.key} value={item.key}>
            //       {item.value}
            //     </option>
            //   ))}
            // </select>
            ''
          )}
        </div>
      </Modal>
    </OfficeContainer>
  );
}

export default PlaceContainer;
