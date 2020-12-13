import {Dimensions} from 'react-native'
import contact from '../images/contact2.png'
import thug from '../images/thug2.png'
import park1 from '../images/park1.png'
import park2 from '../images/park2.png'
import park3 from '../images/park3.png'
import travel from '../images/travel.png'
const windowWidth = Dimensions.get('window').width;
const OSET = 0;

const oaxacaMap = [{
	x: 50,
	y: 20,
  img: contact,
  navigate:'Contact',
  name:'Unique Contact.'
},{
	x: 0,
	y: 0 ,
  img: park2,
  navigate:'Park',
  name:'3rd Street Parking Lot'
},{
	x: 230,
	y: 0,
  img: thug,
  navigate: "Gang",
  name:"Street Gang"
},{
	x: 130,
  y: 100,
  navigate:'Travel',
  img: travel,
  name:'Travel'
},{
	x: 130,
	y: 100,
  img: park3,
  navigate:'Park',
  name:'Eastside Parking Lot'
}
]

export default oaxacaMap