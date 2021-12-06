import { Button, DatePicker, Select } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { Wrap } from 'pages/PlaceDetail/style';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  availableAction,
  facilityDetailAction,
  rentAction,
  rentalListAction,
} from 'redux/actions/rental_actions';
import { ContentInput, ModalContent, RentalContainer } from './style';

const { Option } = Select;

function Rental() {
  const { facilities, facility, isAvailable } = useSelector(
    (state) => state.rental,
  );
  const { userId } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(rentalListAction());
  }, [dispatch]);

  const onChangeHanlder = useCallback(
    (e) => {
      const facilityName = e;

      dispatch(facilityDetailAction(facilityName));
    },
    [dispatch],
  );

  const [date, setDate] = useState('');
  const [form, setValues] = useState({
    eventName: '',
    group: '',
    purpose: '',
    phone: '',
    email: '',
    duration: 0,
  });

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

  const onChange = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeDuration = (value) => {
    setValues({ duration: value });
  };

  const onChangeDate = (date, dateString) => {
    setDate(dateString);
  };

  const onClickAvailable = useCallback(
    (e) => {
      e.preventDefault();

      const data = {
        facilityName: facility.facilityName,
        startDate: date,
        rentalDays: form.duration,
      };

      dispatch(availableAction(data));
    },
    [form, dispatch],
  );

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const { eventName, group, purpose, phone, email, duration } = form;

      const data = {
        additionalEmail: email,
        additionalMobile: phone,
        facility: facility.name,
        group,
        eventName,
        memberId: userId,
        purpose,
        rentalDays: duration,
        startDate: date,
      };

      console.log(data);

      dispatch(rentAction(data));
    },
    [form, dispatch],
  );

  return (
    <RentalContainer>
      <Wrap>
        <div style={{ marginBottom: '16px' }}>
          <span>대관을 원하는 시설을 선택해주세요 : </span>
          <Select defaultValue="x" onChange={onChangeHanlder}>
            <Option value="x">시설명</Option>
            {Array.isArray(facilities) ? (
              facilities.map((facility) => (
                <Option key={facility} value={facility}>
                  {facility}
                </Option>
              ))
            ) : (
              <div>해당 건물에 예약 가능한 층이 없습니다.</div>
            )}
          </Select>
        </div>

        {facility ? (
          <div>
            <h1>시설명 : {facility.name}</h1>
            <div>건물 위치 : {facility.building}</div>
            <div>층수 : {facility.floor}</div>
            <div>시설 크기 : {facility.area}</div>
            <div>수용 인원 : {facility.capacity}명</div>
            <div style={{ marginBottom: '16px' }}>비용 : {facility.cost}원</div>

            <div>공지사항 : {facility.notice}</div>

            <Button
              type="primary"
              style={{ float: 'right', marginTop: '32px' }}
              onClick={showModal}
            >
              대관 예약
            </Button>
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '150px',
            }}
          >
            대관할 시설을 선택해주세요
          </div>
        )}
      </Wrap>
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer=""
        width={800}
      >
        <div id="modal-container">
          <h2 style={{ textAlign: 'center' }}>대관 예약</h2>
          <ModalContent>
            <div>
              <label for="date">날짜를 선택하세요 : </label>
              <DatePicker
                onChange={onChangeDate}
                id="date"
                style={{ marginBottom: '16px' }}
              />
            </div>
            <div>
              <label for="duration">희망하는 기간을 작성해주세요 : </label>
              <Select defaultValue="1" onChange={onChangeDuration}>
                <Option value={1}>1일</Option>
                <Option value={2}>2일</Option>
                <Option value={3}>3일</Option>
              </Select>
            </div>
            <Button
              type="primary"
              style={{ marginLeft: '8px' }}
              onClick={onClickAvailable}
            >
              대관 가능 여부 확인
            </Button>
          </ModalContent>
          {isAvailable === '대관 신청이 가능합니다.' ? (
            <div style={{ color: '#1990ff', marginBottom: '16px' }}>
              {isAvailable}
            </div>
          ) : (
            <div style={{ color: '#FF4D4E', marginBottom: '16px' }}>
              {isAvailable}
            </div>
          )}

          {isAvailable === '대관 신청이 가능합니다.' ? (
            <form onSubmit={onSubmit}>
              <label for="name">대관자 : </label>
              <ContentInput
                type="text"
                name="eventName"
                id="eventName"
                placeholder="이벤트명을 입력하세요"
                onChange={onChange}
              />
              <label for="group">그룹명 : </label>
              <ContentInput
                type="text"
                name="group"
                id="group"
                placeholder="그룹명을 입력해주세요"
                onChange={onChange}
              />
              <label for="purpose">대관 목적 : </label>
              <ContentInput
                type="text"
                name="purpose"
                id="purpose"
                placeholder="대관 목적을 입력하세요"
                onChange={onChange}
              />
              <label for="phone">연락처 : </label>
              <ContentInput
                type="text"
                name="phone"
                id="phone"
                placeholder="연락처를 입력하세요"
                onChange={onChange}
              />
              <label for="email">이메일 : </label>
              <ContentInput
                type="email"
                name="email"
                id="email"
                placeholder="이메일을 입력하세요"
                onChange={onChange}
              />
              <Button
                type="primary"
                style={{ width: '100%' }}
                onClick={onSubmit}
              >
                대관 신청
              </Button>
            </form>
          ) : (
            ''
          )}
        </div>
      </Modal>
    </RentalContainer>
  );
}

export default Rental;
