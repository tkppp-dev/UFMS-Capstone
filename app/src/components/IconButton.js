import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import {images} from '../images'

const Icon = styled.Image`
  width: 30px;
  height: 30px;
  margin: 10px;
`

const IconButton = function(props){
  return(
    <TouchableOpacity onPressOut={props.onPressOut}>
      <Icon source={props.type}/>
    </TouchableOpacity>
  )
}

IconButton.propTypes = {
  type: PropTypes.oneOf(Object.values(images)).isRequired,
  onPressOut: PropTypes.func
}

export default IconButton