import React, { useLayoutEffect } from 'react';
import styled from 'styled-components/native';
import { Dimensions, Image, ScrollView, Text, View } from 'react-native';
import PlacePicker from '../../src/components/PlacePicker';
import InformationItem from '../../src/components/InformationItem';

const Container = styled.View`
  width: 100%;
  align-items: center;
`;

const Content = styled.View`
  width: 89%;
`;

const Button = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px;
  border-radius: 4px;
  background-color: #007aff;
`;

const RentNotice = function ({ navigation, route }) {
  const facility = route.params.facilityData;
  const window = Dimensions.get('window');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: false,
      headerTitleAlign: 'center',
      title: '대관 유의사항',
    });
  });

  const _getLocation = function () {
    const location = facility.location;
    let str = `${location.name}`;
    if (location.floor !== null) {
      if (location.floor > 0) {
        str += ` ${location.floor}층`;
      } else {
        str += ` 지하 ${location.floor * -1}층`;
      }
    }
    return str;
  };

  const _getAvailiableTime = function () {
    let str = '';
    facility.availableTime.map((time) => {
      str += `${time.name} ${time.start}~${time.end}\n`;
    });
    return str.slice(0, -1);
  };

  const _getCapacity = function () {
    if (facility.maxCapacity === null) {
      return '문의 필요';
    } else {
      return facility.maxCapacity + '명';
    }
  };

  const _getListStr = function (info) {
    if (info.length === 0) {
      return '문의 필요';
    } else {
      let str = '';
      info.map((el) => {
        str += `${el}, `;
      });
      return str.slice(0, -2);
    }
  };

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <Container>
        <Image
          style={{
            marginVertical: 20,
            width: window.width * 0.9,
            height: window.height * 0.25,
          }}
          source={require('../../assets/dummy-image.jpeg')}
        />
        <Content>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
            {facility.name}
          </Text>
          <View style={{ marginTop: 10, paddingHorizontal: 6 }}>
            <View style={{ flexDirection: 'row' }}>
              <InformationItem title="위치" body={_getLocation()} row={true} />
              <InformationItem
                title="면적"
                body={facility.areaSize + '㎡(제곱미터)'}
                row={true}
              />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <InformationItem
                title="수용 인원"
                body={_getCapacity()}
                row={true}
              />
              <InformationItem
                title="사용 가능 시간"
                body={_getAvailiableTime()}
                row={true}
              />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <InformationItem
                title="사용 용도"
                body={_getListStr(facility.activityType)}
                row={true}
              />
              <InformationItem
                title="기본 시설"
                body={_getListStr(facility.facility)}
                row={true}
              />
            </View>
          </View>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 12 }}>
            대관 유의 사항
          </Text>
          <Text style={{ marginTop: 10 }}>
            {`시설 대관은 사용하고자 하는 날 기준으로 10일 전부터 가능하며, 애플리케이션을 통해 신청서를 작성하거나 학생지원관(02-3408-3055)에서 「시설물 사용신청서」를 작성, 점수하여 사용하되 사용허가를 받아야하며 기본 내용 외 조율하고 싶은 부분은 애플리케이션, 또는 담당 부서에 문의하여 협의해야 한다.`}
          </Text>
          {facility.etc.length === 0 ? null : (
            <View>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 20 }}>
                기타
              </Text>
              <Text style={{ marginTop: 10 }}>
                {(function () {
                  let str = '';
                  facility.etc.map((etc) => {
                    str += etc + '\n';
                  });
                  return str.slice(0, -1);
                })()}
              </Text>
            </View>
          )}
          <View style={{ alignItems: 'center', marginTop: 15 }}>
            <Button
              onPress={() => {
                navigation.navigate('Rent Application', {
                  facility,
                });
              }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>
                대관 신청
              </Text>
            </Button>
          </View>
        </Content>
      </Container>
    </ScrollView>
  );
};

export default RentNotice;
