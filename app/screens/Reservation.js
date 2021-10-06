import React from "react";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  justify-content: center;
`

const StyledText = styled.Text`
  font-size: 30px;
  margin-bottom: 10px;
`

const Reservation = function(){
  return(
    <Container>
      <StyledText>Reservation Screen</StyledText>
    </Container>
  )
}

export default Reservation