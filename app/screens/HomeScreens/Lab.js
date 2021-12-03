import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { View, Text, ScrollView, Alert } from 'react-native';
import { Context } from '../../src/context/index';
import axios from 'axios';
import { endPoint } from '../../src/endPoint';

const Container = styled.View`
  flex: 1;
  width: 100%;
  background-color: white;
  padding: 0px 20px;
`;

const RowView = styled.View`
  flex-direction: row;
  padding: 10px;
`;
const Title = styled.Text`
  flex: 2;
  font-weight: bold;
  padding: 0px 0px 0px 10px;
`;
const Body = styled.Text`
  flex: 8;
`;

const Input = styled.TextInput.attrs((props) => {
  return {
    placeholder: '교수 이름 검색',
    placeholderTextColor: 'gray',
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
  width: 60px;
  height: 38px;
  background-color: #007aff;
`;

const LabData = function ({ labData }) {
  return (
    <View
      style={{
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#d6dde4',
        marginBottom: 15,
      }}
    >
      <RowView>
        <Title>이름</Title>
        <Body>{labData.name}</Body>
      </RowView>
      <RowView>
        <Title>위치</Title>
        <Body>{labData.location}</Body>
      </RowView>
      <RowView>
        <Title>상태</Title>
        <Body>{labData.state}</Body>
      </RowView>
      <RowView>
        <Title>공지사항</Title>
        <Body>{labData.notice}</Body>
      </RowView>
    </View>
  );
};

const Lab = function ({ navigation }) {
  const [input, setInput] = useState('');
  const [searchData, setSearchData] = useState('');
  const [labInfo, setLabInfo] = useState(null);

  const getLabInformation = async function () {
    try {
      const res = await axios.post(endPoint + 'schedule/lab/professor', {
        professorName: input,
      });
      if (res.status === 200) {
        setSearchData(input);
        await setLabInfo(res.data);
        console.log(labInfo);
      } else {
        throw new Error();
      }
    } catch (err) {
      console.error(err);
      Alert.alert('정보 로드에 실패했습니다');
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <Container>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 15,
          }}
        >
          <Input value={input} onChangeText={(value) => setInput(value)} />
          <SearchButton onPress={() => getLabInformation()}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>검색</Text>
          </SearchButton>
        </View>
        {labInfo === null ? null : (
          <View>
            {labInfo.length === 0 ? (
              <View style={{ marginTop: 4 }}>
                <Text>
                  '{searchData}(교수)'의 연구실 또는 사무실이 존재하지 않습니다
                </Text>
              </View>
            ) : (
              <View>
                {labInfo.map((item, idx) => (
                  <LabData
                    key={idx}
                    labData={item}
                  />
                ))}
              </View>
            )}
          </View>
        )}
      </Container>
    </ScrollView>
  );
};

export default React.memo(Lab);
