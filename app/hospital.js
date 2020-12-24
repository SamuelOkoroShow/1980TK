import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { healHP, recoverHP, skipDay } from '../actions'
import hosp from './images/hospital.png'
import { ScrollView } from 'react-native-gesture-handler'
//import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const HP_SIZE = 120
const PRICE_COLOR = "#07c05a"
var healing = []

const hospital = (props) => {
    const [party, set_party] = useState([{...props.game.player, selected:false}]);
    const [run, set_run] = useState(false)
    const [healing_cost, set_healing_cost] = useState(0)
    
    
    function setPartyProps(){
        set_run(true)
        var newParty2 = [...party];
        if(props.game.party.length > 0){
            for(var i = 0; i< props.game.party.length; i++){
            console.log(i)
            newParty2[i+1] = {...props.game.party[i], selected:false} 
            //newParty2.push(props.game.party[i])
            //console.log(newParty.length)
            set_party(newParty2)
                }
            }
        }
        setTimeout(() => { if(!run){ setPartyProps();} }, 300);

 
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
      <View style={{height:4, width:health-2, backgroundColor:healthColor, borderRadius:5}} />
      </View>)
  }

    const toggle = (data) => {

        var newParty = [...party];
        healing.push(data)
        set_healing_cost(healing_cost+375)
        //console.log(data)
        newParty[data] = {...newParty[data], selected:true}
        //console.log(newParty)
        set_party(newParty)
        

    }
    const untoggle = (data) => {

        var newParty = [...party];
        //console.log(party[data].selected)
        var removeIndex = healing.map(item => item)
                       .indexOf(data);
        // There's a weird hiccup in Zero and 10.
        set_healing_cost(healing_cost-375)

        healing.splice(removeIndex, 1);
        newParty[data] = {...newParty[data], selected:false}
        //console.log(newParty)
        set_party(newParty)
        //console.log(party[data].selected)

    }
    const getRandomArbitrary = (min, max) => {
        // excludes the max
        return Math.floor(Math.random() * (max - min)) + min;
    }

    const heal = () => {
        if(healing.length > 0){
        var recover = getRandomArbitrary(15,30);
        if(props.game.money - healing_cost >= 0){
            // charge money
            for(var i = 0; i<healing.length; i++){
                var j = healing[i]
            props.healHP({recover:recover, charge: 375, id:j})
            var newParty = [...party]
            if(newParty[j].hp + recover > newParty[j].maxHp){
                newParty[j].hp = newParty[j].maxHp
            }else{
            newParty[j].hp = newParty[j].hp + recover
            }
            
        }    
        set_party(newParty)
        console.log(run)
    }
        console.log(props.game.party[1].hp)
        props.skipDay('day')}
    }

    function numberWithCommas(x) {
        x = x.toString();
        var pattern = /(-?\d+)(\d{3})/;
        while (pattern.test(x))
            x = x.replace(pattern, "$1,$2");
        return x;
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
                <FlatList 
                data = {party}
                style = {{marginTop:-10, flex:1 }}
                keyExtractor={(item, index) => item.name}
                extraData = {party}
                renderItem = {(data,index) => <Party data = {data} />}
            />
            <View style={{backgroundColor:'white', height:120, width:"100%", justifyContent:'space-between', alignItems:'center',flexDirection:'row' }}>
                <ScrollView
                    contentContainerStyle = {{backgroundColor:'white', width:"100%", justifyContent:'space-between', alignItems:'center',flexDirection:'row' }}
                >
                <View style={{justifyContent:'space-between'}}>
                    <View>
                    <Text> Medical bill: $ {healing_cost}</Text>
                    <Text> Day : # <Text style={{fontWeight:'bold'}}>{props.game.day}</Text></Text>
                    <Text> <Text style={{backgroundColor:"tomato", color:'white', padding:5}}>Money :</Text> $ {numberWithCommas(props.game.money)}</Text>
                    </View>
                    <View style={{marginLeft:15}}>
                        {healing.map((data) => <Text key={data} style={{backgroundColor:PRICE_COLOR, marginTop:0, borderRadius:2, padding:2, color:'white',}}>{(data != 0)?props.game.party[data-1].name.toString(): props.game.player.name.toString()}</Text>)}
                    </View>
                </View>
                <TouchableOpacity onPress={heal} style={{backgroundColor:PRICE_COLOR, marginRight:10, borderRadius:3, height:50, alignItems:'center', justifyContent:'center', padding:10}}>
                    <Text style={{color:'white'}}>HEAL</Text>
                </TouchableOpacity>
                </ScrollView>
            </View>
            <TouchableOpacity onPress = {() => props.navigation.navigate('Map')} style={{width:50, height:50, backgroundColor:'tomato', borderRadius:25, justifyContent:'center', alignItems:'center', position:'absolute', left:10, top:10}}>
            <Ionicons name={"ios-close"} size={25} color="#fff" />
            </TouchableOpacity>
            </View>)
}

const mapStateToProps = (state) => {
    const { game } = state
    return { game }
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        skipDay, healHP, recoverHP
     }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(hospital)
