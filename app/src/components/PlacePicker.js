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

const PlacePicker = function ({
  buildingData,
  floor,
  facility,
  setFloor,
  setFacility,
}) {
  const [floorItems, setFloorItems] = useState([]);
  const [facilityItems, setFacilityItems] = useState([]);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const temp = [];
    for (let floor of buildingData.floor) {
      if (floor < 0) {
        temp.push({ label: `지하 ${floor * -1}층`, value: floor });
      } else {
        temp.push({ label: `${floor}층`, value: floor });
      }
    }
    setFloorItems(temp);
  }, []);

  const getFaciltyList = async function (floor) {
    try {
      const res = await axios.post(endPoint + 'reservation/building/floor', {
        building: buildingData.name,
        floor: floor + '층',
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
