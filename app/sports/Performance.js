import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {windowHeight, windowWidth} from '../utils/Dimensions';
import TopNavbar from '../components/TopNavbar';
import { act } from 'react-test-renderer';


export default function Performance() {
    const [active, setActive] = useState("technical")

const check_active = (value) => {
    if(value == active){
        return {backgroundColor:'#e35540', text_color:'#fff6f4'}
    }else{
        return {backgroundColor:'#fff9f8', text_color:'#000'}
    }
}

const Coach_request = () => {
    return(<View style={styles.coach_request}>
        <View style={{backgroundColor:check_active('technical').backgroundColor, padding:20, justifyContent:'center', alignItems:'center'}}>
            <Text style={{color:check_active('technical').text_color}}>Technical</Text>
        </View>
    </View>)
}
  return (
    <View style={styles.container}>
      <TopNavbar onPress={() => navigation.openDrawer()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f5f5f1',
  },
  coach_request:{
    flexDirection:'row',
    alignItems:'center',
    height:60
  }
});
