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
            <h3>수용 인원 : </h3>
            <h3 style={{ marginLeft: '4px' }}>{capacity}명</h3>
          </div>

          <div style={{ marginTop: '16px' }}>
            <Button type="primary" onClick={showModal}>
              예약하기
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
            <h2 style={{ textAlign: 'center' }}>강의실 예약</h2>
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
                {Array.isArray(timeSet) ? (
                  <div>
                    <label for="selectbox">시간을 선택하세요 : </label>
                    <Select
                      id="selectbox"
                      style={{ width: '150px' }}
                      onChange={onChangeTime}
                    >
                      {Array.isArray(timeSet)
                        ? timeSet.map((time) =>
                            time.예약가능 ? (
                              <Select.Option value={time.시간대}>
                                {time.시간대}
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
              <label for="reservationName">강의명 : </label>
              <ContentInput
                type="text"
                name="reservationName"
                id="reservationName"
                placeholder="강의명을 입력하세요"
                onChange={onChange}
              />
              <label for="notice">공지사항 : </label>
              <ContentInput
                type="text"
                name="notice"
                id="notice"
                placeholder="공지사항을 입력하세요"
                onChange={onChange}
              />
              <Button
                type="primary"
                style={{ width: '100%' }}
                onClick={onSubmit}
              >
                예약 신청
              </Button>
            </form>
          </div>
        </Modal>
      </Wrap>
    </DetailContainer>
  );
}

export default PlaceDetail;
