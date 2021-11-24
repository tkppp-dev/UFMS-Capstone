import React, { useCallback, useLayoutEffect, useState } from 'react';
import { DetailContainer, Wrap } from './style';
import { Button, DatePicker, Input, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { detailLoadingAction } from 'redux/actions/place_actions';
import Modal from 'antd/lib/modal/Modal';
import {
  reservationAction,
  reservationTimeAction,
} from 'redux/actions/reservation_actions';

const { Option } = Select;

function PlaceDetail(req) {
  const [date, setDate] = useState('');
  const [form, setValues] = useState({
    name: '',
    subject: '',
    purpose: '',
    phone: '',
    email: '',
    duration: '',
  });
  const { placedetail } = useSelector((state) => state.place);
  // const { timeSet } = useSelector((state) => state.reservation);

  const onChange = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // const { contents, title } = placedetail;
  const dispatch = useDispatch();
  const placeID = req.match.params.id;

  useLayoutEffect(() => {
    dispatch(detailLoadingAction(placeID));
  }, [dispatch, placeID]);

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

  const onChangeDuration = (value) => {
    setValues({ duration: value });
  };

  const onChangeDate = (date, dateString) => {
    setDate(dateString);

    const data = {
      date: dateString,
      // facility: placedetail.name,
    };

    dispatch(reservationTimeAction(data));
  };

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const { name, subject, purpose, phone, email, duration } = form;

      const data = { name, subject, purpose, phone, email, duration };

      dispatch(reservationAction(data));
    },
    [form, dispatch],
  );

  return (
    <DetailContainer>
      <Wrap>
        {/* <h1>{title}</h1> */}
        <h1>대양 AI 센터 - B201호</h1>
        <div>
          <h3>Description</h3>

          {/* <div>{contents}</div> */}
          <div>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </div>

          <div style={{ marginTop: '16px' }}>
            <Button type="primary" onClick={showModal}>
              대관 예약
            </Button>
          </div>
        </div>
        <Modal
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer=""
          width={800}
        >
          <div id="modal-container">
            <h2 style={{ textAlign: 'center' }}>대관 예약</h2>
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div>
                <label for="date">날짜를 선택하세요 : </label>
                <DatePicker
                  onChange={onChangeDate}
                  id="date"
                  style={{ marginBottom: '16px' }}
                />
              </div>
              <div style={{ marginLeft: '32px' }}>
                <label for="duration">희망하는 기간을 작성해주세요 : </label>
                <Select defaultValue="1" onChange={onChangeDuration}>
                  <Option value="1">1일</Option>
                  <Option value="2">2일</Option>
                  <Option value="3">3일</Option>
                </Select>
              </div>
            </div>

            {/* {Array.isArray(timeSet)
              ? timeSet.map((id, date) => <div key={id}>{date}</div>)
              : ''} */}
            <form onSubmit={onSubmit}>
              <label for="name">대관자 : </label>
              <Input
                type="name"
                name="name"
                id="name"
                placeholder="대관자를 입력하세요"
                onChange={onChange}
                style={{ width: '100%', height: '32px', marginBottom: '16px' }}
              />
              <label for="subject">대관 주체 : </label>
              <Input
                type="text"
                name="subject"
                id="subject"
                placeholder="대관 주체를 입력하세요"
                onChange={onChange}
                style={{ width: '100%', height: '32px', marginBottom: '16px' }}
              />
              <label for="purpose">대관 목적 : </label>
              <Input
                type="text"
                name="purpose"
                id="purpose"
                placeholder="대관 목적을 입력하세요"
                onChange={onChange}
                style={{ width: '100%', height: '32px', marginBottom: '16px' }}
              />
              <label for="phone">연락처 : </label>
              <Input
                type="text"
                name="phone"
                id="phone"
                placeholder="연락처를 입력하세요"
                onChange={onChange}
                style={{ width: '100%', height: '32px', marginBottom: '16px' }}
              />
              <label for="email">이메일 : </label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="이메일을 입력하세요"
                onChange={onChange}
                style={{ width: '100%', height: '32px', marginBottom: '16px' }}
              />
              <Button
                type="primary"
                style={{ width: '100%' }}
                onClick={onSubmit}
              >
                대관 신청
              </Button>
            </form>
          </div>
        </Modal>
      </Wrap>
    </DetailContainer>
  );
}

export default PlaceDetail;
