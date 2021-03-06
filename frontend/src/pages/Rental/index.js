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
          <span>????????? ????????? ????????? ?????????????????? : </span>
          <Select defaultValue="x" onChange={onChangeHanlder}>
            <Option value="x">?????????</Option>
            {Array.isArray(facilities) ? (
              facilities.map((facility) => (
                <Option key={facility} value={facility}>
                  {facility}
                </Option>
              ))
            ) : (
              <div>?????? ????????? ?????? ????????? ?????? ????????????.</div>
            )}
          </Select>
        </div>

        {facility ? (
          <div>
            <h1>????????? : {facility.name}</h1>
            <div>?????? ?????? : {facility.building}</div>
            <div>?????? : {facility.floor}</div>
            <div>?????? ?????? : {facility.area}</div>
            <div>?????? ?????? : {facility.capacity}???</div>
            <div style={{ marginBottom: '16px' }}>?????? : {facility.cost}???</div>

            <div>???????????? : {facility.notice}</div>

            <Button
              type="primary"
              style={{ float: 'right', marginTop: '32px' }}
              onClick={showModal}
            >
              ?????? ??????
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
            ????????? ????????? ??????????????????
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
          <h2 style={{ textAlign: 'center' }}>?????? ??????</h2>
          <ModalContent>
            <div>
              <label for="date">????????? ??????????????? : </label>
              <DatePicker
                onChange={onChangeDate}
                id="date"
                style={{ marginBottom: '16px' }}
              />
            </div>
            <div>
              <label for="duration">???????????? ????????? ?????????????????? : </label>
              <Select defaultValue="1" onChange={onChangeDuration}>
                <Option value={1}>1???</Option>
                <Option value={2}>2???</Option>
                <Option value={3}>3???</Option>
              </Select>
            </div>
            <Button
              type="primary"
              style={{ marginLeft: '8px' }}
              onClick={onClickAvailable}
            >
              ?????? ?????? ?????? ??????
            </Button>
          </ModalContent>
          {isAvailable === '?????? ????????? ???????????????.' ? (
            <div style={{ color: '#1990ff', marginBottom: '16px' }}>
              {isAvailable}
            </div>
          ) : (
            <div style={{ color: '#FF4D4E', marginBottom: '16px' }}>
              {isAvailable}
            </div>
          )}

          {isAvailable === '?????? ????????? ???????????????.' ? (
            <form onSubmit={onSubmit}>
              <label for="name">????????? : </label>
              <ContentInput
                type="text"
                name="eventName"
                id="eventName"
                placeholder="??????????????? ???????????????"
                onChange={onChange}
              />
              <label for="group">????????? : </label>
              <ContentInput
                type="text"
                name="group"
                id="group"
                placeholder="???????????? ??????????????????"
                onChange={onChange}
              />
              <label for="purpose">?????? ?????? : </label>
              <ContentInput
                type="text"
                name="purpose"
                id="purpose"
                placeholder="?????? ????????? ???????????????"
                onChange={onChange}
              />
              <label for="phone">????????? : </label>
              <ContentInput
                type="text"
                name="phone"
                id="phone"
                placeholder="???????????? ???????????????"
                onChange={onChange}
              />
              <label for="email">????????? : </label>
              <ContentInput
                type="email"
                name="email"
                id="email"
                placeholder="???????????? ???????????????"
                onChange={onChange}
              />
              <Button
                type="primary"
                style={{ width: '100%' }}
                onClick={onSubmit}
              >
                ?????? ??????
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
