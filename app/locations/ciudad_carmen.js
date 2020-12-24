import {Dimensions} from 'react-native'
import store from '../images/store.png'
import thug from '../images/thug4.png'
import park1 from '../images/park1.png'
import park2 from '../images/park2.png'
import park3 from '../images/park3.png'
import travel from '../images/travel.png'
import hospital from '../images/hospital.png'
const windowWidth = Dimensions.get('window').width;
const OSET = 0;

const ciudadMap = [{
	x: 0,
	y: 0 ,
  img: park1,
  navigate:'Park',
  name:'Playa Norte Parking Lot'
},{
	x: 230,
	y: 0,
  img: thug,
  navigate: "Gang",
  name:"Street Gang"
},{
	x: 130,
	y: 0,
  img: hospital,
  navigate: "Hospital",
  name:"Hospital"
},
{
	x: 150,
	y: 0,
  img: park2,
  navigate:'Park',
  name:'Mundo Parking Lot'
},{
	x: 130,
  y: 0,
  navigate:'Travel',
  img: travel,
  name:'Travel'
},{
	x: 50,
	y: 0,
  img: store,
  navigate:'Store',
  name:'Store'
}
]

export default ciudadMap