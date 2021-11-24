import React, { useState, useCallback, useEffect } from 'react';
import { loginAction, logoutAction } from 'redux/actions/user_actions';
import { useDispatch, useSelector } from 'react-redux';

// antd
import { Modal, Form, Button, Input, Divider } from 'antd';

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

  ///////////////////////////////////////////
  // Login Setting
  // if modal closed, the values will be reset
  const [form, setValues] = useState({
    email: '',
    password: '',
  });

  const { isAuthenticated } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const onChange = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 작동 안함
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const { email, password } = form;
      const user = { email, password };

      dispatch(loginAction(user));
    },
    [form, dispatch, isAuthenticated],
  );

  useEffect(() => {
    if (isAuthenticated) {
      setSignInVisible(false);
    }
  }, [isAuthenticated]);

  const onLogoutClick = () => {
    if (window.confirm('로그아웃 하시겠습니까?') === true) {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');

      const token = { accessToken, refreshToken };

      dispatch(logoutAction(token));
    } else {
      return false;
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <Button onClick={onLogoutClick}>Logout</Button>
      ) : (
        <Button onClick={showSignInModal} type={buttonType}>
          Sign In
        </Button>
      )}
      <Modal
        title="LOGIN"
        visible={signInVisible}
        onCancel={handleSignInCancel}
        footer=""
      >
        <div>
          <Form onSubmit={onSubmit}>
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

              <Button
                type="primary"
                style={{ width: '100%' }}
                onClick={onSubmit}
              >
                Sign In
              </Button>
            </div>
            <br />
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
