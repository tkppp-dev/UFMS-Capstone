import Form from 'antd/lib/form/Form';
import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { inqueryEditAction } from 'redux/actions/inquery_actions';
import './index.css';
import {
  ContentsInput,
  SubmitButton,
  Title,
  TitleInput,
  WriteContainer,
} from './style';

function InqueryEdit(req) {
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

  const { inqueryDetail } = useSelector((state) => state.inquery);
  const id = req.match.params.id;

  const dispatch = useDispatch();

  const [title, setTitle] = useState(inqueryDetail.title);
  const [content, setContent] = useState(inqueryDetail.content);

  const onChange = (e) => {
    setTitle(e.target.value);
  };

  const onChangeQuill = (value) => {
    setContent(value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    let data = { title, content: content.replace(/(<([^>]+)>)/gi, ''), id };

    dispatch(inqueryEditAction(data));

    req.history.push('/inquery');
  };

  return (
    <WriteContainer>
      <Title>문의 글 수정하기</Title>
      <Form onFinish={onSubmit}>
        <TitleInput
          value={title}
          onChange={onChange}
          placeholder="제목을 입력하세요"
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
          수정하기
        </SubmitButton>
      </Form>
    </WriteContainer>
  );
}

export default InqueryEdit;
