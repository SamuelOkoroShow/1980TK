import React, {useState, useEffect} from 'react'
import { View, Text, Image, FlatList, ScrollView, TouchableOpacity } from 'react-native'
import police from './characters/police'
import { connect } from 'react-redux';
import gun from './images/pistol1.png'
import { AntDesign } from '@expo/vector-icons';

const ENEMIES_BLOCK = 300;
const ENEMEY_SIZE = ENEMIES_BLOCK/3
const ENEMY_HP = 40;
const ENEMY_HEIGHT = (ENEMIES_BLOCK/2.1) - ENEMY_HP
let distance = Math.floor(Math.random() * 100) + 1
// var enemies = [
//     {
//         name: "Police Man",
//         health: 100,
//         maxHealth: 100,
//         img: police_man
//     }
// ]
const numColumns = 3;
function Battle(props) {
    const [enemies, setEnemies] = useState([{...police[0], hp:100},{...police[1], hp:100},{...police[0], hp:100},{...police[1], hp:100} ])
    const [battle_dialog, setBattle_dialog] = useState(["You encountered a police party"])

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
        return(<TouchableOpacity style={{width:ENEMEY_SIZE, height:ENEMY_HEIGHT}}>
            <Image source = {item.item.image} resizeMode="stretch" style={{flex:1, width:null, height:null, opacity:0.9}} />

            <HP hp={item.item.hp} maxHp={item.item.maxHp} />
        </TouchableOpacity>)
    }
    
    // useEffect(() => {
    //     //generate_enemies;
    //     var generated
    //     generated = Math.floor(Math.random() * 6) + 1
    //   console.log(generated)
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

        const hit_check = (accuracy,level) => {
            var chances = Math.floor(Math.random() * 100) + 1;
            var attempt = accuracy + (level/20)
            if((chances-attempt) > 0){
                return {dialog: "You hit ", hit: true}
            }else{
                return {dialog:'You missed ', hit:false}
            }
        }
        
        const onAttack = () => {
            var fired = "You don't have a weapon."
            var hit = "You didn't hit anything."
            var dead = ""


            if(props.game.player.hand.gun){
            fired = 'You fired your ' + props.game.player.hand.gun.name + "." + enemies.length
            setBattle_dialog(battle_dialog => [...battle_dialog, fired])
            
                if(enemies[0].hp > 20){
                var check_for_hit = hit_check(props.game.player.hand.gun.accuracy, props.game.player.shooting);
                    if(check_for_hit.hit){
                        hit = check_for_hit.dialog + enemies[2].name 
                        //Next line sets the Battle Dialog Box
                        setBattle_dialog(battle_dialog => [...battle_dialog, hit])
                        enemies[2].hp = enemies[2].hp - props.game.player.hand.gun.damage;
                }else{
                    hit = check_for_hit.dialog + enemies[0].name 
                    //Next line sets the Battle Dialog Box
                    setBattle_dialog(battle_dialog => [...battle_dialog, hit])
                }
            }else{
                    enemies[2].hp = enemies[0].hp - props.game.player.hand.gun.damage;
                    dead = enemies[2].name + " is dead"
                    enemies[2].dead = "true"
                    setBattle_dialog(battle_dialog => [...battle_dialog, dead])
            }
        }
            
            
        }
        const Actions = () => {
            return(<View style={{flex:1, backgroundColor:'#333'}}>
                <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                <TouchableOpacity onPress = {onAttack} style={{flex:1,flexDirection:'row', justifyContent:'space-between', padding:10, borderRightWidth:1, borderColor:'#555', alignItems:'center'}}>
                    <Image source = {gun} resizeMode="contain" style={{width:40, marginRight:10, height:40}} />
                    <Text style={{color:'#fff'}}>Attack</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flex:1,flexDirection:'row', justifyContent:'space-between', padding:10, borderRightWidth:1, borderColor:'#555', alignItems:'center'}}>
                    <AntDesign name={'doubleright'} size={40} color="#fff" />
                    <Text style={{color:'#fff', textAlign:'center'}}>Move{"\n"}Towards</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection:'row', padding:10, justifyContent:'space-between', flex:1, borderRightWidth:1, borderColor:'#555', alignItems:'center'}}>
                    <AntDesign name={'doubleleft'} size={40} color="#fff" />
                    <Text style={{color:'#fff', textAlign:'center'}}>Move{"\n"}Away</Text>
                </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                <TouchableOpacity style={{flexDirection:'row', backgroundColor:'tomato', padding:10, justifyContent:'center', flex:1, borderRightWidth:1, borderColor:'#555', alignItems:'center'}}>
                    <AntDesign name={'team'} size={40} color="#fff" />
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
        {battle_dialog.map((dialog, index) => {return(<Text key = {index.toString()} style={{color:'#dff', fontSize:13, padding:5}}>{dialog}</Text>)})}
            </Dialog>
            <Actions />
        </View>
    )
}
const mapStateToProps = (state) => {
    const { game } = state
    return { game }
  };
  export default connect(mapStateToProps)(Battle);