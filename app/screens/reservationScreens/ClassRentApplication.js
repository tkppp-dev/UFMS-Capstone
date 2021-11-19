import React, { useLayoutEffect, useEffect, useState } from 'react';
import { ScrollView, View, Text, Alert, Modal, StyleSheet } from 'react-native';
import styled from 'styled-components';
import Picker from '../../src/components/Picker';
import CustomInput from '../../src/components/CustomInput';

const Container = styled.View`
  width: 100%;
  align-items: center;
`;

const DatePicker = styled.View`
  width: 90%;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  margin: 10px 0 10px 0;
`;

const PickerContainer = styled.View`
  width: 30%;
`;

const Button = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px;
  border-radius: 4px;
  background-color: #007aff;
`;

const Content = styled.View`
  width: 90%;
`;

const CenteredView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const getDayList = function (year, month) {
  const day = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 18, 19, 20, 21, 22,
    23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];

  if (month === 2) {
    if (new Date(year, 1, 29).getDate() === 29) {
      return day.slice(0, -2);
    } else {
      return day.slice(0, -3);
    }
  } else if (month % 2 === 1) {
    if (month > 7) {
      return day.slice(0, -1);
    } else {
      return day;
    }
  } else {
    if (month > 7) {
      return day;
    } else {
      return day.slice(0, -1);
    }
  }
};

const ClassRentApplication = function ({ navigation, route }) {
  const dt = new Date();
  const [year, setYear] = useState(dt.getFullYear());
  const [month, setMonth] = useState(dt.getMonth() + 1);
  const [day, setDay] = useState(dt.getDate());
  const [showApplication, setShowApplication] = useState(false);
  const [dayList, setDayList] = useState(
    getDayList(year, month).map((el) => ({
      label: `${el}`,
      value: el,
    }))
  );

  const [modalVisible, setModalVisible] = useState(false);

  const yearList = [
    { label: `${dt.getFullYear()}`, value: dt.getFullYear() },
    { label: `${dt.getFullYear() + 1}`, value: dt.getFullYear() + 1 },
  ];

  const monthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((el) => ({
    label: `${el}`,
    value: el,
  }));

  useEffect(() => {
    setDayList(
      getDayList(year, month).map((el) => ({
        label: `${el}`,
        value: el,
      }))
    );
  }, [month]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: false,
      headerTitleAlign: 'center',
      title: '예약하기'
    });
  });

  const _onPressSearchButton = function () {
    setShowApplication(true)
  };

  const _onPressApplyButton = function () {
    setModalVisible(true);
  };

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <Container>
        <DatePicker>
          <PickerContainer>
            <Picker
              label="년"
              items={yearList}
              value={year}
              onValueChange={(value) => setYear(value)}
            />
          </PickerContainer>
          <PickerContainer>
            <Picker
              label="월"
              items={monthList}
              value={month}
              onValueChange={(value) => setMonth(value)}
            />
          </PickerContainer>
          <PickerContainer>
            <Picker
              label="일"
              items={dayList}
              value={day}
              onValueChange={(value) => setDay(value)}
            />
          </PickerContainer>
        </DatePicker>
        <Content>
          <Button onPress={_onPressSearchButton}>
            <Text style={{ color: 'white' }}>조회</Text>
          </Button>
          <View
            style={{
              marginTop: 15,
              paddingTop: 15,
              borderTopWidth: 1,
              borderTopColor: 'grey',
            }}
          >
            {showApplication === false ? null : (
              <>
                <CustomInput label="예약 이름" />
                <CustomInput label="대상" />
                <CustomInput label="예약 목적" type="textarea" />
                <Button onPress={_onPressApplyButton}>
                  <Text style={{ color: 'white' }}>강의실 예약</Text>
                </Button>
                <CenteredView>
                  <Modal
                    animationType="fade"
                    visible={modalVisible}
                    transparent={true}
                    onRequestClose={() => {
                      setModalVisible(false);
                      navigation.navigate('Home');
                    }}
                  >
                    <CenteredView>
                      <View style={styles.modalView}>
                        <Text
                          style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            marginBottom: 15,
                          }}
                        >
                          예약이 완료되었습니다.
                        </Text>
                        <Button
                          onPress={() => {
                            setModalVisible(false);
                            navigation.reset({
                              routes: [{ name: 'Home', param: {} }],
                            });
                          }}
                        >
                          <Text style={{ color: 'white' }}>
                            메인페이지로 돌아가기
                          </Text>
                        </Button>
                      </View>
                    </CenteredView>
                  </Modal>
                </CenteredView>
              </>
            )}
          </View>
        </Content>
      </Container>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  modalView: {
    width: '90%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default ClassRentApplication;
