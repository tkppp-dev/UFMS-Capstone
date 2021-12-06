import React from 'react';
import styled from 'styled-components/native';
import { Image } from 'react-native';
import Logo from '../../assets/sejong-logo.jpg';

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  background-color: white;
  border-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: #d6dde4;
`;

const LogoText = styled.Text`
  margin-left: 10px;
  font-size: 30px;
`;

const Header = function () {
  return (
    <Container>
      <Image style={{ resizeMode: 'contain', height: 40, marginLeft: 5 }} source={Logo} />
    </Container>
  );
};

export default Header;
