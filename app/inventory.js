'use strict';

import React from 'react';
import {
	View,
	ImageBackground,
	StyleSheet,
	Image,
	Dimensions,
	TouchableOpacity	
} from 'react-native';
const windowWidth = Dimensions.get('window').width;
import { connect } from 'react-redux';


const ITEM_SIZE = 50;
const BOX_MARGIN = 3;
const BOX_SIZE = windowWidth/4-6;

const Inventory = (props) => {

	const item = (inventory) =>{
		console.log('no Item')
		return(<Image source = {inventory.img} style={{width:ITEM_SIZE, height:ITEM_SIZE}} />)
	}

	const Box = ({inventory}) =>{
		return (<TouchableOpacity style={{
			justifyContent:'center', 
			width:BOX_SIZE, 
			height:BOX_SIZE, 
			margin:BOX_MARGIN, 
			backgroundColor:'#0a4310', 
			alignItems:'center'}}>{(inventory.img != null)?item(inventory):console.log('hello san diego')}
			
			</TouchableOpacity>)
	}

    return (
    	<View style={{flex:1}}>
      <View style={{flexDirection:'row'}}>
      <Box inventory = {(props.game.inventory[0])?props.game.inventory[0]:'null'}></Box>
      <Box inventory = {(props.game.inventory[1])?props.game.inventory[1]:'null'}></Box>
      <Box inventory = {(props.game.inventory[2])?props.game.inventory[2]:'null'}></Box>
      <Box inventory = {(props.game.inventory[3])?props.game.inventory[3]:'null'}></Box>
      </View>
      <View style={{flexDirection:'row'}}>
      <Box inventory = {(props.game.inventory[4])?props.game.inventory[4]:'null'}></Box>
      <Box inventory = {(props.game.inventory[5])?props.game.inventory[5]:'null'}></Box>
      <Box inventory = {(props.game.inventory[6])?props.game.inventory[6]:'null'}></Box>
      <Box inventory = {(props.game.inventory[7])?props.game.inventory[7]:'null'}></Box>
      </View>
      <View style={{flexDirection:'row'}}>
      <Box inventory = {(props.game.inventory[8])?props.game.inventory[8]:'null'}></Box>
      <Box inventory = {(props.game.inventory[9])?props.game.inventory[9]:'null'}></Box>
      <Box inventory = {(props.game.inventory[10])?props.game.inventory[10]:'null'}></Box>
      <Box inventory = {(props.game.inventory[11])?props.game.inventory[11]:'null'}></Box>
      </View>
      </View>
    );
}

const styles = StyleSheet.create({

});

const mapStateToProps = (state) => {
  const { game } = state
  return { game }
};

export default connect(
	mapStateToProps,
// Implement map dispatch to props
)(Inventory)
