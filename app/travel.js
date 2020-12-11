import React, { useState } from 'react'
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native'
import { travel, skipDay } from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import locations from './locations/index'
import img from './images/travel.png'
import { Ionicons } from '@expo/vector-icons';

function Travel(props) {
    const [dayTrip, setDayTrip] = useState(0)
    const [city_name, setCity_name] = useState(props.game.city.name)
    const [city, setNewCity] = useState(null)

    const setCity = (val) => {
        setCity_name(val.name)
        setDayTrip(2)
        setNewCity(val)
    }
    const EachButton = (data) => {
        //console.log(data)
        if(props.game.city.name != data.item.name){
        return (
            <TouchableOpacity onPress = {() => setCity(data.item)} style={{width:"80%", backgroundColor:'#ffd', height:50, borderRadius:3, borderWidth:1, borderColor:'tomato', alignSelf:'center', alignItems:'center', justifyContent:'center', margin:10}}>
                <Text>{data.item.name}</Text>
            </TouchableOpacity>
        )}else{
            return (
                <View style={{width:"80%", backgroundColor:'tomato', height:50, borderRadius:3, borderWidth:1, borderColor:'tomato', alignSelf:'center', alignItems:'center', justifyContent:'center', margin:10}}>
                    <Text style={{color:'white'}}>{data.item.name}</Text>
                </View>
            )
        }
    }
    return (
        <View style={{flex:1}}>
            <Image source={img} resizeMode="cover" style={{width:"100%", height:200}} />
            <FlatList
            data = {locations}
            renderItem={(data) => <EachButton {...data} />}
            keyExtractor={(item) => item.name}
            style={{flex:1, marginTop:-40}}
            />
            <View style={{height:70, backgroundColor:'#ddd', alignItems:'center', justifyContent:'space-between', flexDirection:'row'}}>
            <View style={{width:"45%", marginLeft:5}}>
                    <Text style={{fontWeight:'bold'}}>Day: {props.game.day}</Text>
                        {(dayTrip != 0)?<Text>{city_name} is {dayTrip} days away</Text>:null}
                    </View>
                {(city)?<TouchableOpacity onPress = {() => props.travel({city:city, days:dayTrip})} style={{alignSelf:'center', margin:5, width:"50%", height:50, alignItems:'center', justifyContent:'center', backgroundColor:'green'}}>
                    <Text style={{color:'white'}}>TRAVEL</Text>
                </TouchableOpacity>:null}
            </View>
            <TouchableOpacity onPress = {() => props.navigation.navigate('Map')} style={{width:50, height:50, backgroundColor:'tomato', borderRadius:25, justifyContent:'center', alignItems:'center', position:'absolute', left:10, top:10}}>
            <Ionicons name={"ios-close"} size={25} color="#fff" />
            </TouchableOpacity>
        </View>
    )
}

const mapStateToProps = (state) => {
    const { game } = state
    return { game }
  };
  const mapDispatchToProps = dispatch => (
    bindActionCreators({
       travel, skipDay
    }, dispatch)
  );
  
  export default connect(mapStateToProps, mapDispatchToProps)(Travel);