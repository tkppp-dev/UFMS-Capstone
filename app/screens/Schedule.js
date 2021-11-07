import React, { useContext } from 'react';
import { Button } from 'react-native';
import styled from 'styled-components/native';
import { Context, Provider } from '../src/context/index';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  justify-content: center;
`;

const StyledText = styled.Text`
  text-align: center;
  font-size: 20px;
  margin-bottom: 10px;
`;

const Schedule = function () {
  const { state, dispatch } = useContext(Context);

  return (
    <Provider>
      <Container>
        <StyledText>{state.user.isLogin ? 'true' : 'false'}</StyledText>
        <Button
          title="click"
          onPress={() => {
            if (state.user.isLogin === false) {
              dispatch({ type: 'LOGIN' });
            } else {
              dispatch({ type: 'LOGOUT' });
            }
            console.log(state);
          }}
        />
      </Container>
    </Provider>
  );
};

export default Schedule;
