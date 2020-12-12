import React, {useEffect, useState} from 'react'
import { View, Text, FlatList, ScrollView, Image, TouchableOpacity } from 'react-native'
import { Acura, Audi, Aston_Martin, Ambulance, BMW, Camaro, Deawoo, Ford, Harley_Davidson, Honda, Isuzu, Lamborghini, Scooter, Tesla, Truck, Toyota, Kawasaki, Mercedes, Volkswagen} from './cars/index'
var cars_array = [Acura, Audi, Aston_Martin, Ambulance, BMW, Camaro, Deawoo, Ford, Harley_Davidson, Honda, Isuzu, Lamborghini, Scooter, Tesla, Truck, Toyota, Kawasaki, Mercedes, Volkswagen]
import { connect } from 'react-redux';
import {Ionicons } from '@expo/vector-icons';

function Park(props) {
    const [cars_parked, setCars_parked] = useState([])
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

    const Parked = (data) => {
        //console.log(data)

        return(<View style={{height:80, flexDirection:'row', alignItems:'center', padding:5, marginTop:5, marginHorizontal:10, shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.8, borderRadius:5,
        borderColor:'white',
        elevation: 3,
        borderRadius:5,
        borderWidth:2,
        marginBottom:3,
        backgroundColor:'white',
        shadowRadius: 1}}>
            <Image source = {data.img} resizeMode = "contain" style={{width:50, marginHorizontal:8, height:50,}} />
            <View>
            <Text style={{color:'#555', fontWeight:'100'}}>{data.name}</Text>
            <Text>Top Speed is {data.top_speed}.</Text>
            </View>
            <View style={{flexDirection:'row',flex:1,  justifyContent:'space-around'}}>
                <Text style={{backgroundColor:"#333", color:'#ddd', borderRadius:5, padding:5, fontSize:10 }}> ${numberWithCommas(data.price)}</Text>
            </View>
        </View>)
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
        </View>)
}
const mapStateToProps = (state) => {
    const { game } = state
    return { game }
  };
  
  export default connect(mapStateToProps)(Park);