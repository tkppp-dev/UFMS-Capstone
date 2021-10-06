import React from "react";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  justify-content: center;
`

const StyledText = styled.Text`
  text-align: center;
  font-size: 20px;
  margin-bottom: 10px;
`

const Schedule = function(){
  return(
    <Container>
      <StyledText>Schedule Screen</StyledText>
    </Container>
  )
}

export default Schedule