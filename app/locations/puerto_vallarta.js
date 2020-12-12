import {Dimensions} from 'react-native'
import store from '../images/store.png'
import thug from '../images/thug1.png'
import park1 from '../images/park1.png'
import park2 from '../images/park2.png'
import park3 from '../images/park3.png'
import travel from '../images/travel.png'
import hospital from '../images/hospital.png'
const windowWidth = Dimensions.get('window').width;
const OSET = 0;

const puertoMap = [{
	x: 50,
	y: 20,
  img: store,
  navigate:'Store',
  name:'Store'
},{
	x: 230,
	y: 0,
  img: thug,
  navigate: "Gang",
  name:"Street Gang"
},{
},{
	x: 60,
	y: 0,
  img: hospital,
  navigate: "Hospital",
  name:"Hospital"
},{
	x: 0,
	y: 0 ,
  img: park1,
  navigate:'Park',
  name:'Soutside Parking Lot'
},
{
	x: 30,
	y: 30,
  img: park2,
  navigate:'Park',
  name:'Northside Parking Lot'
},{
	x: 130,
	y: 10,
  img: park3,
  navigate:'Park',
  name:'Eastside Parking Lot'
},{
	x: 230,
  y: 0,
  navigate:'Travel',
  img: travel,
  name:'Travel'
}
]

export default puertoMap