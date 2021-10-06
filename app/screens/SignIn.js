import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Dimensions, Text, Button } from 'react-native';

const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
`

const RowContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center
`

const StyledInput = styled.TextInput.attrs(props => ({
  placeholder: props.placeholder,
  placeholderTextColor: 'grey',
  autoCapitalize: 'none',
  returnKeyType: 'done'
}))`
  width: ${(props) => props.width - 100}px;
  height: 50px;
  padding: 10px;
  margin: 5px;
  border: 2px;
  border-color: grey;
  border-radius: 10px;
`

const SubmitButton = styled.TouchableOpacity`
  align-items: center;
  width : ${props => props.width - 100}px;
  margin-top: 10px;
  padding: 10px;
  background-color: #007AFF;
  border-radius: 10px;
`

const SignUpButton = styled.TouchableOpacity`
  align-items: center;
  margin-top: 20px;
`

const StyledText = styled.Text`
  color : ${props => props.color};
  font-size: ${props => props.fontSize ? props.fontSize + 'px' : '20px'};
`

const SignInScreen = function(){
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const width = Dimensions.get('window').width

  return(
    <Container>
      <StyledInput
        width={width}
        placeholder={"Enter ID"} 
        value={id}
        onChangeText={(text) => setId(text)}
      />
      <StyledInput
        width={width}
        placeholder={"Enter Password"}
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      />
      <SubmitButton width={width}>
        <StyledText color="white">Sign In</StyledText>
      </SubmitButton>
      <SignUpButton>
        <StyledText color="#007AFF" fontSize="18">Sign Up</StyledText>
      </SignUpButton>
      
    </Container>
  )
}

export default SignInScreen