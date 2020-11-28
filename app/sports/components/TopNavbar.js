import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {windowHeight, windowWidth} from '../utils/Dimensions';
import BackButton from './BackButton';
import bell from '../assets/bell.png';
import setting from '../assets/setting.png';
import menu from '../assets/menu.png';

export default function TopNavbar({navigation, onPress, back, home}) {
  const onGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.top}>
      {back ? <BackButton onPress={onGoBack} /> : <></>}
      {home ? (
        <>
          <TouchableOpacity style={styles.menuStyle} onPress={onPress}>
            <Image source={menu} style={styles.menuImageStyle} />
          </TouchableOpacity>
          <Image source={bell} style={styles.bellStyle} />
          <Image source={setting} style={styles.settingStyle} />
        </>
      ) : (
        <></>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  top: {
    backgroundColor: '#E35540',
    height: windowHeight * 0.1157,
    width: windowWidth,
    flexDirection: 'row',
  },
  menuStyle: {
    marginTop: windowHeight * 0.066,
    marginLeft: windowWidth * 0.056,
    height: windowHeight * 0.0323,
    width: windowWidth * 0.0706,
  },
  menuImageStyle: {
    resizeMode: 'contain',
  },
  bellStyle: {
    marginTop: windowHeight * 0.063,
    marginLeft: windowWidth * 0.632,
    height: windowHeight * 0.0443,
    width: windowWidth * 0.0906,
    resizeMode: 'contain',
  },
  settingStyle: {
    marginTop: windowHeight * 0.0677,
    marginLeft: windowWidth * 0.016,
    height: windowHeight * 0.0357,
    width: windowWidth * 0.0826,
    resizeMode: 'contain',
  },
});
