import React from 'react';
import styled from 'styled-components/native';
import * as Progress from 'react-native-progress';

const Container = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const LoadingSpinner = function () {
  return (
    <Container>
      <Progress.Circle size={40} indeterminate={true} borderWidth={3} />
    </Container>
  );
};

export default LoadingSpinner;
