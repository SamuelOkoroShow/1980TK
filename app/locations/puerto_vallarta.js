import {Dimensions} from 'react-native'
import store from '../images/store.png'
import thug from '../images/thug1.png'
import park1 from '../images/park1.png'
import park2 from '../images/park2.png'
import park3 from '../images/park3.png'
const windowWidth = Dimensions.get('window').width;
const OSET = 0;

const locationMap = [{
	x: 50,
	y: 20,
  img: store,
  name:'Store'
},{
	x: 230,
	y: 0,
  img: thug,
  name:"Street Gang"
},{
	x: 0,
	y: 0 ,
  img: park1,
  name:'Soutside Parking Lot'
},
{
	x: 30,
	y: 100,
  img: park2,
  name:'Northside Parking Lot'
},{
	x: 130,
	y: 100,
  img: park3,
  name:'Eastside Parking Lot'
}
]

export default locationMap