import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// antd
import { Modal, Form, Button, Input } from 'antd';

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
      <Modal visible={signInVisible} onCancel={handleSignInCancel} footer="">
        <h2 style={{ marginBottom: '32px' }}>SIGN IN</h2>
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
                <Link to="/findpassword" onClick={handleSignInCancel}>
                  Forgot a Password?
                </Link>
              </span>
            </div>
            <div style={{ textAlign: 'center' }}>
              <span>Not a Member?&nbsp;&nbsp;</span>
              <span>
                <Link to="/user/signup" onClick={handleSignInCancel}>
                  Sign Up
                </Link>
              </span>
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  );
}

export default LoginModal;
