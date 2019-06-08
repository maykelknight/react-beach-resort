import React, {Component} from 'react';
import Loading from "./Loading";
import RoomsFilter from "./RoomFilter"
import RoomsList from "./RoomList"
import {withRoomConsumer} from '../context';

function RoomContainer ({context}) {
    console.log("init", context)
    const {loading, rooms, sortedRooms} = context;
    if (loading) {
        return <Loading/>;
    }
    return (
        <>
            <RoomsFilter rooms={rooms}/>
            <RoomsList rooms={sortedRooms}/>
        </>
    );
}

export default withRoomConsumer(RoomContainer)

// import React, {Component} from 'react';
// // import {Link} from "react-router-dom";
// // import {RoomContext} from "../context";
// // import Title from "./Title";
// import Loading from "./Loading";
// // import Room from "./Room";
// import RoomsFilter from "./RoomFilter"
// import RoomsList from "./RoomList"
// import {RoomConsumer} from '../context';
//
// export default class RoomContainer extends Component {
//     render () {
//         return (
//             <RoomConsumer>
//                 { value => {
//                     console.log(value)
//                     const {loading, rooms, sortedRooms} = value;
//
//                     if(loading) {
//                         return <Loading/>
//                     }
//                     return (
//                         <div>
//                             <p>hello from rooms container</p>
//                             <RoomsFilter rooms={rooms}/>
//                             <RoomsList rooms={sortedRooms}/>
//                         </div>
//                     )
//                 }}
//             </RoomConsumer>
//
//
//         )
//     }
// }
