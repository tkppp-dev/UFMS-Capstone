import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { View, Text, Alert } from 'react-native';
import axios from 'axios';
import { Context } from '../context';
import { endPoint } from '../endPoint';

const Container = styled.View`
  width: 100%;
  padding: 15px 15px 10px 15px;
  background-color: white;
  margin-bottom: 8px;
  border-bottom-width: 1px;
  border-bottom-color: #d6dde4;
`;

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const TitleText = styled.Text`
  font-weight: bold;
`;

const CustomButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  align-self: flex-end;
  margin-top: 5px;
  border-radius: 4px;
  width: 50px;
  height: 33px;
`;

const AddButton = styled(CustomButton)`
  background-color: #007aff;
`;
const DeleteButton = styled(CustomButton)`
  background-color: red;
`;

const SubjectItem = function ({ title, body }) {
  return (
    <RowContainer style={{ flex: 1, marginBottom: 5 }}>
      <View style={{ flex: 1 }}>
        <TitleText>{title}</TitleText>
      </View>
      <View style={{ flex: 3 }}>
        <Text>{body}</Text>
      </View>
    </RowContainer>
  );
};

const SubjectInfo = function ({
  subjectData,
  type = 'inquire',
  setRefresh,
  onDismiss,
}) {
  const { state } = useContext(Context);

  useEffect(() => {
    console.log(subjectData);
  }, []);

  const _onPressAddButton = async function () {
    try {
      const res = await axios.post(endPoint + 'schedule/add', {
        memberId: state.user.id,
        subjectId: subjectData.id,
      });
      console.log(res.data)
      if (res.data.subjectId !== null) {
        setRefresh(true);
        onDismiss(false);
      } else {
        if (res.data.memberId === 300) {
          Alert.alert('이미 등록한 과목입니다');
        } else if (res.data.memberId === 400) {
          Alert.alert('등록한 스케줄과 시간이 중복되어 등록할 수 없습니다');
        } else {
          Alert.alert('과목 추가 실패');
        }
      }
    } catch (err) {
      console.error(err);
      Alert.alert('예상치 못한 오류로 과목 추가를 완료하지 못했습니다');
    }
  };

  const _onPressDeleteButton = async function () {
    try {
      const params = {
        scheduleId : subjectData.scheduleId
      };
      console.log(params);
      const res = await axios.post(endPoint + 'schedule/delete', params);

      // 성공 여부 확인 필요
      setRefresh(true);
    } catch (err) {
      console.error(err);
      Alert.alert('예상치 못한 오류로 과목 삭제를 완료하지 못했습니다');
    }
  };
  return (
    <>
      <Container>
        <RowContainer>
          <SubjectItem title="교수" body={subjectData.professor} />
          <SubjectItem title="학과" body={subjectData.major} />
        </RowContainer>
        <RowContainer>
          <SubjectItem title="타입" body={subjectData.completionType} />
          <SubjectItem title="과목명" body={subjectData.subjectName} />
        </RowContainer>
        <RowContainer>
          <SubjectItem title="위치" body={subjectData.room} />
          <SubjectItem title="시간" body={subjectData.lectureDate} />
        </RowContainer>
        {type === 'search' ? (
          <AddButton onPress={_onPressAddButton}>
            <Text style={{ fontWeight: 'bold', color: 'white' }}>추가</Text>
          </AddButton>
        ) : (
          <DeleteButton onPress={_onPressDeleteButton}>
            <Text style={{ fontWeight: 'bold', color: 'white' }}>삭제</Text>
          </DeleteButton>
        )}
      </Container>
    </>
  );
};

export default SubjectInfo;
