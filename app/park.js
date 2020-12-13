import React, {useEffect, useState} from 'react'
import { View, Text, FlatList, ScrollView, Image, TouchableOpacity } from 'react-native'
import { Acura, Audi, Aston_Martin, Ambulance, BMW, Camaro, Deawoo, Ford, Harley_Davidson, Honda, Isuzu, Lamborghini, Scooter, Tesla, Truck, Toyota, Kawasaki, Mercedes, Volkswagen} from './cars/index'
var cars_array = [Acura, Audi, Aston_Martin, Ambulance, BMW, Camaro, Deawoo, Ford, Harley_Davidson, Honda, Isuzu, Lamborghini, Scooter, Tesla, Truck, Toyota, Kawasaki, Mercedes, Volkswagen]
import { connect } from 'react-redux';
import {Ionicons } from '@expo/vector-icons';
const CONDITION_BAR = 120;
const CONDITION_COLOR = '#a470fc'
const MAX_CONDITION = 100;
const MAX_SPEED = 100
const SPEED_BAR = 70
const PRICE_COLOR = "#07c05a"


function Park(props) {
    const [cars_parked, setCars_parked] = useState([])
    const [car_selected, set_car_selected] = useState({})
    const getRandomArbitrary = (min, max) => {
        // excludes the max
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function numberWithCommas(x) {
        x = x.toString();
        var pattern = /(-?\d+)(\d{3})/;
        while (pattern.test(x))
            x = x.replace(pattern, "$1,$2");
        return x;
    }

    const Condition = ({condition}) => {
        condition = condition * (CONDITION_BAR-2)/MAX_CONDITION
        return(<View style={{width:CONDITION_BAR, height:7, alignItems:'center', borderRadius:2, paddingHorizontal:1, padding:0, borderWidth:1, borderColor:'#444', flexDirection:'row'}}>
      <View style = {{backgroundColor:CONDITION_COLOR, width:condition, borderRadius:5, height:3}} />
      
    </View>)
    }

const Speed = ({speed}) => {
        speed = speed * (SPEED_BAR-2)/MAX_SPEED
        return(<View style={{width:SPEED_BAR, height:7, alignItems:'center', borderRadius:2, paddingHorizontal:1, padding:0, borderWidth:1, borderColor:'#444', flexDirection:'row'}}>
      <View style = {{backgroundColor:"tomato", width:speed, borderRadius:5, height:3}} />
      
    </View>)
    }
    const Parked = (data) => {
        //console.log(data)
        var condition = getRandomArbitrary(10,100) ;
        var variance = MAX_CONDITION - condition
        var price = condition/MAX_CONDITION * data.price
        price = Math.round(price * 100) / 100
        var speed = condition/MAX_CONDITION * data.top_speed
        speed = Math.round(speed * 100) / 100
        var name = "Regular " +data.name;
        
        if(condition > 40){
            name: "Old " + data.name
        }
        if(condition > 60){
            name: "Current " + data.name
        }
        if(condition > 80){
            name = "New " + data.name
        }
        if(condition <= 40){
            name = "Worn out " + data.name
        }
        


        return(<TouchableOpacity onPress = {() => set_car_selected({name:name, image:data.img, condition:condition, price:price, speed:speed})} style={{height:80, flexDirection:'row', alignItems:'center', padding:5, marginTop:5, marginHorizontal:10, shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.8, borderRadius:5,
        borderColor:'white',
        elevation: 2,
        borderRadius:5,
        borderWidth:2,
        marginBottom:3,
        backgroundColor:'white',
        shadowRadius: 1}}>
            <Image source = {data.img} resizeMode = "contain" style={{width:50, marginHorizontal:8, height:50,}} />
            <View>
            <Text numberOfLines={1} style={{color:'#555', fontWeight:'bold',fontSize:15, width:130 }}>{name}</Text>
            <View><Text style={{fontSize:11, color:'black'}} >Condition</Text>
            <Condition condition={condition} />
            </View>
            
            </View>
            <View style={{flexDirection:'row',flex:1,  justifyContent:'space-around'}}>
                <View style={{}}>
                <Text style={{backgroundColor:PRICE_COLOR, alignSelf:'flex-start', color:'white', borderRadius:5, padding:3, paddingHorizontal:5, fontSize:11 }}> ${numberWithCommas(price)}</Text>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                <Text style={{fontSize:11, color:'#555'}} >Speed  </Text>
                <Speed speed = {speed} />

                </View>
                </View>
            </View>
        </TouchableOpacity>)
    }

    return (
        <View style={{flex:1}}>
            {/* {<FlatList
            data = {cars_array}
            keyExtractor = {(item) => item.name}
            renderItem = {(data) => <Parked {...data} />}
            />} */}
            <View>
        <Text style={{fontSize:20, textAlign:'center',margin:50}}>{props.game.park.name}</Text>
            </View>
            <ScrollView>
            {props.game.park.cars.map((data) => <Parked key={data.name} {...data} />)}
            </ScrollView>
            <TouchableOpacity onPress = {() => props.navigation.navigate('Map')} style={{width:50, height:50, backgroundColor:'tomato', borderRadius:25, justifyContent:'center', alignItems:'center', position:'absolute', left:10, top:10}}>
            <Ionicons name={"ios-close"} size={25} color="#fff" />
            </TouchableOpacity>
            {(car_selected.name)?<View style={{height:70, alignItems:'center', justifyContent:'space-between', flexDirection:'row', backgroundColor:'white'}}>
                <View style={{alignItems:'center', flexDirection:'row'}}>
                    <Image source= {car_selected.image} style={{width:50, height:50}} resizeMode="contain" />
                        <View style={{justifyContent:'space-between', height:40}}>
                            <Text>{car_selected.name}</Text>
                            <Condition condition = {car_selected.condition} />
                            <Speed speed = {car_selected.speed} />
                        </View>
                </View>
                <TouchableOpacity style={{backgroundColor:PRICE_COLOR, marginRight:10, padding :10, borderRadius:2}}>
                            <Text style={{color:'white',fontSize:11, }}>STEAL!</Text>
                        </TouchableOpacity>
            </View>:null}
        </View>)
}
const mapStateToProps = (state) => {
    const { game } = state
    return { game }
  };
  
  export default connect(mapStateToProps)(Park);