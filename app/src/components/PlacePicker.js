import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Platform } from 'react-native';
import { StyleSheet } from 'react-native';
import Picker from './Picker';

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 15px 0 15px 0;
`;

const PickerItem = styled.View`
  width: 48%;
`;

const PlacePicker = function ({ buildingData, setFloor, setFacility }) {
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

  const _onSelectFloor = function (value) {
    if (value === null) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
    setFloor(value);
    // 해당 층의 시설 리스트 뽑아오기 - 플랫폼별 다름
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
          items={[
            { label: 'XX1호', value: 'XX1호' },
            { label: 'XX2호', value: 'XX2호' },
            { label: 'XX3호', value: 'XX3호' },
            { label: 'XX4호', value: 'XX4호' },
          ]}
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
