import React, { useState } from 'react';

// antd
import { Button, Form, Input, Select } from 'antd';

// style
import { FormContainer, SignUpContainer, Wrap } from './style';

function SignUp() {
  const [form, setValues] = useState({
    name: '',
    email: '',
    password: '',
    passwordCheck: '',
  });

  const onChange = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <SignUpContainer>
      <Wrap>
        <FormContainer>
          <div>
            <a href="/">Logo Logo</a>
          </div>
          <Form>
            <Form.Item label="NAME">
              <Input
                type="name"
                name="name"
                id="name"
                placeholder="Name"
                onChange={onChange}
              />
            </Form.Item>
            <Form.Item label="EMAIL">
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onChange={onChange}
              />
            </Form.Item>

            <Form.Item label="PASSWORD">
              <Input.Password
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={onChange}
              />
            </Form.Item>

            <Form.Item label="PASSWORD CHECK">
              <Input.Password
                type="password"
                name="passwordCheck"
                id="passwordCheck"
                placeholder="Password Check"
                onChange={onChange}
              />
            </Form.Item>

            <Form.Item label="Role">
              <Select defaultValue="student">
                <Select.Option value="student">Student</Select.Option>
                <Select.Option value="professor">Professor</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button style={{ width: '100%' }} type="primary">
                Register
              </Button>
            </Form.Item>
          </Form>
        </FormContainer>
      </Wrap>
    </SignUpContainer>
  );
}

export default SignUp;
