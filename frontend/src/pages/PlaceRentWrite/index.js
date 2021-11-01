import { Button, Input } from 'antd';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './index.css';

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
      ['link', 'image'],
      [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
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
    <div>
      <h1 style={{ marginLeft: '5%', marginTop: '48px' }}>문의 글 쓰기</h1>
      <Input
        placeholder="제목을 입력하세요"
        style={{
          width: '90%',
          height: '48px',
          marginLeft: '5%',
        }}
      />
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        value={value}
        onChange={onChangeContents}
        placeholder="내용을 입력하세요"
        style={{
          height: '400px',
          width: '90%',
          margin: '5%',
          marginTop: '16px',
          backgroundColor: 'white',
          padding: 0,
        }}
      />
      <Button type="primary" style={{ float: 'right', marginRight: '5%' }}>
        문의하기
      </Button>
    </div>
  );
}

export default PlaceRentWrite;
