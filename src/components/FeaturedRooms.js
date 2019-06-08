import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {RoomContext} from "../context";
import Title from "./Title";
import Loading from "./Loading";
import Room from "./Room";

// import Room from "./Room"
export default class FeaturedRooms extends Component {
    static contextType = RoomContext;

    render () {
        // const {name, greeting} = this.context;
        let {loading, featuredRooms: rooms} = this.context;

        rooms = rooms.map(room => {
            return <Room key={room.id} room={room}/>
        });
        console.log(rooms);

        return (
            <section className="featured-rooms">
                <Title title="featured rooms"/>
                <div className="featured-rooms-center">
                    {loading ? <Loading/> : rooms}
                </div>
            </section>
        )
    }
}
