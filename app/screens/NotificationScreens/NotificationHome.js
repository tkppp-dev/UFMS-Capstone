import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { Text, View, ScrollView, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import axios from 'axios';
import { endPoint } from '../../src/endPoint';
import { Context } from '../../src/context';

const NotificationInfo = function ({ notification }) {
  const [type, setType] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    switch (notification.type) {
      case 'RentalCOMPLETE':
        setType('대관 승인');
        break;
      case 'ReservationUpdate':
        setType('스케줄 변경');
        break;
      case 'ReservationCancel':
        setType('스케줄 취소');
        break;
      default:
        setType('예외');
        break;
    }

    const dt = notification.reservationTime.split('T');
    setDate(dt[0]);
  }, []);

  return (
    <View
      style={{
        paddingVertical: 15,
        borderBottomColor: '#d6dde4',
        borderBottomWidth: 1,
        backgroundColor: '#FAE0D4',
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ padding: 10, marginHorizontal: 10 }}>
          <Icon type="antdesign" name="message1" size={25} />
        </View>
        <View>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{type}</Text>
          <Text>
            {date} | {notification.reservationName} |
            {notification.notificationDetail}
          </Text>
        </View>
      </View>
    </View>
  );
};

const NotificationHome = function ({ navigation }) {
  const { state } = useContext(Context);
  const [notifications, setNotifications] = useState([]);

  const getNotification = async function () {
    try {
      const res = await axios.get(endPoint + `notification/${state.user.id}`);
      console.log(res.data);
      if (res.status === 200) {
        setNotifications(res.data);
      } else {
        throw new Error();
      }
    } catch (err) {
      console.error(err);
      Alert.alert('정보 로드에 실패했습니다');
    }
  };

  useEffect(() => {
    getNotification();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: '알림',
      headerTitleAlign: 'center',
    });
  });

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
      }}
    >
      {notifications.map((item, idx) => (
        <NotificationInfo key={idx} notification={item} />
      ))}
    </ScrollView>
  );
};

export default NotificationHome;
