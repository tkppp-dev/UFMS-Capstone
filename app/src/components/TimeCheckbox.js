import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Text } from 'react-native';

const Container = styled.TouchableOpacity`
  flex: 1;
  padding: 10px 8px;
  border: 1px solid gray;
  border-radius: 3px;
  align-items: center;
`;

class ClassTime {
  constructor(index) {
    this.hour = 9;
    this.minute = 0;

    this.setTime(index);
  }

  setTime(index) {
    for (let i = 0; i < index; i++) {
      this.hour += 1;
      if (this.minute === 0) {
        this.minute = 30;
      } else {
        this.hour += 1;
        this.minute = 0;
      }
    }
  }

  toString() {
    let hourStr, minuteStr;

    if (this.hour < 10) {
      hourStr = `0${this.hour}`;
    } else {
      hourStr = `${this.hour}`;
    }

    if (this.minute < 10) {
      minuteStr = `0${this.minute}`;
    } else {
      minuteStr = `${this.minute}`;
    }

    return `${hourStr}:${minuteStr}`;
  }
}

const TimeCheckbox = function ({
  index,
  disabled = false,
  selectedIndex,
  setTime,
}) {
  const startTime = new ClassTime(index);
  const endTime = new ClassTime(index + 1);

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
      <Text style={{ color: index === selectedIndex ? 'white' : 'black',}}>
        {startTime.toString()} - {endTime.toString()}
      </Text>
    </Container>
  );
};

export default TimeCheckbox;
