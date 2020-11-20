import React, {useState, useEffect} from 'react'
import { View, Text, Image, FlatList, ScrollView, TouchableOpacity } from 'react-native'
import police from './characters/police'
import gun from './images/pistol1.png'

const battle_dialog = ["You encountered a police party"]
const ENEMIES_BLOCK = 300;
const ENEMEY_SIZE = ENEMIES_BLOCK/3
const ENEMY_HP = 40;
const ENEMY_HEIGHT = ENEMIES_BLOCK/2 - ENEMY_HP
// var enemies = [
//     {
//         name: "Police Man",
//         health: 100,
//         maxHealth: 100,
//         img: police_man
//     }
// ]
const numColumns = 3;
export default function Battle() {
    const [enemies, setEnemies] = useState([police[0],police[1]])

    const Enemies_block = (props) => {
        return(<View style={{alignSelf:"flex-end", borderLeftWidth:1, borderColor:'#555', alignItems:'center', width:ENEMIES_BLOCK, height: ENEMIES_BLOCK-100, backgroundColor:'#333'}}>
            {props.children}
        </View>)
    }

    const HP = ({ hp, maxHp }) => {
		var health = (hp/maxHp) * ENEMEY_SIZE 
		var healthColor
      //custom health colors
      if (health < (ENEMEY_SIZE/4)){
        healthColor = "#f96062"
      }else if(health > (ENEMEY_SIZE/5.1) && health < (ENEMEY_SIZE/2.1)){
        healthColor = "#fbd34e"
      } else{
        healthColor = "#b7eb9b"
      }
      return(<View style={{height:6, width:ENEMEY_SIZE, borderColor:'#c7c7c7', borderWidth:1}}>
      <View style={{height:5, width:health, backgroundColor:healthColor, borderRadius:5}} />
      </View>)
  }

    const Enemies = ({item}) => {
        console.log(item)
        return(<TouchableOpacity style={{width:ENEMEY_SIZE, height:ENEMIES_BLOCK/2}}>
            <Image source = {item.item.image} resizeMode="contain" style={{width:ENEMEY_SIZE, height:100}} />

            <HP hp={item.item.maxHp} maxHp={item.item.maxHp} />
        </TouchableOpacity>)
    }
    
    // useEffect(() => {
    //     //generate_enemies;
    //     var generated
    //     generated = Math.floor(Math.random() * 6) + 1
    //     console.log(generated)
    //     var police_units = []
    //     for (i = 0; i <= generated; i++){
    //         console.log("Setting Enemies")
    //         police_units.push(police[0])
            
    //     }
    //     setEnemies(police_units)
    //     console.log('Enemies Set')
    //     })

        const Dialog = (props) =>{
            return(<View style={{flex:3, padding:20, backgroundColor:'#222'}}>
                <ScrollView>
                {props.children}
                </ScrollView>
            </View>)
            }
        const Actions = () => {
            return(<View style={{flex:1, backgroundColor:'#333'}}>
                <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                <TouchableOpacity style={{flex:1,flexDirection:'row', justifyContent:'space-between', padding:10, borderRightWidth:1, borderColor:'#555', alignItems:'center'}}>
                    <Image source = {gun} resizeMode="contain" style={{width:40, marginRight:10, height:40}} />
                    <Text style={{color:'#fff'}}>Attack</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flex:1,flexDirection:'row', justifyContent:'space-between', padding:10, borderRightWidth:1, borderColor:'#555', alignItems:'center'}}>
                    <Image source = {gun} resizeMode="contain" style={{width:40, marginRight:10, height:40}} />
                    <Text style={{color:'#fff', textAlign:'center'}}>Move{"\n"}Towards</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection:'row', padding:10, justifyContent:'space-between', flex:1, borderRightWidth:1, borderColor:'#555', alignItems:'center'}}>
                    <Image source = {gun} resizeMode="contain" style={{width:40, marginRight:10, height:40}} />
                    <Text style={{color:'#fff', textAlign:'center'}}>Move{"\n"}Away</Text>
                </TouchableOpacity>
                </View>
            </View>)
        }
    return (
        <View style={{flex:1, backgroundColor:'#333'}}>
            <Enemies_block >
           <FlatList 
                data = {enemies}
                renderItem = {(item) => <Enemies item = {item} />}
                numColumns = {3}
                keyExtractor={(item, index) => index.toString()}
            /></Enemies_block>
            <Dialog>
        {battle_dialog.map((dialog) => {return(<Text style={{color:'#dff', fontSize:12}}>{dialog}</Text>)})}
            </Dialog>
            <Actions />
        </View>
    )
}
