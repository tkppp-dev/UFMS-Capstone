import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Alert, ScrollView, Text, View } from 'react-native';
import { Portal, Provider } from 'react-native-paper';
import { Context } from '../../src/context/index';
import CustomButton from '../../src/components/CustomButton';
import ScheduleItem from '../../src/components/ScheduleItem';
import axios from 'axios';

const Container = styled.View`
  flex: 1;
  align-items: center;
  width: 100%;
`;

const ContentContainer = styled.View`
  width: 100%;
`;

const Content = styled.View`
  width: 100%;
  margin-bottom: 12px;
  padding: 20px;
  background-color: white;
`;

const ContentTopColorRow = styled.View`
  background-color: #a33b39;
  width: 100%;
  height: 12px;
`;

const ContentTitle = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: gray;
  margin-bottom: 8px;
  padding: 0 4px 8px 4px;
`;

const ContentBody = styled.View`
  padding: 0 4px 0 4px;
  margin: 8px 0 8px 0;
`;

const StyledText = styled.Text`
  font-size: ${({ fontSize }) =>
    fontSize !== undefined ? fontSize + 'px' : '16px'};
  font-weight: ${({ fontWeight }) =>
    fontWeight !== undefined ? fontWeight : 'normal'};
  margin-bottom: ${({ marginBottom }) =>
    marginBottom !== undefined ? marginBottom + 'px' : '6px'};
`;

const ProfessorMyPage = function ( { navigation }) {
  const { state, dispatch } = useContext(Context);
  const [currentSchedule, setCurrentSchedule] = useState({});
  const [currentScheduleStatus, setCurrentScheduleStatus] = useState('수업중');

  const _onPressLogout = async function () {
    try {
      await axios.post('http://127.0.0.1:8080/api/auth/logout', {
        accessToken: state.user.accessToken,
        refreshToken: state.user.refreshToken,
      });
      dispatch({ type: 'LOGOUT' });
    } catch (err) {
      Alert.alert('예상치 못한 에러로 로그아웃에 실패했습니다');
      console.log(err);
    }
  };

  return (
    <Provider>
      <ScrollView>
        <Container>
          <ContentContainer>
            <ContentTopColorRow />
            <Content style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1, paddingHorizontal: 4 }}>
                <StyledText fontSize="22" fontWeight="bold" marginBottom={6}>
                  박태경
                </StyledText>
                <StyledText fontSize="17" marginBottom={6}>
                  17011510
                </StyledText>
                <StyledText fontSize="17">컴퓨터공학과</StyledText>
              </View>
              <View style={{ width: 80, justifyContent: 'center' }}>
                <CustomButton
                  label="로그아웃"
                  color="red"
                  onPress={_onPressLogout}
                />
              </View>
            </Content>
          </ContentContainer>
          <ContentContainer>
            <ContentTopColorRow />
            <Content>
              <ContentTitle>
                <StyledText fontSize="20" fontWeight="bold">
                  현재 스케줄
                </StyledText>
              </ContentTitle>
              <ContentBody>
                {currentSchedule === null ? (
                  <View style={{ marginTop: 8, marginBottom: 16 }}>
                    <Text style={{ fontSize: 15 }}>현재 스케줄이 없습니다</Text>
                  </View>
                ) : (
                  <View style={{ marginBottom: 8 }}>
                    <ScheduleItem
                      title="스케줄 이름"
                      body="컴퓨터공학 캡스톤디자인 2반"
                    />
                    <ScheduleItem title="위치" body="율곡관 301호" />
                    <View style={{ flexDirection: 'row' }}>
                      <ScheduleItem
                        title="시간"
                        body="12:00~13:30"
                        row={true}
                      />
                      <ScheduleItem title="상태" body={currentScheduleStatus} row={true} />
                    </View>
                  </View>
                )}
              </ContentBody>
              <ContentTitle>
                <StyledText fontSize="20" fontWeight="bold">
                  다음 스케줄
                </StyledText>
              </ContentTitle>
              <ContentBody>
                <ScheduleItem
                  title="스케줄 이름"
                  body="컴퓨터공학 캡스톤디자인 2반"
                />
                <ScheduleItem title="위치" body="율곡관 301호" />
                <View style={{ flexDirection: 'row' }}>
                  <ScheduleItem title="시간" body="13:30~15:00" row={true} />
                  <ScheduleItem title="상태" body="수업 대기중" row={true} />
                </View>
              </ContentBody>
              <CustomButton
                label="스케줄 관리하기"
                color={'#f7f9fa'}
                fontColor={'black'}
                border={true}
                onPress={() => navigation.navigate('Schedule')}
              />
            </Content>
          </ContentContainer>
        </Container>
      </ScrollView>
    </Provider>
  );
};

export default ProfessorMyPage;
