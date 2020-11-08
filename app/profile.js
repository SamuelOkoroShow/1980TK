import React from 'react';
import {View,ScrollView, TouchableOpacity, Dimensions, Image, Text, Animated} from 'react-native'
import { connect } from 'react-redux';
const windowHeight = Dimensions.get('window').height;
import { AntDesign } from '@expo/vector-icons';

const SECTION_HEIGHT = windowHeight/5;
const windowWidth = Dimensions.get('window').width;

const AVATAR_IMG = 70;
const HP_BAR = 210;
const PARTY_MEMBER = 50
const PARTY_IMG = PARTY_MEMBER-10;
const Profile = (props) => {

	const Nav = () => {
		return(<View style={{height:50, backgroundColor:'tomato'}}></View>)
	}
	const animatedVal = React.useRef(new Animated.Value(0)).current;
	const [fold, setfold] = React.useState(0)

	const animation = (toValue) => Animated.timing(animatedVal, {
			toValue: toValue,
			duration: 200,
			useNativeDriver: false
		})

const HP = () => {
		const { hp, maxHp } = props.game.player
		var health = (hp/maxHp) * HP_BAR 
		var healthColor
      //custom health colors
      if (health < (HP_BAR/4)){
        healthColor = "#f96062"
      }else if(health > (HP_BAR/5.1) && health < (HP_BAR/2.1)){
        healthColor = "#fbd34e"
      } else{
        healthColor = "#b7eb9b"
      }
      return(<View style={{height:6, width:HP_BAR, borderColor:'#c7c7c7', borderWidth:1, borderRadius:5}}>
      <View style={{height:4, width:health, backgroundColor:healthColor, borderRadius:5}} />
      </View>)
  }

  const Names = () => {
  	return props.game.party.map((party,index) => {
  				if(index == props.game.party.length-1){
  					 return(<Text style={{color:'#bbb'}}>{party.name}</Text>)
  				}else{
  					 return(<Text style={{color:'#bbb'}}>{party.name},</Text>)
  					    	}
	    	});
  }

  const PartyPress = ({party}) => {
  	if(fold == 0){
  	  	return(
  	  	<TouchableOpacity onPress={onParty} style={{ flex:1, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
  	  	<Image source = {party.img} style = {{width:PARTY_IMG, height:PARTY_IMG, borderRadius:PARTY_IMG/2, marginHorizontal:10}} />
  	  	<Text style={{color:"#fff"}}>{party.name}</Text>
  	  	<Text style={{color:"#fff"}}>{party.job}</Text>
  	  	<View style={{width:PARTY_IMG, height:PARTY_IMG, borderRadius:PARTY_IMG/2, backgroundColor:"#333", justifyContent:'center', alignItems:'center'}}>
  	  	<AntDesign name={'ellipsis1'} size={25} color="#ccc" />
  	  	</View>
  	  	</TouchableOpacity>
  	  	)}else{
  	  			return(<TouchableOpacity onPress={onParty} style={{ flex:1}}>
  	  			<View style={{flexDirection:'row', flex:1, alignItems:'center', justifyContent:'space-between'}}>
  	  	<Image source = {party.img} style = {{width:PARTY_IMG, height:PARTY_IMG, borderRadius:PARTY_IMG/2, marginHorizontal:10}} />
  	  	<Text style={{color:"#fff"}}>{party.name}</Text>
  	  	<Text style={{color:"#fff"}}>{party.job}</Text>
  	  	<View style={{width:PARTY_IMG, height:PARTY_IMG, borderRadius:PARTY_IMG/2, backgroundColor:"#333", justifyContent:'center', alignItems:'center'}}>
  	  	<AntDesign name={'close'} size={15} color="#ccc" />
  	  		</View>

  	  	</View>
  	  	<View style={{ flexDirection:'row', flex:1}}>
  	  		<Stats name = "Shooting" stat={party.shooting} />
    	<Stats name = "Running" stat = {party.running} />
    	<Stats name = "Hotwiring" stat = {party.hotwiring}/>
    	<Stats name = "Speaking" stat = {party.speaking}/>
  	  		</View>
  	  	</TouchableOpacity>)
  	  	}
  }

  const Party = () => {
  	return props.game.party.map((party,index) => {
  	return(<Animated.View style={{height:animatedVal.interpolate({
				inputRange:[0,1],
				outputRange:[PARTY_MEMBER, PARTY_MEMBER*2]
			}), backgroundColor:'#000', margin:5, marginHorizontal:10, borderRadius:3, paddingRight:10 }}>
  	<PartyPress party={party} />
  	</Animated.View>)
  	});
  }

  const onParty = () =>{
  	
  	animation(fold === 1 ? 0 : 1).start()

	setTimeout(() => {setfold(fold === 1? 0: 1)}, 200);

  }

  const Stats = ({name, stat}) => {
  	return(<View style={{justifyContent:'space-around',flexDirection:'row', backgroundColor:'#333', padding:5, borderRadius:3, margin:5, alignItems:'center'}}>
  	<Text style={{color:'#fff', fontSize:11}}>{name}</Text>
  	<Text style={{color:'#fff', fontSize:11}}>  {stat}</Text>
  	</View>)
  }

  return (
    <ScrollView style={{flex:1}}>
    <Nav />
    <View style={{height:SECTION_HEIGHT}}>
    	<View style={{flexDirection:'row'}}>
    	<View style={{flex:1, marginLeft:20}}>
    	<Text style={{fontSize:27, fontWeight:'800'}}>{props.game.player.name}</Text>
    	<View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
    	<Text>Health</Text>
    	<Text>Level: {props.game.player.level}</Text>
    	</View>
    	<HP />
    	</View>
    	<View style={{flex:1, alignItems:'center'}}>
    		<Image source = {props.game.player.img} style={{width:AVATAR_IMG, height:AVATAR_IMG, marginTop:10, borderRadius:AVATAR_IMG/2}} />
    	</View>
    	</View>
    	<View style={{flexDirection:'row', alignItems:'center', flex:1, marginHorizontal:10, justifyContent:'space-around'}}>
    	<Stats name = "Shooting" stat={props.game.player.shooting} />
    	<Stats name = "Running" stat = {props.game.player.running} />
    	<Stats name = "Hotwiring" stat = {props.game.player.hotwiring}/>
    	<Stats name = "Speaking" stat = {props.game.player.speaking}/>
    	
    	</View>
    </View>
    <View style={{height:SECTION_HEIGHT, borderTopWidth:1, borderBottomWidth:1, borderColor:'#ddd',justifyContent:'center', paddingLeft: 30}}>
    	<View style={{ flexDirection:'row'}}>
	    	<View style={{width:AVATAR_IMG, marginRight:10}}>
	    		<View style={{width:AVATAR_IMG, height:AVATAR_IMG, justifyContent:'center', alignItems:'center', borderRadius:AVATAR_IMG/2, shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.8,
    overflow: 'hidden',
    elevation: 5,
    shadowRadius: 1}}>
    <AntDesign name={'dingding-o'} size={AVATAR_IMG} color="#333" />
    </View>
    	</View>
    			<View style={{}}>
	    	<Text style={{fontSize:25, marginVertical:5, fontWeight:'900'}}>Your Party</Text>
	    	<Text style={{color:'#ccc'}}>{props.game.party.length}/{props.game.maxGroup}(Group Size)</Text>
	    	<View style={{flexDirection:'row'}}>
	    	<Names />
	    		</View>
	    		</View>
	    	</View>
    </View>
    <View style={{height:SECTION_HEIGHT-30, borderBottomWidth:1, borderColor:'#ddd',justifyContent:'space-around',flexDirection:'row', alignItems:'center'}}>
 		<View style={{alignItems:'center', textAlign:'center'}}>
 		<Text style={{color:"#bbb",}}>Cars</Text>
 		<Text style={{}}>{props.game.cars.length}</Text>
 		</View>  
 		<View style={{alignItems:'center', textAlign:'center'}}>
 		<Text style={{color:"#bbb"}}>Money</Text>
 		<Text style={{}}>${props.game.money}</Text>
 		</View>
 		<View style={{alignItems:'center', textAlign:'center'}}>
 		<Text style={{color:"#bbb"}}>Days Spent</Text>
 		<Text style={{}}>{props.game.day}</Text>
 		</View>   	
    </View>
    <View>
    	<Party />
    </View>
    </ScrollView>
  )
}

const mapStateToProps = (state) => {
  const { game } = state
  return { game }
};

export default connect(mapStateToProps)(Profile);