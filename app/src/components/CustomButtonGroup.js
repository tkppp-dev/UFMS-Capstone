import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { ButtonGroup } from 'react-native-elements'

const Container = styled.View`
  width: ${(props) => props.width - 100}px;
  margin: 5px 0 15px 0;
`;

const Label = styled.Text`
  color: black;
  margin-bottom: 5px;
  padding-left: 5px;
`;

const CustomButtonGroup = function ({label ,buttonItems}) {
  const width = Dimensions.get('window').width;
  const [selectedIdx, setselectedIdx] = useState();

  return (
    <Container width={width}>
      <Label>{label}</Label>
      <ButtonGroup
        buttons={buttonItems}
        selectedIndex={selectedIdx}
        onPress={(selectedIndex) => {
          setselectedIdx(selectedIndex);
        }}
        containerStyle={{
          width: width - 100,
          height: 42,
          marginLeft: 0,
          borderRadius: 4,
          backgroundColor: 'white',
        }}
        buttonStyle={{
          borderColor: '#D6DDE4'
        }}
      />
    </Container>
  );
};

export default CustomButtonGroup