import React,{useState, useRef} from 'react'
import { View, Text, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { travel, skipDay } from '../actions';
const BASIC = '#333'
const RED = "#f96062"
const GREEN = "#b7eb9b"
const CITY_HEAT_COLOR = "#b90000"
const HEAT_COLOR = "#ed832e"
const HEAT_BAR = 80;
const maxHeat = 100;
const MAX_DISTANCE = 100
var reinforcements1 = false;
var reinforcements2 = false
var city_level = 0

const Steal = (props) => {
    const opening_dialog = {
        dialog : "You encounter a "+props.game.stealing.name + ".",
        color: BASIC
    }
    const activity1 = [{...props.game.stealing}, {}, {}]
    const activity2 = [{}, {}, {}]
    const activity3 = [{}, {}, {}]
    const activity4 = [{}, {}, {}]
    const activity5 = [{}, {}, {}]
    const activity6 = [{}, {}, {}]
    const distanceLoad = Math.floor(Math.random() * 25) + 75
    const [car_activity, set_car_activity] = useState([""])
    const scrollView = useRef(null)
    const [stealing_dialog, set_stealing_dialog] = useState([opening_dialog])
    const [steal_action, set_steal_action] = useState("Break In")
    const [city_heat, set_city_heat] = useState(props.game.city_heat.puerto_vallarta)
    const [distance, set_distance] = useState(distanceLoad)

    const Dialog_box = (props) => {
        return(<View style={{height:400, padding:10, backgroundColor:'#ddd'}}><ScrollView
            ref = {scrollView}
            onContentSizeChange={() => scrollView.current.scrollToEnd({animated: false})}
            >
            {props.children}
            </ScrollView></View>)
    }
    const Car = (data) => {
        console.log(data)
        const {image, name, condition} = data

        return(<View style={{width:'100%', marginLeft:5,marginTop:5, height:70, width:70,}}>
            <View style={{ borderColor:'#777', borderRadius:3, borderWidth:1, height:65, width:65}}>
            {(image != null)?<Image source = {image} resizeMode ="contain" style={{width:65, height:65}} />:null}
            </View>
        </View>)
    }
    const Heat_bar = () => {
        //var city_heat
        var heat_width = props.game.heat
        
    
        if(props.game.city.name == "Puerto Vallarta"){
            //set_city_heat((props.game.city_heat.puerto_vallarta/maxHeat) * HEAT_BAR)
            city_level = (props.game.city_heat.puerto_vallarta/maxHeat) * HEAT_BAR
        }
        if(props.game.city.name == "Puerto Escondido"){
            //set_city_heat((props.game.city_heat.puerto_escondido/maxHeat) * HEAT_BAR)
            city_level = (props.game.city_heat.puerto_escondido/maxHeat) * HEAT_BAR
        }
        if(props.game.city.name == "Oaxaca City"){
            //set_city_heat((props.game.city_heat.oaxaca_city/maxHeat) * HEAT_BAR)
            city_level = (props.game.city_heat.oaxaca_city/maxHeat) * HEAT_BAR
        }
        if(props.game.city.name == "Ciudad Carmen"){
            //set_city_heat((props.game.city_heat.ciudad_carmen/maxHeat) * HEAT_BAR)
            city_level = (props.game.city_heat.ciudad_carmen/maxHeat) * HEAT_BAR
        }
        if(props.game.city.name == "Tabasco"){
            //set_city_heat((props.game.city_heat.tabasco/maxHeat) * HEAT_BAR)
            city_level = (props.game.city_heat.tabasco/maxHeat) * HEAT_BAR
        }
        
        var heatz = (props.game.heat/maxHeat) * HEAT_BAR
    
        if((props.game.heat + (city_heat-2)) > maxHeat){
            heatz = (maxHeat - (city_heat*maxHeat/HEAT_BAR)) - 2
            
        }
    
        return(<View style={{width:HEAT_BAR, height:5, alignItems:'center', padding:0, borderWidth:1, borderColor:'#444', flexDirection:'row'}}>
          <View style = {{backgroundColor:CITY_HEAT_COLOR, width:city_level, height:3}} />
          <View style = {{backgroundColor:HEAT_COLOR, width:heatz, borderRadius:5, height:3}} />
        </View>)
    }
    const getRandomArbitrary = (min, max) => {
        // excludes the max
        return Math.floor(Math.random() * (max - min)) + min;
    }

    const Steal_Action = () => {
        if(steal_action == "Break In"){
            //check items
            var hasHammer = false

        }
    }

    const Distance = () => {
        var per_distance = distance/MAX_DISTANCE * 100
        per_distance = per_distance +"%"
        return(<View style={{width:'100%', height:4, justifyContent:'center', backgroundColor:'#bbb', borderWidth:1, borderColor:'#666'}}>
            <View style={{width:per_distance, height:3, backgroundColor:'#fff'}} />
        </View>)
    }
    const Actions = () => {
        return(<View style={{}}>
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', padding:3}}>
                <TouchableOpacity style={{width:'32%', borderWidth:1, borderRadius:3, borderColor:'#ccc', height:50, alignItems:'center', justifyContent:'center'}}>
                    <Text>{steal_action}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{width:'32%', borderWidth:1, borderRadius:3, borderColor:'#ccc', height:50, alignItems:'center', justifyContent:'center'}}>
                    <Text>Grab Valuables</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{width:'32%', borderWidth:1, borderRadius:3, borderColor:'#ccc', height:50, alignItems:'center', justifyContent:'center'}}>
                    <Text>Run Away</Text>
                </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                <TouchableOpacity style={{width:'33%', borderWidth:1, borderColor:'#ccc', height:50, alignItems:'center', justifyContent:'center'}}>
                    <Text>Attack</Text>
                </TouchableOpacity>
                <View style={{width:'33%', borderWidth:0, borderColor:'#ccc', height:50, alignItems:'center', justifyContent:'center'}}>
                    <Text>Heat</Text>
                    <Heat_bar />
                </View>
                <TouchableOpacity style={{width:'33%', borderWidth:1, borderColor:'#ccc', height:50, alignItems:'center', justifyContent:'center'}}>
                    <Text>Equip</Text>
                </TouchableOpacity>
            </View>
        </View>)
    }
    return (
        <View>
            <ScrollView
                horizontal
            >
            <View>
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                    {activity1.map((data, index) => <Car key = {index+1} {...data} />)}
                </View>
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                    {activity2.map((data, index) => <Car key = {index+1} {...data} />)}
                </View>
            </View>
            <View style={{height:'100%', width:1, backgroundColor:'#333', marginHorizontal:5}} />
            {(reinforcements1)?<View>
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                    {activity3.map((data, index) => <Car key = {index+1} {...data} />)}
                </View>
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                    {activity4.map((data, index) => <Car key = {index+1} {...data} />)}
                </View>
            </View>:null}
            {(reinforcements2)?<View>
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                    {activity3.map((data, index) => <Car key = {index+1} {...data} />)}
                </View>
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                    {activity4.map((data, index) => <Car key = {index+1} {...data} />)}
                </View>
            </View>:null}
            </ScrollView>
            <Dialog_box>
            {stealing_dialog.map((dialog, index) => {return(<Text key = {index.toString()} style={{color:dialog.color, fontSize:13, padding:5}}>{dialog.dialog}</Text>)})}
            </Dialog_box>
            <Distance />
            <Actions />
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
  
export default connect(mapStateToProps,mapDispatchToProps)(Steal)
