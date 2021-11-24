import React from 'react';
import styled from 'styled-components';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import InformationItem from './InformationItem';
import { Icon } from 'react-native-elements';

const Container = styled.View`
  width: ${({ width }) => width - 40}px;
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

const ButtonGroup = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-top: 10px;
  border-width: 1px;
  border-color: gray;
  border-radius: 6px;
`;

const ButtonGroupItem = styled.TouchableOpacity`
  flex: 1;
  padding: 10px 0 10px 0;
  background-color: #f7f9fa;
`;

const LeftButtonGroupItem = styled(ButtonGroupItem)`
  border-end-width: 1px;
  border-color: gray;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
`;

const RigthButtonGroupItem = styled(ButtonGroupItem)`
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
`;

const OfficeInformation = function ({
  officeData,
  showOfficeStatusModal,
  showOfficeNoticeModal,
}) {
  const width = Dimensions.get('window').width;
  return (
    <Container width={width}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 10
        }}
      >
        <Icon type="antdesign" name="left" size={18} />
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>율곡관 501호</Text>
        </View>
        <Icon type="antdesign" name="right" size={18} />
      </View>

      <InformationItem title="상태" body={officeData.status} />
      <InformationItem title="공지사항" body={officeData.notice} />
      <ButtonGroup>
        <LeftButtonGroupItem onPress={showOfficeStatusModal}>
          <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
            사용 상태 변경
          </Text>
        </LeftButtonGroupItem>
        <RigthButtonGroupItem onPress={showOfficeNoticeModal}>
          <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
            공지사항 변경
          </Text>
        </RigthButtonGroupItem>
      </ButtonGroup>
    </Container>
  );
};

export default OfficeInformation;
