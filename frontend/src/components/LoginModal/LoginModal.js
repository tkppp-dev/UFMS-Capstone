import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// antd
import { Modal, Form, Button, Input, Divider } from 'antd';

import GoogleLogin from 'react-google-login';
import GoogleButton from 'react-google-button';

function LoginModal({ buttonType }) {
  ///////////////////////////////////////////
  // Modal Setting
  const [signInVisible, setSignInVisible] = useState(false);

  const showSignInModal = () => {
    setSignInVisible(true);
  };
  const handleSignInCancel = () => {
    setSignInVisible(false);
  };

  // if modal closed, the values will be reset
  const [form, setValues] = useState({
    email: '',
    password: '',
  });

  const onChange = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <Button onClick={showSignInModal} type={buttonType}>
        Sign In
      </Button>
      <Modal
        title="LOGO"
        visible={signInVisible}
        onCancel={handleSignInCancel}
        footer=""
      >
        <div style={{ marginBottom: '32px', width: '100%' }}>
          <Divider>소셜 계정으로 로그인</Divider>
          <GoogleLogin
            clientId="534707785395-1c3aq9gp00tfbib4rgg0eemp6ma0ddup.apps.googleusercontent.com"
            render={(renderProps) => (
              <GoogleButton
                onClick={renderProps.onClick}
                style={{ width: '100%' }}
              >
                Sign in with Google
              </GoogleButton>
            )}
            theme="dark"
          />
        </div>

        <Divider>이메일로 로그인</Divider>
        <div>
          <Form>
            <div>
              <Form.Item label="EMAIL" style={{ marginBottom: '16px' }}>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  onChange={onChange}
                  style={{ width: '100%' }}
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

              <Button type="primary" style={{ width: '100%' }}>
                Sign In
              </Button>
            </div>
            <br />
            <div style={{ textAlign: 'center', marginBottom: '7px' }}>
              <span>
                <a href="/user/password" onClick={handleSignInCancel}>
                  Forgot a Password?
                </a>
              </span>
            </div>
            <div style={{ textAlign: 'center' }}>
              <span>Not a Member?&nbsp;&nbsp;</span>
              <span>
                <a href="/user/signup" onClick={handleSignInCancel}>
                  Sign Up
                </a>
              </span>
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  );
}

export default LoginModal;
