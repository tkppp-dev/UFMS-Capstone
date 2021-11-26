import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { Text } from 'react-native';
import ClassTime from '../ClassTime';

const Container = styled.TouchableOpacity`
  flex: 1;
  padding: 10px 8px;
  border: 1px solid gray;
  border-radius: 3px;
  align-items: center;
`;

const TimeCheckbox = function ({
  index,
  selectedIndex,
  setTime,
  available,
  date,
}) {
  const startTime = new ClassTime(index);
  const endTime = new ClassTime(index + 1);
  const isBefore = startTime.isBeforeTime(date.year, date.month - 1, date.day);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if ((index < 8 && available['예약가능'] === false) || isBefore) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }

    if (index === 8) {
      setDisabled(true);
    }
  }, [date]);

  return (
    <Container
      style={{
        marginEnd: index % 3 === 2 ? 0 : 10,
        opacity: disabled ? 0.5 : 1,
        backgroundColor: index === selectedIndex ? '#007AFF' : '#f6f8f9',
      }}
      disabled={disabled}
      onPress={() => {
        setTime(index);
      }}
    >
      <Text style={{ color: index === selectedIndex ? 'white' : 'black' }}>
        {startTime.toString()} - {endTime.toString()}
      </Text>
    </Container>
  );
};

export default TimeCheckbox;
