import React from 'react';
import { Text, View } from 'react-native';
import { Modal } from 'react-native-paper';
import CustomButton from '../CustomButton';
import InformationItem from '../InformationItem';

const RentalCompleteModal = function ({
  visible,
  onDismiss,
  facility,
  cost,
  rentalDay,
  date,
  onPressApply
}) {
  const getRentalPeriod = function () {
    const startDate = `${date.year}/${date.month}/${date.day}`;
    if (rentalDay === 1) {
      return startDate;
    } else {
      const endDate = new Date(
        date.year,
        date.month - 1,
        date.day + rentalDay - 1
      );
      return startDate + ` - ${endDate.getFullYear()}/${endDate.getMonth() + 1}/${endDate.getDate()}`
    }
  };

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
          대관 정보를 확인하세요
        </Text>
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          <InformationItem title="예약시설" body={facility} row={true} />
          <InformationItem
            title="예약기간"
            body={getRentalPeriod()}
            row={true}
          />
        </View>
        <InformationItem
          title="대관료 납부계좌"
          body={'신한은행 111-111-111111'}
        />
        <InformationItem title="대관료" body={cost * rentalDay + '원'} />
        <InformationItem
          title="유의사항"
          body={'대관료 납부 완료 후 영업일 기준 1~3일 내 신청이 승인됩니다'}
        />
        <View style={{ marginTop: 10 }} />
        <CustomButton onPress={onPressApply} label="대관 신청 완료" />
      </View>
    </Modal>
  );
};

export default RentalCompleteModal;
