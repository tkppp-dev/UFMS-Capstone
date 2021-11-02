import React from 'react';
import { Link } from 'react-router-dom';

// antd
import { Button } from 'antd';

// style
import { Logo, MenuContainer, MenuBox, NavbarContainer, Wrap } from './style';

// component
import LoginModal from 'components/LoginModal/LoginModal';
import SearchInput from 'components/SearchInput';

function Navbar() {
  return (
    <NavbarContainer>
      <Wrap>
        <Logo to="/">Logo Logo</Logo>
        <MenuContainer>
          <div>
            <Link className="ant-dropdown-link" to="/rent/place">
              대관 문의
            </Link>
          </div>

          <div>
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              MENU
            </a>
          </div>

          <div>
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              MENU
            </a>
          </div>

          <div>
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              MENU
            </a>
          </div>
        </MenuContainer>
        <SearchInput />
        <LoginModal buttonType="link" />
        <a href="/user/signup">
          <Button type="primary">Sign Up</Button>
        </a>
      </Wrap>
    </NavbarContainer>
  );
}

export default Navbar;
