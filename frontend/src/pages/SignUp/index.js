import React, { useCallback, useState } from 'react';

// antd
import { Button, Form, Input } from 'antd';

// style
import { FormContainer, SignUpContainer, SignUpSuccess, Wrap } from './style';
import { useDispatch, useSelector } from 'react-redux';
import { registerAction } from 'redux/actions/user_actions';
import axios from 'axios';

function SignUp() {
  const [form, setValues] = useState({
    name: '',
    email: '',
    password: '',
    passwordCheck: '',
    mobile: '',
    authNum: '',
  });

  const [isSend, setIsSend] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [authNumber, setAuthNumber] = useState(0);

  const { isAuthenticated } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const onChange = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSend = useCallback(
    (e) => {
      e.preventDefault();

      axios
        .post('/api/user/register/mobile', form.mobile)
        .then((res) => {
          setIsSend(true);
          setAuthNumber(res.data);

          setValues({
            mobile: '',
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    [form],
  );

  const onAuth = () => {
    if (authNumber === Number(form.authNum)) {
      setIsAuth(true);
    } else {
      alert('인증번호를 확인해주세요.');
    }
  };

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const { name, email, password, passwordCheck, mobile } = form;

      if (password !== passwordCheck) {
        alert('비밀번호와 비밀번호 확인은 같아야 합니다.');
      } else {
        const user = { email, password, username: name, mobile };

        dispatch(registerAction(user));
      }
    },
    [form, dispatch],
  );

  return (
    <SignUpContainer>
      <Wrap>
        {isAuthenticated ? (
          <SignUpSuccess>
            <div>회원가입에 성공했습니다.</div>
            <a href="/">홈으로 가기</a>
          </SignUpSuccess>
        ) : (
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

              <Form.Item label={isSend ? '인증 번호' : '휴대폰 번호'}>
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                  {isSend ? (
                    <Input
                      type="text"
                      name="authNum"
                      id="authNum"
                      placeholder="인증 번호를 입력하세요."
                      onChange={onChange}
                    />
                  ) : (
                    <Input
                      type="text"
                      name="mobile"
                      id="mobile"
                      placeholder="Phone Number"
                      onChange={onChange}
                    />
                  )}

                  {isSend ? (
                    isAuth ? (
                      <Button
                        type="primary"
                        style={{ marginLeft: '4px' }}
                        onClick={onAuth}
                      >
                        인증 완료
                      </Button>
                    ) : (
                      <Button
                        type="primary"
                        style={{ marginLeft: '4px' }}
                        onClick={onAuth}
                      >
                        인증하기
                      </Button>
                    )
                  ) : (
                    <Button
                      type="primary"
                      style={{ marginLeft: '4px' }}
                      onClick={onSend}
                    >
                      문자 전송
                    </Button>
                  )}
                </div>
              </Form.Item>
              <Form.Item>
                <Button
                  style={{ width: '100%' }}
                  type="primary"
                  onClick={onSubmit}
                >
                  Register
                </Button>
              </Form.Item>
            </Form>
          </FormContainer>
        )}
      </Wrap>
    </SignUpContainer>
  );
}

export default SignUp;
