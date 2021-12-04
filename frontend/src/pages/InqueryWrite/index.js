import Form from 'antd/lib/form/Form';
import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { inqueryWriteAction } from 'redux/actions/inquery_actions';
import './index.css';
import {
  ContentsInput,
  SubmitButton,
  Title,
  TitleInput,
  WriteContainer,
} from './style';

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    [{ align: [] }, { color: [] }, { background: [] }],
    ['clean'],
  ],
};

const formats = [
  //'font',
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'align',
  'color',
  'background',
];

function InqueryWrite(req) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const { userId } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const onChange = (e) => {
    setTitle(e.target.value);
  };

  const onChangeQuill = (value) => {
    setContent(value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const memberId = userId;

    let data = {
      title,
      content: content.replace(/(<([^>]+)>)/gi, ''),
      memberId,
    };

    dispatch(inqueryWriteAction(data));

    req.history.push('/inquery');
  };

  return (
    <WriteContainer>
      <Title>문의 글 쓰기</Title>
      <Form onFinish={onSubmit}>
        <TitleInput
          placeholder="제목을 입력하세요"
          value={title}
          onChange={onChange}
        />
        <ContentsInput
          theme="snow"
          modules={modules}
          formats={formats}
          value={content}
          onChange={onChangeQuill}
          placeholder="내용을 입력하세요"
        />
        <SubmitButton type="primary" onClick={onSubmit}>
          문의하기
        </SubmitButton>
      </Form>
    </WriteContainer>
  );
}

export default InqueryWrite;
