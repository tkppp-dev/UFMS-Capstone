import { RentDetailContainer, Wrap } from './style';
import React, { useLayoutEffect } from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function PlaceRentDetail(req) {
  // const { userId } = useSelector((state) => state.auth);
  // const { creator } = useSelector((state) => state.question);
  // const projectID = req.match.params.id;

  // const dispatch = useDispatch();

  // useLayoutEffect(() => {
  //   dispatch(detailPlaceAction(projectID));
  // }, [dispatch, projectID]);

  // const EditDeleteButton = (
  //   <div
  //     style={{
  //       display: 'flex',
  //       justifyContent: 'end',
  //       marginTop: '32px',
  //     }}
  //   >
  //     <Link to="/rent/place/edit/{projectID}" style={{ marginRight: '8px' }}>
  //       <Button>수정하기</Button>
  //     </Link>
  //     <Button type="danger">삭제하기</Button>
  //   </div>
  // );

  return (
    <RentDetailContainer>
      <Wrap>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <h1>
              New York No. 1 Lake Park, New York No. 1 Lake Park New York No.
            </h1>
          </div>
          <div style={{ paddingTop: '10px', color: 'gray' }}>2021-11-09</div>
        </div>
        <div
          style={{
            width: '100%',
            borderTop: '1px solid #dbdbdb',
            padding: '16px 0 32px 0',
          }}
        >
          <div>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply
            dummy text of the printing and typesetting industry. Lorem Ipsum has
            been the industry's standard dummy text ever since the 1500s, when
            an unknown printer took a galley of type and scrambled it to make a
            type specimen book. It has survived not only five centuries, but
            also the leap into electronic typesetting, remaining essentially
            unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently
            with desktop publishing software like Aldus PageMaker including
            versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the
            printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type
            specimen book. It has survived not only five centuries, but also the
            leap into electronic typesetting, remaining essentially unchanged.
            It was popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem
            Ipsum.
          </div>
        </div>
        {/* {userId === creator.id ? EditDeleteButton : <></>} */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'end',
            marginTop: '32px',
          }}
        >
          <Link to="/rent/place/edit/1" style={{ marginRight: '8px' }}>
            <Button>수정하기</Button>
          </Link>
          <Button type="danger">삭제하기</Button>
        </div>
        <div
          style={{
            width: '100%',
            borderTop: '1px solid #dbdbdb',
            marginTop: '16px',
            paddingTop: '16px',
          }}
        >
          <h2>
            <b>COMMENTS</b>
          </h2>
          <input
            placeholder="댓글을 작성해주세요."
            style={{
              padding: '12px',
              width: '100%',
              border: '1px solid #dbdbdb',
            }}
          />
        </div>
      </Wrap>
    </RentDetailContainer>
  );
}

export default PlaceRentDetail;
