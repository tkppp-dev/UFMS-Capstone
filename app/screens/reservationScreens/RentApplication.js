import React, { useLayoutEffect, useEffect, useState, useContext } from 'react';
import { ScrollView, View, Text, Alert } from 'react-native';
import styled from 'styled-components';
import Picker from '../../src/components/Picker';
import CustomInput from '../../src/components/CustomInput';
import { Provider, Portal } from 'react-native-paper';
import { Context } from '../../src/context/index';
import { endPoint } from '../../src/endPoint';
import RentalCompleteModal from '../../src/components/modal/RentalCompleteModal';
import axios from 'axios';

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
  width: 24%;
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

const getDateString = function (dt) {
  const year = dt.getFullYear();
  let month = dt.getMonth() + 1;
  let day = dt.getDate();

  if (month < 10) {
    month = `0${month}`;
  }
  if (day < 10) {
    day = `0${day}`;
  }

  return `${year}-${month}-${day}`;
};

const RentApplication = function ({ navigation, route }) {
  const { state } = useContext(Context);
  const dt = new Date();
  const after10dayDate = new Date(
    dt.getFullYear(),
    dt.getMonth(),
    dt.getDate() + 10
  );
  const [year, setYear] = useState(after10dayDate.getFullYear());
  const [month, setMonth] = useState(after10dayDate.getMonth() + 1);
  const [day, setDay] = useState(after10dayDate.getDate());
  const [period, setPeriod] = useState(1);
  const [showApplication, setShowApplication] = useState(false);
  const [rentalPerson, setRentalPerson] = useState('');
  const [group, setGroup] = useState('');
  const [purpose, setPurpose] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [dayList, setDayList] = useState(
    getDayList(year, month).map((el) => ({
      label: `${el}`,
      value: el,
    }))
  );

  const yearList = [
    { label: `${dt.getFullYear()}`, value: dt.getFullYear() },
    { label: `${dt.getFullYear() + 1}`, value: dt.getFullYear() + 1 },
  ];

  const monthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((el) => ({
    label: `${el}`,
    value: el,
  }));

  const periodList = [1, 2, 3, 4, 5, 6, 7].map((el) => ({
    label: `${el}일`,
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
      title: '대관 신청',
    });
  });

  const isAfter10Days = function () {
    const offset = new Date(year, month - 1, day) - dt;
    if (offset > 0 && offset / (1000 * 60 * 60 * 24) > 9) {
      return true;
    } else {
      return false;
    }
  };

  const checkInputValidation = function () {
    if (rentalPerson.length === 0) {
      return false;
    }
    if (group.length === 0) {
      return false;
    }
    if (purpose.length === 0) {
      return false;
    }
    if (email.length === 0) {
      return false;
    }
    if (phoneNumber.length === 0) {
      return false;
    }

    return true;
  };

  const isAlreayRented = async function () {
    try {
      const params = {
        facilityName: route.params.facility,
        rentalDay: period,
        startDate: getDateString(new Date(year, month - 1, day)),
      };
      const res = await axios.post(endPoint + 'rental/availability', params);
      if (res.data === '대관 신청이 가능합니다.') {
        return false;
      } else {
        return true;
      }
    } catch (err) {
      console.error(err);
      Alert.alert('예상치 못한 에러로 정보를 불러오지 못했습니다');
    }
  };

  const _onPressSearchButton = async function () {
    if (!isAfter10Days()) {
      Alert.alert('대관은 선택한 예약일로부터 10일 전부터 신청 가능합니다');
    } else if (await isAlreayRented()) {
      Alert.alert('선택한 날짜는 대관이 불가합니다.');
      setShowApplication(false);
    } else {
      Alert.alert(
        '선택한 날짜는 대관이 가능합니다. 신청서를 작성하시겠습니까?',
        '',
        [
          { text: '아니오', style: 'cancel' },
          { text: '예', onPress: () => setShowApplication(true) },
        ],
        { cancelable: false }
      );
    }
  };

  const _onPressSubmitButton = function () {
    if (checkInputValidation()) {
      setModalVisible(true);
    } else {
      Alert.alert('신청 내용을 모두 작성해주세요');
    }
  };

  const _onPressApplyButton = async function () {
    try {
      const params = {
        memberId: state.user.id,
        facility: route.params.facility,
        purpose,
        hirer: rentalPerson,
        group,
        rentalDays: period,
        additionalMobile: phoneNumber,
        additionalEmail: email,
        startDate: getDateString(new Date(year, month - 1, day))
      };

      const res = await axios.post(endPoint + 'rental/r', params);
      if (res.status === 200) {
        Alert.alert('대관 신청에 성공하였습니다')
        setModalVisible(false)
        navigation.reset({
          routes: [{ name: 'Home', param: {} }],
        });
      } else {
        throw new Error();
      }
    } catch (err) {
      Alert.alert('예기치 못한 문제로 대관 신청에 실패했습니다');
      console.error(err);
    }
  };

  return (
    <Provider>
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
            <PickerContainer>
              <Picker
                label="기간"
                items={periodList}
                value={period}
                onValueChange={(value) => setPeriod(value)}
              />
            </PickerContainer>
          </DatePicker>
          <Content>
            <Button onPress={_onPressSearchButton}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>조회</Text>
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
                  <CustomInput label="대관자" onChangeText={setRentalPerson} />
                  <CustomInput label="대관 주체" onChangeText={setGroup} />
                  <CustomInput
                    label="대관 목적"
                    onChangeText={setPurpose}
                    multiline={true}
                    type="textarea"
                  />
                  <CustomInput
                    label="연락처"
                    onChangeText={setPhoneNumber}
                    notice="'-' 제외하고 입력"
                  />
                  <CustomInput label="이메일" onChangeText={setEmail} />
                  <Button onPress={_onPressSubmitButton}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>
                      대관 신청
                    </Text>
                  </Button>
                  <Portal>
                    <RentalCompleteModal
                      visible={modalVisible}
                      onDismiss={() => setModalVisible(false)}
                      facility={route.params.facility}
                      cost={route.params.cost}
                      rentalDay={period}
                      date={{ year, month, day }}
                      onPressApply={_onPressApplyButton}
                    />
                  </Portal>
                </>
              )}
            </View>
          </Content>
        </Container>
      </ScrollView>
    </Provider>
  );
};

export default RentApplication;
