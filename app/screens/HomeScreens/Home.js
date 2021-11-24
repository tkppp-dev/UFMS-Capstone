import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Dimensions, Image, Text, ScrollView } from 'react-native';
import Header from '../../src/components/Header';
import { Context } from '../../src/context/index';
import axios from 'axios';
import { endPoint } from '../../src/endPoint';

const Container = styled.View`
  flex: 1;
  align-items: center;
`;

const BuildingTitle = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  width: ${({ width }) => width * 0.95}px;
  margin: 10px;
  padding: 10px 5px 10px 5px;
  border: 1px solid #d6dde4;
  border-radius: 4px;
  background-color: white;
`;

const Home = function ({ navigation }) {
  const { state } = useContext(Context);
  const width = Dimensions.get('window').width;
  const [buildings, setBuildings] = useState([]);

  useEffect(() => {
    const getBuilding = async function () {
      try {
        const res = await axios.get(endPoint + 'reservation/building');
        res.data.map((building, idx) => {
          buildings.push({
            id: idx + 1,
            name: building,
          });
        });
        setBuildings([...buildings]);
      } catch (err) {
        console.error(err);
      }
    };

    getBuilding();
  }, []);
  console.log(state);

  return (
    <Container>
      <Header />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width: '100%', height: '100%' }}
      >
        <Container>
          {buildings.map((item) => {
            return (
              <BuildingTitle
                key={item.id}
                width={width}
                onPress={() => {
                  navigation.navigate('Facility Usage', { buildingData: item});
                }}
              >
                <Image
                  style={{ width: 70, height: 70, marginLeft: 5 }}
                  source={require('../../assets/dummy-image.jpeg')}
                />
                <Text style={{ marginLeft: 10, fontSize: 20 }}>
                  {item.name}
                </Text>
              </BuildingTitle>
            );
          })}
        </Container>
      </ScrollView>
    </Container>
  );
};

export default Home;
