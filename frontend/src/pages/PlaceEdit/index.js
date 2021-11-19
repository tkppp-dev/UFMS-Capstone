import React, { useState } from 'react';
import { AddContainer, Wrap } from './style';
import { Button, Form, Input, Select } from 'antd';
import TextArea from 'antd/lib/input/TextArea';

function PlaceEdit() {
  const [form, setForm] = useState({
    name: 'afeaw',
    category: '',
    capacity: '',
    description: '',
  });

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <AddContainer>
      <Wrap>
        <Form>
          <Form.Item
            name={'name'}
            rules={[{ required: true }]}
            label="시설 이름 : "
          >
            <Input
              name="name"
              id="name"
              onChange={onChange}
              placeholder="시설 이름을 입력해주세요."
            />
          </Form.Item>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
            }}
          >
            <Form.Item
              name={'category'}
              rules={[{ required: true }]}
              label="건물 선택 : "
            >
              <Select defaultValue="1" name="category" onChange={onChange}>
                <Select.Option value="1">충무관</Select.Option>
                <Select.Option value="2">영실관</Select.Option>
                <Select.Option value="3">융덕관</Select.Option>
                <Select.Option value="4">광개토관</Select.Option>
                <Select.Option value="5">이당관</Select.Option>
                <Select.Option value="6">군자관</Select.Option>
                <Select.Option value="7">집현관</Select.Option>
                <Select.Option value="8">세종관</Select.Option>
                <Select.Option value="9">율곡관</Select.Option>
                <Select.Option value="10">대양AI센터</Select.Option>
                <Select.Option value="11">다산관</Select.Option>
                <Select.Option value="12">학생회관</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name={'capacity'}
              rules={[{ required: true }]}
              label="수용 인원 : "
              style={{ marginLeft: '32px' }}
            >
              <Input
                name="capacity"
                id="capacity"
                onChange={onChange}
                type="number"
                style={{ width: '50%' }}
              />
            </Form.Item>
          </div>
          <Form.Item
            name={'description'}
            rules={[{ required: true }]}
            label="설명 : "
          >
            <TextArea
              name="description"
              id="description"
              onChange={onChange}
              placeholder="설명을 입력해주세요."
              style={{ minHeight: '30vh' }}
            />
          </Form.Item>
          <Button type="primary" style={{ float: 'right' }}>
            작성하기
          </Button>
        </Form>
      </Wrap>
    </AddContainer>
  );
}

export default PlaceEdit;
