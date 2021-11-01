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

const Ask = function({ navigation }){
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'center',
    });
  });
  
  return(
    <Container>
      <StyledText>Ask Screen</StyledText>
    </Container>
  )
}

export default Ask