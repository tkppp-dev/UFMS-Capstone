import React, { useState, useContext, useEffect } from 'react';
import { Text, View } from 'react-native';
import { Modal } from 'react-native-paper';
import CustomButton from '../CustomButton';
import PlacePicker from '../PlacePicker'

const FacilitySelectModal = function ({ visible, onDismiss, buildingData }) {
  const [floor, setFloor] = useState(null);
  const [facility, setFacility] = useState(null);

  return (
    <Modal
      visible={visible}
      onDismiss={onDismiss}
      contentContainerStyle={{
        width: '90%',
        backgroundColor: 'white',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 8,
      }}
    >
      <View style={{ width: '90%' }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: 15,
          }}
        >
          시설 선택
        </Text>
        <PlacePicker
          buildingData={buildingData}
          setFloor={setFloor}
          setFacility={setFacility}
        />
        <View style={{ marginTop: 10 }} />
        <CustomButton
          label="조회"
          onPress={() => {
            onDismiss(false);
          }}
        />
      </View>
    </Modal>
  );
};

export default FacilitySelectModal;
