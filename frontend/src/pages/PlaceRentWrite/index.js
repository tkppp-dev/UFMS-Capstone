import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import './index.css';
import {
  ContentsInput,
  SubmitButton,
  Title,
  TitleInput,
  WriteContainer,
} from './style';

function PlaceRentWrite() {
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

  const [value, setValue] = useState('');

  const onChangeContents = (e) => {
    setValue(e);
  };

  return (
    <WriteContainer>
      <Title>문의 글 쓰기</Title>
      <TitleInput placeholder="제목을 입력하세요" />
      <ContentsInput
        theme="snow"
        modules={modules}
        formats={formats}
        value={value}
        onChange={onChangeContents}
        placeholder="내용을 입력하세요"
      />
      <SubmitButton type="primary">문의하기</SubmitButton>
    </WriteContainer>
  );
}

export default PlaceRentWrite;
