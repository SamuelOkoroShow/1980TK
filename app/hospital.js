import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { healHP, recoverHP } from '../actions'
import hosp from './images/hospital.png'
//import { useFocusEffect } from '@react-navigation/native';

const HP_SIZE = 120
const PRICE_COLOR = "#07c05a"
var run;

const hospital = (props) => {
    const [party, set_party] = useState([{...props.game.player, selected:true}]);

    function setPartyProps(){
        run = true
        var newParty2 = [...party];
        if(props.game.party.length > 0){
            for(var i = 0; i< props.game.party.length; i++){
            console.log(i)
            newParty2[i+1] = {...props.game.party[i], selected:true} 
            //newParty2.push(props.game.party[i])
            //console.log(newParty.length)
            set_party(newParty2)
                }
            }
        }
        setTimeout(() => { if(!run){ setPartyProps();} }, 300);


    
    console.log("About to use e")
 
    var newParty = [...party]

    const HP = ({ hp, maxHp }) => {
		var health = (hp/maxHp) * HP_SIZE 
		var healthColor
      //custom health colors
      if (health < (HP_SIZE/4)){
        healthColor = "#f96062"
      }else if(health > (HP_SIZE/5.1) && health < (HP_SIZE/2.1)){
        healthColor = "#fbd34e"
      } else{
        healthColor = "#b7eb9b"
      }
      return(<View style={{height:6, width:HP_SIZE, borderColor:'#667', borderWidth:1}}>
      <View style={{height:4, width:health, backgroundColor:healthColor, borderRadius:5}} />
      </View>)
  }

    const toggle = (data) => {

        var newParty = [...party];
        
        //console.log(data)
        newParty[data] = {...newParty[data], selected:true}
        //console.log(newParty)
        set_party(newParty)
        

    }
    const untoggle = (data) => {

        var newParty = [...party];
        //console.log(party[data].selected)
        newParty[data] = {...newParty[data], selected:false}
        //console.log(newParty)
        set_party(newParty)
        //console.log(party[data].selected)

    }

    const Party = (data) =>{
        //console.log(data)
        const {name, img, hp, maxHp} = data.data.item
        if (!data.data.item.selected) {
    return(<TouchableOpacity onPress = {() => toggle(data.data.index)} style={{height:80, flexDirection:'row', alignItems:'center', padding:5, marginTop:5, marginHorizontal:10, shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.8, borderRadius:5,
    borderColor:'white',
    elevation: 2,
    borderRadius:5,
    borderWidth:2,
    marginBottom:3,
    backgroundColor:'white',
    shadowRadius: 1}}>
        <Image source = {img} resizeMode = "contain" style={{width:50, marginHorizontal:8, height:50,}} />
        <View>
        <Text style={{color:'#555', fontWeight:'bold',fontSize:15, width:130 }}>{name}</Text>
        <View><Text style={{fontSize:11, color:'black'}} >Health</Text>
        <HP hp={hp} maxHp={maxHp} />
        </View>
        
        </View>
        <View style={{flexDirection:'row',flex:1,  justifyContent:'space-around'}}>
            <View style={{}}>
            <Text style={{backgroundColor:PRICE_COLOR, alignSelf:'flex-start', color:'white', borderRadius:5, padding:3, paddingHorizontal:5, fontSize:11 }}>Movement Speed</Text>
            <View style={{flexDirection:'row', alignItems:'center'}}>
            <Text style={{fontSize:11, color:'#555'}} >Level  </Text>
            </View>
            </View>
        </View>
    </TouchableOpacity>)}else{
        return(<TouchableOpacity onPress = {() => untoggle(data.data.index)} style={{height:80, flexDirection:'row', alignItems:'center', padding:5, marginTop:5, marginHorizontal:10, shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.8, borderRadius:5,
        borderColor:'white',
        elevation: 2,
        borderRadius:5,
        borderWidth:2,
        marginBottom:3,
        backgroundColor:PRICE_COLOR,
        shadowRadius: 1}}>
            <Image source = {img} resizeMode = "contain" style={{width:50, marginHorizontal:8, height:50,}} />
            <View>
            <Text numberOfLines={1} style={{color:'#555', fontWeight:'bold',fontSize:15, width:130 }}>{name}</Text>
            <View><Text style={{fontSize:11, color:'black'}} >Health</Text>
            <HP hp={hp} maxHp={maxHp} />
            </View>
            
            </View>
            <View style={{flexDirection:'row',flex:1,  justifyContent:'space-around'}}>
                <View style={{}}>
                <Text style={{backgroundColor:"white", alignSelf:'flex-start', color:PRICE_COLOR, borderRadius:5, padding:3, paddingHorizontal:5, fontSize:11 }}>Movement Speed</Text>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                <Text style={{fontSize:11, color:'#555'}} >Level  </Text>
                </View>
                </View>
            </View>
        </TouchableOpacity>)
    }
    }
        return (
            <View style={{flex:1}}>
                <Image source = {hosp} resizeMode="cover" style={{width:'100%', height:120}}/>
                {//party.map((data,index) => <Party index = {index} key = {data.name} {...data} />)
                }
                <FlatList 
                data = {party}
                style = {{marginTop:-10, flex:1 }}
                keyExtractor={(item, index) => item.name}
                extraData = {party}
                renderItem = {(data,index) => <Party data = {data} />}
            />
            <Text>{party[0].selected.toString()}</Text>
            <View style={{backgroundColor:'white', height:70, width:"100%", alignItems:'center',flexDirection:'row' }}>
                <TouchableOpacity style={{backgroundColor:PRICE_COLOR, height:50, alignItems:'center', justifyContent:'center', padding:10}}>
                    <Text style={{color:'white'}}>HEAL</Text>
                </TouchableOpacity>
            </View>
            </View>)
}

const mapStateToProps = (state) => {
    const { game } = state
    return { game }
}

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps)(hospital)
