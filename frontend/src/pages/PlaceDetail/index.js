import React, { useCallback, useState } from 'react';
import { ContentInput, DetailContainer, ModalContent, Wrap } from './style';
import { Button, DatePicker, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'antd/lib/modal/Modal';
import {
  reservationAction,
  reservationTimeAction,
} from 'redux/actions/reservation_actions';

function PlaceDetail(req) {
  const [date, setDate] = useState('');
  const [form, setValues] = useState({
    notice: '',
    startTime: '',
    time: '',
    reservationName: '',
  });

  const { user, userId } = useSelector((state) => state.auth);
  const { timeSet } = useSelector((state) => state.reservation);

  const onChange = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const dispatch = useDispatch();
  const facilityname = req.match.params.facilityname;
  const capacity = req.match.params.capacity;

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

  const onChangeDate = useCallback(
    (date, dateString) => {
      setDate(dateString);

      const data = {
        date: dateString,
        facility: facilityname,
      };

      dispatch(reservationTimeAction(data));
    },
    [dispatch, facilityname],
  );

  const onChangeTime = (e) => {
    let timezoneOffset1 = new Date(date + ' ' + e).getTimezoneOffset() * 60000;
    let timezoneDate1 = new Date(new Date(date + ' ' + e) - timezoneOffset1);

    let timezoneOffset2 = new Date(date + ' ' + e).getTimezoneOffset() * 60000;
    let timezoneDate2 = new Date(new Date(date + ' ' + e) - timezoneOffset2);

    setValues({
      startTime: timezoneDate1,
      time: timezoneDate2,
    });
  };

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const { notice, startTime, time, reservationName } = form;

      time.setHours(time.getHours() + 1);
      time.setMinutes(time.getMinutes() + 30);

      const data = {
        startTime: startTime.toISOString(),
        endTime: time.toISOString(),
        facility: facilityname,
        memberId: userId,
        notice,
        reservationName,
      };

      dispatch(reservationAction(data));
    },
    [form, dispatch, facilityname],
  );

  return (
    <DetailContainer>
      <Wrap>
        <h1>{facilityname}</h1>
        <div>
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <h3>?????? ?????? : </h3>
            <h3 style={{ marginLeft: '4px' }}>{capacity}???</h3>
          </div>

          <div style={{ marginTop: '16px' }}>
            <Button type="primary" onClick={showModal}>
              ????????????
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
            <h2 style={{ textAlign: 'center' }}>????????? ??????</h2>
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
                {Array.isArray(timeSet) ? (
                  <div>
                    <label for="selectbox">????????? ??????????????? : </label>
                    <Select
                      id="selectbox"
                      style={{ width: '150px' }}
                      onChange={onChangeTime}
                    >
                      {Array.isArray(timeSet)
                        ? timeSet.map((time) =>
                            time.???????????? ? (
                              <Select.Option value={time.?????????}>
                                {time.?????????}
                              </Select.Option>
                            ) : (
                              ''
                            ),
                          )
                        : ''}
                    </Select>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </ModalContent>

            <form onSubmit={onSubmit}>
              <label for="reservationName">????????? : </label>
              <ContentInput
                type="text"
                name="reservationName"
                id="reservationName"
                placeholder="???????????? ???????????????"
                onChange={onChange}
              />
              <label for="notice">???????????? : </label>
              <ContentInput
                type="text"
                name="notice"
                id="notice"
                placeholder="??????????????? ???????????????"
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
          </div>
        </Modal>
      </Wrap>
    </DetailContainer>
  );
}

export default PlaceDetail;
