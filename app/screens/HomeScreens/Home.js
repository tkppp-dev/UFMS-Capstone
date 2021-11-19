import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';
import Header from '../../src/components/Header';
import Building from '../../src/components/Building';

const Container = styled.View`
  flex: 1;
  align-items: center;
`;

const StyledText = styled.Text`
  font-size: 30px;
  margin-bottom: 10px;
`;

const Home = function ({ navigation }) {
  const builings = [
    { id: 1, name: '대양 AI 센터', floor: [-2, -1, 1, 2, 3, 4, 5, 6] },
    { id: 2, name: '광개토관', floor: [-2, -1, 1, 2, 3, 4, 5, 6] },
    { id: 3, name: '율곡관', floor: [-2, -1, 1, 2, 3, 4, 5, 6] },
    { id: 4, name: '영실관', floor: [-2, -1, 1, 2, 3, 4, 5, 6] },
    { id: 5, name: '우정당', floor: [-2, -1, 1, 2, 3, 4, 5, 6] },
    { id: 6, name: '학술정보원', floor: [-2, -1, 1, 2, 3, 4, 5, 6] },
    { id: 7, name: '군자관', floor: [-2, -1, 1, 2, 3, 4, 5, 6] },
    { id: 8, name: '학생회관', floor: [-2, -1, 1, 2, 3, 4, 5, 6] },
  ];

  return (
    <Container>
      <Header />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width: '100%', height: '100%' }}
      >
        {builings.map((item) => (
          <Building key={item.id} buildingData={item} navigation={navigation} />
        ))}
      </ScrollView>
    </Container>
  );
};

export default Home;
