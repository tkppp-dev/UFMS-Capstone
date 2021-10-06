import React from "react";
import { Button } from "react-native";
import styled from "styled-components";
import Header from '../src/components/Header'

const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
`

const StyledText = styled.Text`
  font-size: 30px;
  margin-bottom: 10px;
`

const Home = function({navigation}){
  return(
    <Container>
      <Header />
      <Button title="Go to Sign In Screen" onPress={() => navigation.navigate('HomeSignIn')}/>
    </Container>
  )
}

export default Home