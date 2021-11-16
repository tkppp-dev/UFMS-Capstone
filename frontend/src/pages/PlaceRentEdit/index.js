import React, { useLayoutEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import './index.css';
import {
  ContentsInput,
  SubmitButton,
  Title,
  TitleInput,
  WriteContainer,
} from './style';

function PlaceRentEdit(req) {
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

  // const { title, contents } = useSelector((state) => state.project);

  // const dispatch = useDispatch();

  // useLayoutEffect(() => {
  //   dispatch(detailPlaceAction(req.match.params.id));
  // }, [dispatch, req.match.params.id]);

  // const [form, setForm] = useState({
  //   title: `${title}`,
  //   contents: `${contents}`
  // })

  // const onChange = (e) => {
  //   setForm({
  //     ...form,
  //     [e.target.name]: e.target.value
  //   })
  // }

  // const onSubmit = (e) => {
  //   e.preventDefault();

  //   const { title, contents } = form;
  //   const token = localStorage.getItem('accessToken');

  //   let data = { title, contents, token };

  //   dispatch(updatePlaceAction(data));
  // }

  const [value, setValue] = useState(
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  );

  const onChangeContents = (e) => {
    setValue(e);
  };

  return (
    <WriteContainer>
      <Title>문의 글 수정하기</Title>
      <TitleInput
        placeholder="제목을 입력하세요"
        value="New York No. 1 Lake Park, New York No. 1 Lake Park New York No."
      />
      <ContentsInput
        theme="snow"
        modules={modules}
        formats={formats}
        value={value}
        onChange={onChangeContents}
        placeholder="내용을 입력하세요"
      />
      <SubmitButton type="primary">수정하기</SubmitButton>
    </WriteContainer>
  );
}

export default PlaceRentEdit;