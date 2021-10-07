import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Text } from 'react-native';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

const FacilityUsage = function(){
  return(
    <Container>
      <Text>Facility Usage Screen</Text>
    </Container>
  )
}

export default FacilityUsage