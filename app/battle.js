import React, {useState, useEffect, useRef} from 'react'
import { View, Text, Image, FlatList, ScrollView, Dimensions, TouchableOpacity } from 'react-native'
import police from './characters/police'
import { connect } from 'react-redux';
import gun from './images/pistol1.png'
import { Ionicons } from '@expo/vector-icons';
import { shootPlayer, shootParty } from '../actions';
import { bindActionCreators } from 'redux';
import { Audio } from 'expo-av';
import source from './sounds/gun.mp3'

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
    const [viewActions, setViewActions] = useState(true)
    const scrollView = useRef(null)

    const Enemies_block = (props) => {
        return(<View style={{alignSelf:"flex-end", borderLeftWidth:1, borderColor:'#555', alignItems:'center', width:ENEMIES_BLOCK, paddingVertical:5, backgroundColor:'#333', alignSelf:'center'}}>
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
        return(<View style={{flex:3, height:400, padding:20, backgroundColor:'#222'}}>
                <ScrollView
                ref = {scrollView}
                onContentSizeChange={() => scrollView.current.scrollToEnd({animated: false})}
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
                return {dialog: "The bullet injured ", hit: true}
            }else{
                return {dialog:'The bullet missed ', hit:false}
            }
        }
        
    const targeting = () => {
        var target = getRandomArbitrary(0,enemies.length)
        return target
    }

    const onAttack = async (player, index) => {
        
       // console.log(props)
        var fired = player.name + " doesn't have a weapon."
        var hit = player.name + " didn't hit anything."
        var dead = "Enemy died"
        var target = targeting()
        if(gotAway){
            this.navigation.navigate('Map')
        }
        //console.log(target)
        if(props.game.player.hand.gun.name != null){
            var delay = index * 1500
            setTimeout(function(){ _playShot(); }, delay);
            fired = {
                dialog:player.name + ' fired a ' + props.game.player.hand.gun.name + ".",
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
                    if(enemies.length < 1){
                        setGotaway(true)
                        var got_away = {
                            dialog: "You got away",
                            color: GREEN
                        }
                        setBattle_dialog(battle_dialog => [...battle_dialog, gotAway])
                    }
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
       // console.log("Queue AI")
    //Ai_turn();        
            
    }

    const Actions = () => {
            return(<View style={{flex:1, backgroundColor:'#333'}}>
                <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                <TouchableOpacity onPress={queueMoveAway} style={{flexDirection:'row', padding:10, justifyContent:'space-between', flex:1, borderRightWidth:1, borderColor:'#555', alignItems:'center'}}>
                    <Ionicons name={'ios-skip-backward'} size={30} color="#fff" />
                    <Text style={{color:'#fff', textAlign:'center'}}>Move{"\n"}Away</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress = {group_attack} style={{flex:1,flexDirection:'row', justifyContent:'space-between', padding:10, borderRightWidth:1, borderColor:'#555', alignItems:'center'}}>
                    <Image source = {gun} resizeMode="contain" style={{width:40, marginRight:10, height:40}} />
                    <Text style={{color:'#fff'}}>Attack</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={queueMoveTowards} style={{flex:1,flexDirection:'row', justifyContent:'space-between', padding:10, borderRightWidth:1, borderColor:'#555', alignItems:'center'}}>
                    <Ionicons name={'ios-walk'} size={30} color="#fff" />
                    <Text style={{color:'#fff', textAlign:'center'}}>Move{"\n"}Towards</Text>
                </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                    <TouchableOpacity onPress = {() => setViewActions(false)} style={{flexDirection:'row', borderRadius:5, backgroundColor:'tomato', padding:10, justifyContent:'center', flex:1, borderRightWidth:1, borderColor:'#555', alignItems:'center'}}>
                        <Ionicons name={'ios-pulse'} size={30} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>)
        }
    const moveTowards = (stats) => {
        var speed = stats.speed - getRandomArbitrary(0,20)
        var player1 = "You're at maximum closeness";
        var player2 = "You move closer"
        var player3 = stats.name + " is moving towards you"
        
        //props.shootPlayer({damage: 50})
        //props.shootParty({id:0, damage:30})

        if(stats.ai){
            player2 = player3
        }
        if(gotAway){
            props.navigation.navigate("Map")
        }
        if ((distance+speed)>=100) {
            setDistance(100)
            var disclose = {dialog: player1, color: GREEN}
            setBattle_dialog(battle_dialog => [...battle_dialog, disclose])
        }else{
            var disclose = {dialog: player2, color: BASIC}
            setBattle_dialog(battle_dialog => [...battle_dialog, disclose])
        setDistance(distance+speed)
        }
        if(stats.ai == null){
            Ai_turn()
        }
    }

    const moveAway = (stats) => {
        var speed = stats.speed - getRandomArbitrary(0,20)
        var player1 = "You got away.";
        var player2 = "You try to flee."
        var player3 = stats.name + ' is moving away.'

        if(stats.ai != null){
            player2 = player3
        }else{

        }
        if(gotAway){
            props.navigation.navigate("Map")
        }
        if ((distance-speed)<0) {
            setDistance(0)
            var disclose = {dialog: player1, color: GREEN}
            setGotaway(true)
            setBattle_dialog(battle_dialog => [...battle_dialog, disclose])
            
        }else{
            var disclose = {dialog: player2, color: BASIC}
            setBattle_dialog(battle_dialog => [...battle_dialog, disclose])
            setDistance(distance-speed)
            
            if(stats.ai == null){
            Ai_turn();}
        }
        
    }
    const DistanceTab = () => {
        var length = (distance/100) * (windowWidth-5);
        if(distance>100){
            setDistance(100)
            length = windowWidth-5;
        }

        console.log("distance is " + distance)
        
        return(<View style={{width:windowWidth-2, height:6, borderWidth:1, borderColor:'#eee', justifyContent:'center'}}>
            <View style={{height:4, width:length, backgroundColor:'#eee'}} />
        </View>)
    }

    const group_attack = () => {
        var turn = {
            dialog:"------------------- New Turn -------------------",
            color: BASIC
        }
        setBattle_dialog(battle_dialog => [...battle_dialog, turn])
        var group = props.game.party.length + 1;
        for(var i=0; i<group; i++){
            if(i == 0){
                onAttack(props.game.player,i)
            }else{
             onAttack(props.game.party[i-1],i)
            }
        }
        console.log("Queue AI")
        Ai_turn()
    }

    const _playShot = async () => {
        const soundObject = new Audio.Sound();
        try {
          await soundObject.loadAsync(source);
          await soundObject.playAsync();
          console.log("Playing sound")
          // Your sound is playing!
        
          // Don't forget to unload the sound from memory
          // when you are done using the Sound object
          //await soundObject.unloadAsync();
        } catch (error) {
            console.log(error)
          // An error occurred!
        }
      }

    const ai_shoots = (ai) => {
        var shot = false

        var disclose = {dialog: ai.name + " shoots " + ai.item.gun.name + ".", color: BASIC}
        setBattle_dialog(battle_dialog => [...battle_dialog, disclose])
        shot = true
        
        var newNum = getRandomArbitrary(0,100)
        newNum = newNum + (ai.shooting/4) - 5
        
        //hits armor/car
        if(props.game.car){
            if (newNum > 60 && newNum){
                var disclose1 = {dialog: "The bullet hits the car.", color: GREEN}
                setBattle_dialog(battle_dialog => [...battle_dialog, disclose1])
            }else{
                var disclose2 = {dialog: ai.name + " missed.", color: GREEN}
                setBattle_dialog(battle_dialog => [...battle_dialog, disclose2])
        }
        }else{
            if (newNum > 60 ){
                console.log('Hits target')
                var target = getRandomArbitrary(0,props.game.party.length+1)
                if(target == 0){
                    //hits player
                    var dodge = getRandomArbitrary(0,10)
                    var distanceBonus = distance/8

                    var damage = ai.item.gun.damage - dodge - distanceBonus
                    if(damage < 0){
                        damage = 0
                        console.log("deals zero damage")
                    }
                    console.log('you were hit')
                    var newHP = damage
                    newHP = Math.floor(newHP)
                    props.shootPlayer({damage:newHP})
                    var disclose3 = {dialog: "You were hit. HP: " + props.game.player.hp, color: RED}
                    setBattle_dialog(battle_dialog => [...battle_dialog, disclose3])
                }else{
                    //hits party member
                    var dodge = getRandomArbitrary(0,10)
                    var distanceBonus = Math.floor(distance/20)

                    var damage = ai.item.gun.damage - dodge - distanceBonus
                    var hit1 = props.game.party[target-1].name +' was hit.';
                    var hit2 = props.game.party[target-1].name +' has died';
                    console.log(hit1)

                    var newHP = props.game.party[target-1].hp - damage
                    newHP = Math.floor(newHP)

                    if(newHP <= 0){
                        console.log(hit2)
                        var disclose4 = {dialog: hit2 + props.game.party[target-1].hp, color: RED}
                        setBattle_dialog(battle_dialog => [...battle_dialog, disclose4])
                        // remove party member here
                        
                    }else{
                        var disclose5 = {dialog: hit1 + props.game.party[target-1].hp, color: RED}
                        setBattle_dialog(battle_dialog => [...battle_dialog, disclose5])
                    }
                    
                    // shoot method
                    props.shootParty({id:target-1, damage:newHP})
                    
                }
            }else{
                // misses
                var disclose6 = {dialog: ai.name + " missed.", color: GREEN}
                setBattle_dialog(battle_dialog => [...battle_dialog, disclose6])
            }
        }
        
        // hits

    }

    const queueMoveAway = () =>{
        var turn = {
            dialog:"------------------- New Turn -------------------",
            color: BASIC
        }
        setBattle_dialog(battle_dialog => [...battle_dialog, turn])
        moveAway(props.game.player)
    }

    const queueMoveTowards = () =>{
        var turn = {
            dialog:"------------------- New Turn -------------------",
            color: BASIC
        }
        setBattle_dialog(battle_dialog => [...battle_dialog, turn])
        moveTowards(props.game.player)
    }

    const Ai_turn = () =>{
        console.log("Ai's turn")
        for(var i = 0; i < enemies.length; i++){
            if(distance < 50 && enemies[i].hp > 50){
                console.log(i+" " + enemies[i].name + ' ai moves')
                moveTowards(enemies[i])
        }else if(enemies[i].hp > 40){
            console.log(i+" " + enemies[i].name +' ai shoots')
            ai_shoots(enemies[i])

        }else{
                console.log(i+" " + enemies[i].name +' ai moves away' )
                moveAway(enemies[i])
            }
        }
    }

    const PartyEach = ({character}) => {
        return(<View style={{width:250, borderRightWidth:1, borderColor:'white', marginVertical:20, marginRight:15, flexDirection:'row', alignItems:'center'}}>
            <Image source={character.img} resizeMode="contain" style={{width:80, height:80}} />
            <View style={{marginLeft:30}}>
            <Text style={{color:'#fee', fontSize:17}}>{character.name}</Text>
        
            <HP hp={character.hp} maxHp={character.maxHp} />
            <Text style={{color:'#fee', fontSize:14, marginTop:10}}>Shooting Lvl: {character.shooting}</Text>
            
            </View>
            
        </View>)
    }
    const PartyBlock = () => {
    return(<ScrollView horizontal>
        <PartyEach character={props.game.player} />
        {props.game.party.map((item,index) => <PartyEach key={index} character={item} />)}
        <TouchableOpacity onPress = {() => setViewActions(true)} style={{width:200, borderWidth:1, borderColor:'#ddd', alignItems:'center', justifyContent:'center', borderRadius:5, margin:30}}>
        <Text style={{color:'white',fontSize:15}}>Return</Text>
        </TouchableOpacity>
        </ScrollView>)
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
            {(viewActions)?<Actions />:<View style={{height:150}}><Text style={{backgroundColor:'#000', color:'white',fontSize:18, alignSelf:'center', marginTop:10}}>Your Party</Text><PartyBlock /></View>}
        </View>
    )
}
const mapStateToProps = (state) => {
    const { game } = state
    return { game }
  };
  const mapDispatchToProps = dispatch => (
    bindActionCreators({
      shootPlayer, shootParty
    }, dispatch)
  );
  
  export default connect(mapStateToProps, mapDispatchToProps)(Battle);