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

function InqueryWrite() {
  const [form, setForm] = useState({
    title: '',
    content: '',
  });

  const { userName } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const { title, content } = form;
    let author = userName;

    let data = {
      title,
      content,
      author,
    };

    dispatch(inqueryWriteAction(data));
  };

  return (
    <WriteContainer>
      <Title>문의 글 쓰기</Title>
      <Form onFinish={onSubmit}>
        <TitleInput
          placeholder="제목을 입력하세요"
          name="title"
          id="title"
          onChange={onChange}
        />
        <ContentsInput
          name="content"
          id="content"
          theme="snow"
          modules={modules}
          formats={formats}
          value={form.content}
          onChange={onChange}
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
