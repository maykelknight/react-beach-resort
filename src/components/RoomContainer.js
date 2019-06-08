import React, {Component} from 'react';
// import {Link} from "react-router-dom";
// import {RoomContext} from "../context";
// import Title from "./Title";
// import Loading from "./Loading";
// import Room from "./Room";
import RoomsFilter from "./RoomFilter"
import RoomsList from "./RoomList"

export default class RoomsContainer extends Component {
    render () {
        return(
        <div>
            hello from rooms container
            <RoomsFilter />
            <RoomsList />

        </div>)
    }
}
