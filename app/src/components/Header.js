import React from 'react';
import styled from 'styled-components/native';
//import PropTypes from 'prop-types';
//import IconButton from './IconButton';
//import { images } from '../images'


const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  background-color: white;
`

const LogoText = styled.Text`
  margin-left: 10px;
  font-size: 30px;
`

const Header = function(){
  return(
    <Container>
      <LogoText>LOGO</LogoText>
    </Container>
  )
}

export default Header