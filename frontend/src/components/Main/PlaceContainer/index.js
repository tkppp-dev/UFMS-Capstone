import React, { useState } from 'react';

// antd
import { Card, Modal, Table, Tag } from 'antd';

// style
import { OfficeContainer, CardRow } from './style';
import { Link } from 'react-router-dom';

const columns = [
  {
    title: '강의실 명',
    dataIndex: 'title',
    align: 'center',
    width: '20%',
    onFilter: (value, record) => record.title.indexOf(value) === 0,
    render: (title) => (
      <Link to="/place/1" style={{ color: 'black' }}>
        {title}
      </Link>
    ),
  },
  {
    title: '설명',
    dataIndex: 'description',
    align: 'center',

    onFilter: (value, record) => record.description.indexOf(value) === 0,
  },
  {
    title: '인원',
    dataIndex: 'capacity',
    align: 'center',
    width: '10%',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.capacity - b.capacity,
  },
  {
    title: '사용 가능 여부',
    key: 'available',
    dataIndex: 'available',
    align: 'center',

    width: '20%',
    render: (available) => (
      <>
        {
          <div style={{ width: '100%', textAlign: 'center' }}>
            <Tag color={available === 'O' ? 'geekblue' : 'volcano'}>
              {available}
            </Tag>
          </div>
        }
      </>
    ),
  },
];

const data = [
  {
    key: '1',
    available: 'O',
    title: '충무관 B201호',
    capacity: 40,
    description: 'DUMMY DUMMY DUMMY DUMMY',
  },
  {
    key: '2',
    available: 'X',
    title: '충무관 B202호',
    capacity: 42,
    description: 'DUMMY DUMMY DUMMY DUMMY',
  },
  {
    key: '3',
    available: 'O',
    title: '충무관 B203호',
    capacity: 50,
    description: 'DUMMY DUMMY DUMMY DUMMY',
  },
  {
    key: '4',
    available: 'O',
    title: '충무관 B204호',
    capacity: 46,
    description: 'DUMMY DUMMY DUMMY DUMMY',
  },
  {
    key: '5',
    available: 'X',
    title: '충무관 B205호',
    capacity: 44,
    description: 'DUMMY DUMMY DUMMY DUMMY',
  },
];

function PlaceContainer() {
  const [isModalVisible, setisModalVisible] = useState(false);

  const showModal = () => {
    setisModalVisible(true);
  };

  const handleOk = () => {
    setisModalVisible(false);
  };
  const handleCancel = () => {
    setisModalVisible(false);
  };

  return (
    <OfficeContainer>
      <CardRow>
        <Card
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
            height: '213px',
            borderBottom: '2px solid #1990ff',
          }}
        >
          <p>충무관 201호</p>
          <p>충무관 202호</p>
          <p>충무관 203호</p>
        </Card>
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
          <div>&lt;예시입니다&gt;</div>
          <h2 style={{ textAlign: 'center' }}>충무관</h2>
          <Table
            columns={columns}
            dataSource={data}
            // pagination={{ position: ['none', 'none'] }}
          />
        </div>
      </Modal>
    </OfficeContainer>
  );
}

export default PlaceContainer;
