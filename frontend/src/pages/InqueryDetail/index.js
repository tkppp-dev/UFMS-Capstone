import {
  ButtonContainer,
  CommentButtonContainer,
  CommentContainer,
  CommentForm,
  CommentInput,
  ContentContainer,
  RentDetailContainer,
  TitleContainer,
  Wrap,
} from './style';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, Input } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  inqueryDeleteAction,
  loadInqueryAction,
} from 'redux/actions/inquery_actions';
import {
  commentDeleteAction,
  commentEditAction,
  commentUploadAction,
  loadCommentsAction,
} from 'redux/actions/comment_actions';
import Modal from 'antd/lib/modal/Modal';

function InqueryDetail(req) {
  const { user, userId, userName } = useSelector((state) => state.auth);
  const { inqueryDetail } = useSelector((state) => state.inquery);
  const { comments } = useSelector((state) => state.comment);
  const inqueryId = req.match.params.id;

  const [comment, setComment] = useState('');
  const [commentId, setCommentId] = useState(0);

  const [isModalVisible, setisModalVisible] = useState(false);

  const showModal = (id) => {
    setisModalVisible(true);
    setCommentId(id);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadInqueryAction(inqueryId));
    dispatch(loadCommentsAction(inqueryId));
  }, [dispatch, inqueryId]);

  const handleOk = () => {
    setisModalVisible(false);
  };
  const handleCancel = () => {
    setisModalVisible(false);
  };

  const onDeleteClick = (e) => {
    e.preventDefault();
    var result = window.confirm('글을 삭제하시겠습니까?');

    if (result) {
      const id = Number(inqueryId);

      dispatch(inqueryDeleteAction(id));

      req.history.push('/inquery');
    }
  };

  const onCommentChange = (e) => {
    setComment(e.target.value);
  };

  const onCommentDeleteClick = useCallback(
    (commentId) => {
      dispatch(commentDeleteAction(commentId));
    },
    [dispatch],
  );

  const onCommentEditClick = useCallback(() => {
    const data = {
      commentId,
      comment,
    };

    dispatch(commentEditAction(data));
  }, [dispatch, comment]);

  const onCommentSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const data = {
        id: Number(inqueryId),
        adminId: userId,
        content: comment,
        reservationInquiryId: Number(inqueryId),
      };

      dispatch(commentUploadAction(data));
    },
    [dispatch, userId, comment],
  );

  const EditDeleteButton = (
    <ButtonContainer>
      <Link to={`/inquery/edit/${inqueryId}`}>
        <Button>수정하기</Button>
      </Link>
      <Button type="danger" onClick={onDeleteClick}>
        삭제하기
      </Button>
    </ButtonContainer>
  );

  return (
    <RentDetailContainer>
      <Wrap>
        <TitleContainer>
          <h2>{inqueryDetail.title}</h2>
          <div>
            {inqueryDetail.modifiedDate
              ? inqueryDetail.modifiedDate.slice(0, 10)
              : ''}
          </div>
        </TitleContainer>
        <ContentContainer>
          <div>{inqueryDetail.content}</div>
        </ContentContainer>
        {userId === inqueryDetail.memberId ? EditDeleteButton : <></>}
        <CommentContainer>
          <h2>
            <b>COMMENTS</b>
          </h2>
          <CommentForm onSubmit={onCommentSubmit}>
            <CommentInput
              value={comment}
              onChange={onCommentChange}
              placeholder="댓글을 작성해주세요."
              disabled={user.privileges === 'ADMIN' ? false : true}
            />
            <Button type="primary" onClick={onCommentSubmit}>
              작성
            </Button>
          </CommentForm>
          {Array.isArray(comments)
            ? comments.map(({ content, memberName, id }) => (
                <div key={id}>
                  <div>
                    <h2>답변</h2>
                    <span>{content}</span>
                    {user.privileges === 'ADMIN' ? (
                      <CommentButtonContainer>
                        <span onClick={() => showModal(id)}>수정</span>
                        <span onClick={() => onCommentDeleteClick(id)}>
                          삭제
                        </span>
                      </CommentButtonContainer>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              ))
            : 'Creator'}
        </CommentContainer>
      </Wrap>
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer=""
        width={800}
      >
        <div id="modal-container">
          <Input
            type="text"
            value={comment}
            onChange={onCommentChange}
            placeholder="변경할 댓글을 입력하세요."
          />
          <Button
            onClick={onCommentEditClick}
            type="primary"
            style={{ marginTop: '16px', width: '100%' }}
          >
            수정하기
          </Button>
        </div>
      </Modal>
    </RentDetailContainer>
  );
}

export default InqueryDetail;
