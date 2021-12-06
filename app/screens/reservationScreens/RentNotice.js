import React, { useEffect, useLayoutEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Alert, Dimensions, Image, ScrollView, Text, View } from 'react-native';
import InformationItem from '../../src/components/InformationItem';
import axios from 'axios';
import { endPoint } from '../../src/endPoint';
import { rentalImg } from '../../src/images';

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
  const facility = route.params.facilityName;
  const window = Dimensions.get('window');
  const [facilityDetail, setFacilityDetail] = useState({});

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: false,
      headerTitleAlign: 'center',
      title: '대관 유의사항',
    });
  });

  useEffect(() => {
    const getFacilityDetail = async function () {
      try {
        const res = await axios.get(endPoint + `rental/${facility}`);
        if (res.status === 200) {
          setFacilityDetail({
            name: facility,
            purpose: getListStr(['공연', '상연', '특강']),
            location: getLocation({
              name: res.data.building,
              floor: res.data.floor,
            }),
            availableTime: getAvailiableTime(res.data.time),
            maxCapacity: getCapacity(res.data.capacity),
            areaSize: res.data.area,
            facility: getListStr(['음향', '빔', '스크린']),
            cost : res.data.cost,
            etc: res.data.notice,
          });
        } else {
          throw new Error('대관 시설 정보 로딩 실패');
        }
      } catch (err) {
        console.error(err);
        Alert.alert('시설 정보 로딩에 실패했습니다.');
      }
    };
    getFacilityDetail();
  }, []);

  const getLocation = function (location) {
    return `${location.name} ${location.floor}`;
  };

  const getAvailiableTime = function (time) {
    if (time === null) {
      return '문의 필요';
    } else {
      return time;
    }
  };

  const getCapacity = function (maxCapacity) {
    if (maxCapacity === null) {
      return '문의 필요';
    } else {
      return maxCapacity + '명';
    }
  };

  const getListStr = function (info) {
    if (info === null || info.length === 0) {
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
          source={rentalImg[facilityDetail.name]}
        />
        <Content>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
            {facilityDetail.name}
          </Text>
          <View style={{ marginTop: 10, paddingHorizontal: 6 }}>
            <View style={{ flexDirection: 'row' }}>
              <InformationItem
                title="위치"
                body={facilityDetail.location}
                row={true}
              />
              <InformationItem
                title="면적"
                body={facilityDetail.areaSize + '㎡(제곱미터)'}
                row={true}
              />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <InformationItem
                title="수용 인원"
                body={facilityDetail.maxCapacity}
                row={true}
              />
              <InformationItem
                title="사용 가능 시간"
                body={facilityDetail.availableTime}
                row={true}
              />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <InformationItem
                title="사용 용도"
                body={facilityDetail.purpose}
                row={true}
              />
              <InformationItem
                title="기본 시설"
                body={facilityDetail.facility}
                row={true}
              />
            </View>
            <InformationItem
                title="기본 대관료(하루)"
                body={facilityDetail.cost + '원'}
              />
          </View>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 12 }}>
            대관 유의 사항
          </Text>
          <Text style={{ marginTop: 10 }}>
            {`시설 대관은 사용하고자 하는 날 기준으로 10일 전부터 가능하며, 애플리케이션을 통해 신청서를 작성하거나 학생지원관(02-3408-3055)에서 「시설물 사용신청서」를 작성, 점수하여 사용하되 사용허가를 받아야하며 기본 내용 외 조율하고 싶은 부분은 애플리케이션, 또는 담당 부서에 문의하여 협의해야 한다.`}
          </Text>
          <View style={{ alignItems: 'center', marginTop: 15 }}>
            <Button
              onPress={() => {
                navigation.navigate('Rent Application', {
                  facility,
                  cost : facilityDetail.cost
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
