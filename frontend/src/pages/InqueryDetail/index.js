import { RentDetailContainer, Wrap } from './style';
import React, { useEffect } from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  inqueryDeleteAction,
  loadInqueryAction,
} from 'redux/actions/inquery_actions';
import {
  DELETE_COMMENT_REQUEST,
  EDIT_COMMENT_REQUEST,
} from 'redux/types/comment_types';
import { loadCommentsAction } from 'redux/actions/comment_actions';

function InqueryDetail(req) {
  // const { userId } = useSelector((state) => state.auth);
  // const { inqueryDetail } = useSelector((state) => state.inquery);
  // const { comments } = useSelector((state) => state.comment);
  // const inqueryId = req.match.params.id;

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(loadInqueryAction(inqueryId));
  //   dispatch(loadCommentsAction(inqueryid));
  // }, [dispatch, inqueryId]);

  // const onDeleteClick = (e) => {
  //   e.preventDefault();
  //   var result = window.confirm('글을 삭제하시겠습니까?');

  //   if (result) {
  //     dispatch(inqueryDeleteAction(inqueryId));
  //   }
  // };

  // const onCommentDeleteClick = (commentId) => {
  //   const id = inqueryId;

  //   dispatch({
  //     type: DELETE_COMMENT_REQUEST,
  //     payload: {
  //       id,
  //       commentId,
  //     },
  //   });
  // };

  // const onCommentEditClick = (commentId) => {
  //   const id = inqueryId;

  //   dispatch({
  //     type: EDIT_COMMENT_REQUEST,
  //     payload: {
  //       id, commentId
  //     }
  //   })
  // }

  // const EditDeleteButton = (
  //   <div
  //     style={{
  //       display: 'flex',
  //       justifyContent: 'end',
  //       marginTop: '32px',
  //     }}
  //   >
  //     <Link to={`/inquery/edit/${inqueryId}`} style={{ marginRight: '8px' }}>
  //       <Button>수정하기</Button>
  //     </Link>
  //     <Button type="danger" onClick={onDeleteClick}>삭제하기</Button>
  //   </div>
  // );

  return (
    <RentDetailContainer>
      <Wrap>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            {/* {inqueryDetail.title} */}
            <h1>
              New York No. 1 Lake Park, New York No. 1 Lake Park New York No.
            </h1>
          </div>
          {/* <div style={{ paddingTop: '10px', color: 'gray' }}>{inqueryDetail.register_date}</div> */}

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
            {/* {inqueryDetail.content} */}
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
        {/* {userId === inqueryDetail.author.id ? EditDeleteButton : <></>} */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'end',
            marginTop: '32px',
          }}
        >
          <Link to="/inquery/edit/1" style={{ marginRight: '8px' }}>
            <Button>수정하기</Button>
          </Link>
          <Button type="danger">삭제하기</Button>
        </div>
        <div
          style={{
            width: '100%',
            borderTop: '1px solid #dbdbdb',
            marginTop: '32px',
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
              marginBottom: '16px',
            }}
          />
          {/* {Array.isArray(comments) ? comments.map(
            ({ content, author, id }) => (
              <div key={id} style={{ padding: "12px" }}>
                <h3>{author}</h3>
                <div>
                  <span>{content}</span>
                  <span style={{ float: "right" }}>
                    <span style={{ marginRight: "8px", cursor: "pointer" }} onClick={() => onCommentEditClick(id)}>수정</span>
                    <span style={{ cursor: "pointer", color: "red" }} onClick={() => onCommentDeleteClick(id)}>삭제</span>
                  </span>
                  
                </div>
              </div>
            )
          ) : 'Creator'} */}
          <div style={{ padding: '12px' }}>
            <h3>Author</h3>
            <div>Content</div>
          </div>
          <div style={{ padding: '12px' }}>
            <h3>Author</h3>
            <div>
              <span>Content</span>
              <span style={{ float: 'right' }}>
                <span
                  style={{
                    marginRight: '8px',
                    cursor: 'pointer',
                  }}
                >
                  수정
                </span>
                <span style={{ cursor: 'pointer', color: 'red' }}>삭제</span>
              </span>
            </div>
          </div>
        </div>
      </Wrap>
    </RentDetailContainer>
  );
}

export default InqueryDetail;
