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
import { Button } from 'antd';
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

function InqueryDetail(req) {
  const { user, userId, userName } = useSelector((state) => state.auth);
  const { inqueryDetail } = useSelector((state) => state.inquery);
  const { comments } = useSelector((state) => state.comment);
  const inqueryId = req.match.params.id;

  const [comment, setComment] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadInqueryAction(inqueryId));
    dispatch(loadCommentsAction(inqueryId));
  }, [dispatch, inqueryId]);

  const onDeleteClick = (e) => {
    e.preventDefault();
    var result = window.confirm('글을 삭제하시겠습니까?');

    if (result) {
      dispatch(inqueryDeleteAction(inqueryId));

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

  const onCommentEditClick = useCallback(
    (commentId) => {
      const data = {
        commentId,
        comment,
      };

      dispatch(commentEditAction(data));
    },
    [dispatch, comment],
  );

  const onCommentSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const data = {
        id: inqueryId,
        adminId: userId,
        content: comment,
        reservationInquiryId: inqueryId,
      };

      dispatch(commentUploadAction(data));
    },
    [dispatch, inqueryId, userId, comment],
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
                  <h3>{memberName}</h3>
                  <div>
                    <span>{content}</span>
                    {memberName === userName ? (
                      <CommentButtonContainer>
                        <span onClick={() => onCommentEditClick(id)}>수정</span>
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
    </RentDetailContainer>
  );
}

export default InqueryDetail;
