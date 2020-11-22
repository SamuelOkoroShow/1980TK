import React, {useState, useEffect, useRef} from 'react'
import { View, Text, Image, FlatList, ScrollView, Dimensions, TouchableOpacity } from 'react-native'
import police from './characters/police'
import { connect } from 'react-redux';
import gun from './images/pistol1.png'
import { AntDesign } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;
const ENEMIES_BLOCK = 300;
const ENEMEY_SIZE = ENEMIES_BLOCK/3
const ENEMY_HP = 40;
const ENEMY_HEIGHT = (ENEMIES_BLOCK/2.1) - ENEMY_HP
let distanceLoad = Math.floor(Math.random() * 80) + 20
const numColumns = 3;
const BASIC = '#ddd'
const RED = "#f96062"
const GREEN = "#b7eb9b"

function Battle(props) {
    const [enemies, setEnemies] = useState([{...police[0], hp:100},{...police[1], hp:100},{...police[0], hp:100},{...police[1], hp:100} ])
    const [battle_dialog, setBattle_dialog] = useState([{dialog:"You encountered a police party", color:BASIC}])
    const [distance, setDistance] = useState(distanceLoad)
    const [gotAway, setGotaway] = useState(false)
    const scrollView = useRef(null)

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
      return(<View style={{height:6, width:ENEMEY_SIZE, borderColor:'#667', borderWidth:1}}>
      <View style={{height:5, width:health, backgroundColor:healthColor, borderRadius:5}} />
      </View>)
  }

    const Enemies = ({item}) => {
        //console.log(item)
        if(item.item.dead){
            return(<TouchableOpacity style={{width:ENEMEY_SIZE, height:ENEMY_HEIGHT, backgroundColor:RED}}>
                <Image source = {item.item.image} resizeMode="stretch" style={{flex:1, width:null, height:null, opacity:0.5}} />
    
                <HP hp={item.item.hp} maxHp={item.item.maxHp} />
            </TouchableOpacity>)
        }else{return(<TouchableOpacity style={{width:ENEMEY_SIZE, height:ENEMY_HEIGHT}}>
            <Image source = {item.item.image} resizeMode="stretch" style={{flex:1, margin:2, width:null, height:null, opacity:1}} />

            <HP hp={item.item.hp} maxHp={item.item.maxHp} />
        </TouchableOpacity>)}
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
                <ScrollView
                ref = {scrollView}
                onContentSizeChange={() => scrollView.current.scrollToEnd({animated: true})}
                >
                {props.children}
                </ScrollView>
            </View>)
     }

    const getRandomArbitrary = (min, max) => {
        // excludes the max
        return Math.floor(Math.random() * (max - min)) + min;
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
        
    const targeting = () => {
        var target = getRandomArbitrary(0,enemies.length)
        return target
    }

    const onAttack = () => {
        var fired = "You don't have a weapon."
        var hit = "You didn't hit anything."
        var dead = "Enemy died"
        var target = targeting()

        console.log(target)
        if(props.game.player.hand.gun){
            fired = {
                dialog:'You fired your ' + props.game.player.hand.gun.name + "." + enemies.length,
                color: BASIC
            }
            setBattle_dialog(battle_dialog => [...battle_dialog, fired])
            var check_for_hit = hit_check(props.game.player.hand.gun.accuracy, props.game.player.shooting);

                if(enemies[target].hp > 20){
                    if(check_for_hit.hit){
                        hit = {
                            dialog: check_for_hit.dialog + enemies[target].name,
                            color:GREEN
                        } 
                        //Next line sets the Battle Dialog Box
                        setBattle_dialog(battle_dialog => [...battle_dialog, hit])
                        enemies[target].hp = enemies[target].hp - props.game.player.hand.gun.damage;
                }else{
                    hit = {
                        dialog:check_for_hit.dialog + enemies[target].name,
                        color:RED
                    }
                    //Next line sets the Battle Dialog Box
                    setBattle_dialog(battle_dialog => [...battle_dialog, hit])
                }
            }else{

                if(check_for_hit.hit){
                    hit = {
                        dialog: check_for_hit.dialog + enemies[target].name,
                        color:GREEN
                    } 
                    //Next line sets the Battle Dialog Box
                    setBattle_dialog(battle_dialog => [...battle_dialog, hit])
                    enemies[target].hp = 0;
                    dead = {
                        dialog:enemies[target].name + " is dead",
                        color: GREEN
                    }
                    
                    enemies[target].dead = true
                    enemies.splice(target,1)
                    setBattle_dialog(battle_dialog => [...battle_dialog, dead])
                    var enemies_left = {
                        dialog: 'There are ' + enemies.length + " enemy(s) left",
                        color: GREEN
                    }
                    setBattle_dialog(battle_dialog => [...battle_dialog, enemies_left])
                }else{
                    hit = {
                        dialog:check_for_hit.dialog + enemies[target].name,
                        color:RED
                }
                //Next line sets the Battle Dialog Box
                setBattle_dialog(battle_dialog => [...battle_dialog, hit])
            }
                   
                    
            }
        }
            
            
        }

    const Actions = () => {
            return(<View style={{flex:1, backgroundColor:'#333'}}>
                <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                <TouchableOpacity onPress={() => moveAway(props.game.player.speed)} style={{flexDirection:'row', padding:10, justifyContent:'space-between', flex:1, borderRightWidth:1, borderColor:'#555', alignItems:'center'}}>
                    <AntDesign name={'doubleleft'} size={30} color="#fff" />
                    <Text style={{color:'#fff', textAlign:'center'}}>Move{"\n"}Away</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress = {onAttack} style={{flex:1,flexDirection:'row', justifyContent:'space-between', padding:10, borderRightWidth:1, borderColor:'#555', alignItems:'center'}}>
                    <Image source = {gun} resizeMode="contain" style={{width:40, marginRight:10, height:40}} />
                    <Text style={{color:'#fff'}}>Attack</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => moveTowards(props.game.player.speed)} style={{flex:1,flexDirection:'row', justifyContent:'space-between', padding:10, borderRightWidth:1, borderColor:'#555', alignItems:'center'}}>
                    <AntDesign name={'doubleright'} size={30} color="#fff" />
                    <Text style={{color:'#fff', textAlign:'center'}}>Move{"\n"}Towards</Text>
                </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                    <TouchableOpacity style={{flexDirection:'row', backgroundColor:'tomato', padding:10, justifyContent:'center', flex:1, borderRightWidth:1, borderColor:'#555', alignItems:'center'}}>
                        <AntDesign name={'team'} size={40} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>)
        }
    const moveTowards = (raw_speed) => {
        var speed = raw_speed - getRandomArbitrary(0,20)
        if ((distance+speed)>100) {
            setDistance(100)
            var disclose = {dialog: "You're at maximum closeness", color: GREEN}
            setBattle_dialog(battle_dialog => [...battle_dialog, disclose])
        }else{
            var disclose = {dialog: "You move closer", color: BASIC}
            setBattle_dialog(battle_dialog => [...battle_dialog, disclose])
        setDistance(distance+speed)
        }
    }

    const moveAway = (raw_speed) => {
        var speed = raw_speed - getRandomArbitrary(0,20)
        if ((distance-speed)<0) {
            setDistance(0)
            var disclose = {dialog: "You got away.", color: GREEN}
            setGotaway(true)
            setBattle_dialog(battle_dialog => [...battle_dialog, disclose])

        }else{
            var disclose = {dialog: "You try to flee.", color: BASIC}
            setBattle_dialog(battle_dialog => [...battle_dialog, disclose])
            setDistance(distance-speed)
        }
    }
    const DistanceTab = () => {
        var length = (distance/100) * windowWidth;
        return(<View style={{width:windowWidth-2, height:6, borderWidth:1, borderColor:'#eee', justifyContent:'center'}}>
            <View style={{height:4, width:length, backgroundColor:'#eee'}} />
        </View>)
    }
    const Ai_turn = () =>{
        if(!Ai_turn.dead){
            if(distance > 50){
                moveTowards();
            }
        }
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
        {battle_dialog.map((dialog, index) => {return(<Text key = {index.toString()} style={{color:dialog.color, fontSize:13, padding:5}}>{dialog.dialog}</Text>)})}
            </Dialog>
            <DistanceTab />
            <Actions />
        </View>
    )
}
const mapStateToProps = (state) => {
    const { game } = state
    return { game }
  };
  export default connect(mapStateToProps)(Battle);