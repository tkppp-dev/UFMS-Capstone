import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  IsAuthenticatedContainer,
  LeftSide,
  ManagerContainer,
  RightSide,
  Wrap,
} from './style';
import { Card, Select } from 'antd';
import { Link } from 'react-router-dom';

function Manager() {
  const { isAuthenticated } = useSelector((state) => state.auth);

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
    <ManagerContainer>
      {true ? (
        <IsAuthenticatedContainer>
          <LeftSide>
            <div>
              <Select defaultValue="0" name="category">
                <Select.Option value="0">전체</Select.Option>
                <Select.Option value="1">충무관</Select.Option>
                <Select.Option value="2">영실관</Select.Option>
                <Select.Option value="3">융덕관</Select.Option>
                <Select.Option value="4">광개토관</Select.Option>
                <Select.Option value="5">이당관</Select.Option>
                <Select.Option value="6">군자관</Select.Option>
                <Select.Option value="7">집현관</Select.Option>
                <Select.Option value="8">세종관</Select.Option>
                <Select.Option value="9">율곡관</Select.Option>
                <Select.Option value="10">대양AI센터</Select.Option>
                <Select.Option value="11">다산관</Select.Option>
                <Select.Option value="12">학생회관</Select.Option>
              </Select>
            </div>
            <div>
              <Link to="/manager/place/add">시설 추가</Link>
            </div>
            <div>
              <Link to="/manager/place/edit/1">시설 편집</Link>
            </div>
          </LeftSide>
          <RightSide>
            <div
              style={{
                width: '90%',
                marginLeft: '5%',
                marginTop: '64px',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
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
            </div>
          </RightSide>
        </IsAuthenticatedContainer>
      ) : (
        <Wrap>
          <div>로그인이 필요한 서비스입니다.</div>
        </Wrap>
      )}
    </ManagerContainer>
  );
}

export default Manager;
