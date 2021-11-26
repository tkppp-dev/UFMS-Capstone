import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Platform } from 'react-native';
import { StyleSheet } from 'react-native';
import Picker from './Picker';
import axios from 'axios';
import { endPoint } from '../endPoint';

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 15px 0 15px 0;
`;

const PickerItem = styled.View`
  width: 48%;
`;

const getFloorValue = function (floor) {
  if (floor.slice(0, 2) === '지하') {
    const temp = floor.slice(2, -1);
    return parseInt(`-${temp.toString()}`);
  } else {
    const temp = floor.slice(0, -1);
    return parseInt(temp.toString());
  }
};

const PlacePicker = function ({ buildingData, setFloor, setFacility }) {
  const [floorItems, setFloorItems] = useState([]);
  const [facilityItems, setFacilityItems] = useState([]);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const getFloorList = async function () {
      try {
        const res = await axios.get(
          endPoint + `reservation/building/floor/${buildingData.name}`
        );
        const temp = [];

        res.data.map((value, idx) => {
          temp.push({
            label: value,
            value: getFloorValue(value),
          });
        });

        temp.sort((a, b) => {
          if (a.value <= b.value) {
            return -1;
          } else {
            return 0;
          }
        });
        setFloorItems(temp);
      } catch (err) {
        console.error(err);
        Alert.alert('예상치 못한 에러로 정보 로딩에 실패했습니다');
      }
    };

    getFloorList();
  }, []);

  const getFaciltyList = async function (floor) {
    try {
      let floorStr;
      if (floor < 0) {
        floorStr = `지하${floor * -1}층`;
      }
      else{
        floorStr = `${floor}층`
      }
      const res = await axios.post(endPoint + 'reservation/building/floor', {
        building: buildingData.name,
        floor: floorStr
      });
      const temp = [];

      res.data.map((facility) => {
        temp.push({ label: facility.name, value: facility.name });
      });
      setFacilityItems(temp);
    } catch (err) {
      console.error(err);
    }
  };

  const _onSelectFloor = async function (value, idx) {
    if (value === null) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
    setFloor(value);
    getFaciltyList(value);
  };

  const _onSelectFacility = function (value) {
    setFacility(value);
  };

  return (
    <Container>
      <PickerItem>
        <Picker label="층" items={floorItems} onValueChange={_onSelectFloor} />
      </PickerItem>
      <PickerItem>
        <Picker
          label="시설"
          items={facilityItems}
          onValueChange={_onSelectFacility}
          disabled={disabled}
        />
      </PickerItem>
    </Container>
  );
};

const pickerStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 5,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
  },
  inputAndroid: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 4,
    color: 'black',
  },
});

export default PlacePicker;
