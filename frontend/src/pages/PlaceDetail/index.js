import React, { useLayoutEffect, useState } from 'react';
import { DetailContainer, Wrap } from './style';
import { Button, Calendar, Badge } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { detailLoadingAction } from 'redux/actions/place_actions';
import Modal from 'antd/lib/modal/Modal';

function getListData(value) {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'success', content: 'This is usual event.' },
      ];
      break;
    case 10:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'success', content: 'This is usual event.' },
        { type: 'error', content: 'This is error event.' },
      ];
      break;
    case 15:
      listData = [
        { type: 'warning', content: 'This is warning event' },
        { type: 'success', content: 'This is very long usual event。。....' },
        { type: 'error', content: 'This is error event 1.' },
        { type: 'error', content: 'This is error event 2.' },
        { type: 'error', content: 'This is error event 3.' },
        { type: 'error', content: 'This is error event 4.' },
      ];
      break;
    default:
  }
  return listData || [];
}

function dateCellRender(value) {
  const listData = getListData(value);
  return (
    <ul className="events">
      {listData.map((item) => (
        <li key={item.content}>
          <Badge status={item.type} text={item.content} />
        </li>
      ))}
    </ul>
  );
}

function getMonthData(value) {
  if (value.month() === 8) {
    return 1394;
  }
}

function monthCellRender(value) {
  const num = getMonthData(value);
  return num ? (
    <div className="notes-month">
      <section>{num}</section>
      <span>Backlog number</span>
    </div>
  ) : null;
}

function PlaceDetail(req) {
  const { placedetail } = useSelector((state) => state.place);

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
            <h2 style={{ textAlign: 'center' }}>예약하기</h2>
            <Calendar
              dateCellRender={dateCellRender}
              monthCellRender={monthCellRender}
            />
          </div>
        </Modal>
      </Wrap>
    </DetailContainer>
  );
}

export default PlaceDetail;
