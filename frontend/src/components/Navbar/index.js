import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

// antd
import { Button } from 'antd';

// style
import { Logo, MenuContainer, NavbarContainer, Wrap } from './style';

// component
import LoginModal from 'components/LoginModal/LoginModal';
import SearchInput from 'components/SearchInput';

function Navbar() {
  const { isAuthenticated, userId } = useSelector((state) => state.auth);

  return (
    <NavbarContainer>
      <Wrap>
        <Logo to="/">Logo Logo</Logo>
        <MenuContainer>
          <div>
            <Link className="ant-dropdown-link" to="/">
              강의실 예약
            </Link>
          </div>
          <div>
            <Link className="ant-dropdown-link" to="/rental">
              대관 예약
            </Link>
          </div>
          <div>
            <Link className="ant-dropdown-link" to="/inquery">
              대관 문의
            </Link>
          </div>
          <div>
            <Link className="ant-dropdown-link" to="/schedule">
              스케줄 관리
            </Link>
          </div>
          <div>
            <Link className="ant-dropdown-link" to="/office/all">
              연구실 확인
            </Link>
          </div>
        </MenuContainer>
        <div style={{ width: '30%' }}></div>
        <LoginModal buttonType="link" />
        {isAuthenticated ? (
          <Link to={`/user/mypage/${userId}`}>
            <Button type="primary">My Page</Button>
          </Link>
        ) : (
          <a href="/user/signup">
            <Button type="primary">Sign Up</Button>
          </a>
        )}
      </Wrap>
    </NavbarContainer>
  );
}

export default Navbar;
