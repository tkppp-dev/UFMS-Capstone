import React, { useLayoutEffect } from "react";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const StyledText = styled.Text`
  font-size: 30px;
  margin-bottom: 10px;
`

const ClassReservation = function({ navigation }){
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'center',
    });
  });
  return(
    <Container>
      <StyledText>Class Reservation Screen</StyledText>
    </Container>
  )
}

export default ClassReservation