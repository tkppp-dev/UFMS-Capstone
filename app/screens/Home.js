import React, { useContext } from 'react';
import { StatusBar, ScrollView, Text } from 'react-native';
import styled from 'styled-components/native';
import Header from '../src/components/Header';
import Building from '../src/components/Building';
import { Context } from '../src/context/index';

const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
`;

const StyledText = styled.Text`
  font-size: 30px;
  margin-bottom: 10px;
`;

const Home = function ({ navigation }) {
  const { state } = useContext(Context);

  console.log(state)

  const builings = [
    { id: 1, name: '대양 AI 센터' },
    { id: 2, name: '광개토관' },
    { id: 3, name: '율곡관' },
    { id: 4, name: '영실관' },
    { id: 5, name: '우정당' },
    { id: 6, name: '학술정보원' },
    { id: 7, name: '군자관' },
    { id: 8, name: '학생회관' },
  ];

  return (
    <Container>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
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
