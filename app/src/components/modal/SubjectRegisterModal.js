import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components/native';
import { ScrollView, Text, View, StyleSheet, Alert } from 'react-native';
import RNPicker from 'react-native-picker-select';
import { Modal } from 'react-native-paper';
import SubjectInfo from '../SubjectInfo';
import { endPoint } from '../../endPoint';
import axios from 'axios';

const Input = styled.TextInput.attrs((props) => {
  return {
    autoCapitalize: 'none',
    autoCorrect: false,
    returnKeyType: 'done',
  };
})`
  flex: 1;
  height: 38px;
  padding: 10px;
  border: 1px;
  border-color: #d6dde4;
  border-radius: 4px;
  background-color: white;
`;

const SearchButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  margin-start: 10px;
  border-radius: 4px;
  width: 50px;
  height: 38px;
  background-color: #007aff;
`;

const SubjectRegisterModal = function ({ visible, onDismiss, setRefresh }) {
  const [searchType, setSearchType] = useState('professor');
  const [input, setInput] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  const _onPressSearch = async function () {
    if (searchType === 'professor' || searchType === 'subject') {
      try {
        const res = await axios.post(endPoint + 'schedule/subject', {
          searchData: input,
          type: searchType,
        });
        console.log(res.data);
        setSearchResult(res.data);
      } catch (err) {
        console.error(err);
        Alert.alert('정보 로딩에 실패했습니다');
      }
    } else {
      Alert.alert('검색 타입을 선택해주세요');
    }
  };

  return (
    <Modal
      visible={visible}
      onDismiss={onDismiss}
      contentContainerStyle={{
        width: '90%',
        backgroundColor: 'white',
        paddingVertical: 20,
        paddingHorizontal: 10,
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
          과목 추가
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <RNPicker
            style={pickerStyles}
            placeholder={{
              label: '선택',
              value: null,
              color: 'gray',
            }}
            onValueChange={(value) => setSearchType(value)}
            items={[
              { label: '교수명', value: 'professor' },
              { label: '과목명', value: 'subject' },
            ]}
            value={searchType}
          />
          <Input value={input} onChangeText={(value) => setInput(value)} />
          <SearchButton onPress={_onPressSearch}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>검색</Text>
          </SearchButton>
        </View>
        <View style={{ height: 380, marginTop: 10 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {searchResult.map((item, idx) => (
              <SubjectInfo key={idx} subjectData={item} type="search" setRefresh={setRefresh} onDismiss={onDismiss} />
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const pickerStyles = StyleSheet.create({
  inputIOS: {
    width: 70,
    height: 38,
    fontSize: 14,
    textAlign: 'center',
    marginEnd: 10,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#d6dde4',
    borderRadius: 4,
    color: 'black',
  },
  inputAndroid: {
    width: 70,
    height: 38,
    fontSize: 14,
    textAlign: 'center',
    marginEnd: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: '#d6dde4',
    borderRadius: 4,
    color: 'black',
  },
});

export default SubjectRegisterModal;
