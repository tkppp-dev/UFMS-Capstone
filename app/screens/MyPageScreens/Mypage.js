import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import styled from 'styled-components/native';
import {
  Alert,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Portal, Provider } from 'react-native-paper';
import { Icon } from 'react-native-elements';
import { Context } from '../../src/context/index';
import CustomButton from '../../src/components/CustomButton';
import OfficeStatusUpdateModal from '../../src/components/modal/OfficeStatusUpdateModal';
import OfficeNoticeUpdateModal from '../../src/components/modal/OfficeNoticeUpdateModal';
import OfficeInformation from '../../src/components/OfficeInformation';
import ScheduleSummary from '../../src/components/ScheduleSummary';
import axios from 'axios';
import { endPoint } from '../../src/endPoint';

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

const StyledText = styled.Text`
  font-size: ${({ fontSize }) =>
    fontSize !== undefined ? fontSize + 'px' : '16px'};
  font-weight: ${({ fontWeight }) =>
    fontWeight !== undefined ? fontWeight : 'normal'};
  margin-bottom: ${({ marginBottom }) =>
    marginBottom !== undefined ? marginBottom + 'px' : '6px'};
`;

const ProfessorMyPage = function ({ navigation }) {
  const { state, dispatch } = useContext(Context);
  const [previlege, setPrevilege] = useState();
  const [officeList, setOfficeList] = useState([]);
  const [selectedLab, setSelectedLab] = useState(null);
  const [officeStatusModalVisible, setOfficeStatusModalVisible] =
    useState(false);
  const [officeNoticeModalVisible, setOfficeNoticeModalVisible] =
    useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'center',
      title: '마이페이지',
    });
  });

  const getOfficeList = async function () {
    try {
      const res = await axios.post(endPoint + `schedule/lab/professor`, {
        professorName: state.user.username,
      });
      const temp = [];
      res.data.map((office, index) => {
        temp.push({
          officeData: office,
          isFirst: false,
          isEnd: false,
          key: index,
        });
      });
      if (temp.length > 0) {
        temp[0].isFirst = true;
        temp[temp.length - 1].isEnd = true;
        await setOfficeList(temp);
      }
    } catch (err) {
      console.error(err);
      Alert.alert('정보 로드에 실패했습니다');
    }
  };

  const getPrevilege = async function () {
    try {
      const res = await axios.get(endPoint + `api/auth/user/${state.user.id}`);
      setPrevilege(res.data.data.privileges);
    } catch (err) {
      console.error(err);
      Alert.alert('정보 로드에 실패했습니다');
    }
  };

  useEffect(() => {
    getPrevilege();
    getOfficeList();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('Refreshed!');
      getOfficeList();
    });
    return unsubscribe;
  }, [navigation]);

  const _onPressOfficeStatus = async function (value) {
    try {
      const res = await axios.put(
        endPoint + `schedule/lab/state/${selectedLab}`,
        { state: value }
      );
      if (res.status !== 200) {
        throw new Error();
      } else {
        getOfficeList();
      }
    } catch (err) {
      console.error(err);
      Alert.alert('상태 변경에 실패했습니다');
    }
  };

  const _onPressOfficeNotice = async function (value) {
    try {
      const res = await axios.put(
        endPoint + `schedule/lab/notice/${selectedLab}`,
        { notice: value }
      );
      if (res.status !== 200) {
        throw new Error();
      } else {
        getOfficeList();
      }
    } catch (err) {
      console.error(err);
      Alert.alert('공지사항 변경에 실패했습니다');
    }
  };

  const _onPressLogout = async function () {
    try {
      await axios.post(endPoint + 'api/auth/logout', {
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
                  {state.user.username}
                </StyledText>
                <StyledText fontSize="17" marginBottom={6}>
                  {state.user.email}
                </StyledText>
                <StyledText fontSize="17">{previlege}</StyledText>
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
          {previlege !== 'GUEST' ? (
            <ContentContainer>
              <ContentTopColorRow />
              <TouchableOpacity onPress={() => navigation.navigate('Schedule')}>
                <Content style={{ flexDirection: 'row' }}>
                  <StyledText
                    style={{ flex: 1 }}
                    fontSize="20"
                    fontWeight="bold"
                  >
                    전체 스케줄 조회
                  </StyledText>
                  <Icon type="material" name="navigate-next" />
                </Content>
              </TouchableOpacity>
            </ContentContainer>
          ) : null}
          <ContentContainer>
            <ContentTopColorRow />
            <ScheduleSummary userId={state.user.id} />
          </ContentContainer>
          {previlege === 'PROFESSOR' ? (
            <ContentContainer>
              <ContentTopColorRow />
              <Content>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Lab Management')}
                >
                  <ContentTitle style={{ flexDirection: 'row' }}>
                    <StyledText
                      style={{ flex: 1 }}
                      fontSize="20"
                      fontWeight="bold"
                    >
                      나의 사무실 / 연구실 관리
                    </StyledText>
                    <Icon type="material" name="navigate-next" />
                  </ContentTitle>
                </TouchableOpacity>
                <FlatList
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  pagingEnabled={true}
                  keyExtractor={(item, index) => index.toString()}
                  data={officeList}
                  renderItem={({ item, index }) => (
                    <OfficeInformation
                      key={item.key}
                      item={item}
                      setSelectedLab={setSelectedLab}
                      showOfficeStatusModal={() =>
                        setOfficeStatusModalVisible(true)
                      }
                      showOfficeNoticeModal={() =>
                        setOfficeNoticeModalVisible(true)
                      }
                    />
                  )}
                />
              </Content>
            </ContentContainer>
          ) : null}
          {previlege === 'STUDENT' ? (
            <ContentContainer>
              <ContentTopColorRow />
              <TouchableOpacity
                onPress={() => navigation.navigate('Schedule Register')}
              >
                <Content style={{ flexDirection: 'row' }}>
                  <StyledText
                    style={{ flex: 1 }}
                    fontSize="20"
                    fontWeight="bold"
                  >
                    스케줄 등록 관리
                  </StyledText>
                  <Icon type="material" name="navigate-next" />
                </Content>
              </TouchableOpacity>
            </ContentContainer>
          ) : null}
          <ContentContainer>
            <ContentTopColorRow />
            <TouchableOpacity
              onPress={() => navigation.navigate('Rental Management')}
            >
              <Content style={{ flexDirection: 'row' }}>
                <StyledText style={{ flex: 1 }} fontSize="20" fontWeight="bold">
                  대관 예약 관리
                </StyledText>
                <Icon type="material" name="navigate-next" />
              </Content>
            </TouchableOpacity>
          </ContentContainer>
        </Container>
        <Portal>
          <OfficeStatusUpdateModal
            visible={officeStatusModalVisible}
            onDismiss={() => setOfficeStatusModalVisible(false)}
            onPressUpdate={_onPressOfficeStatus}
          />
        </Portal>
        <Portal>
          <OfficeNoticeUpdateModal
            visible={officeNoticeModalVisible}
            onDismiss={() => setOfficeNoticeModalVisible(false)}
            onPressUpdate={_onPressOfficeNotice}
          />
        </Portal>
      </ScrollView>
    </Provider>
  );
};

export default ProfessorMyPage;
