import React, { useState } from 'react';
import styled from 'styled-components/native';
import Header from '../../src/components/Header';
import {
  NavigationContainer,
  NavigationContext,
} from '@react-navigation/native';
import HomeTabNavigator from '../../navigations/HomeTabNavigator';

const routeNames = {
  classRoom: '강의실',
  rental: '대관 시설',
  lab: '연구실/사무실',
};

const Container = styled.View`
  flex: 1;
  align-items: center;
`;

const HomeTabView = function ({ navigation }) {
  return (
    <Container>
      <Header />
      <HomeTabNavigator />
    </Container>
  );
};

export default HomeTabView;
