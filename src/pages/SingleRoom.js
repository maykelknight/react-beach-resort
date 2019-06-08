import React, {Component} from 'react';
import {Link} from "react-router-dom";

import Banner from "../components/Banner";
import Hero from "../components/Hero"
import defaultBcg from "../images/room-1.jpeg";
import {RoomContext} from "../context";
import StyledHero from "../components/StyledHero";

export default class SingleRoom extends Component {
    constructor (props) {
        super(props);
        console.log(props);
        this.state = {
            slug: this.props.match.params.slug, //url param
            defaultBcg
        };
    }

    static contextType = RoomContext;

    // componentDidMount () {}

    render () {
        const {getRoom} = this.context;
        const room = getRoom(this.state.slug);
        console.log('room', room);
        if (!room) {
            return <div className="error">
                <h3>no such room could be found</h3>
                <Link to="/rooms" className="btn-primary">Back to rooms</Link>
            </div>
        }

        const {name, description, capacity, size, price, extras, breakfast, pets, images} = room;
        const [mainImg, ...defaultImg] = images;

        return <>
            <StyledHero img={mainImg || this.state.defaultBcg}>
                <Banner title={`${name}`}>
                    <Link to="/rooms" className="btn-primary">Return home</Link>
                </Banner>
            </StyledHero>
            <section className="single-room">
                <div className="single-room-images">
                    {defaultImg.map((item, index) => {
                        return <img key={index} src={item} alt={name}/>
                    })}
                </div>
                <div className="single-room-info">
                    <article className="description">
                        <h3>Details</h3>
                        <p>{description}</p>
                    </article>
                    <article className="info">
                        <h3 className="info">info</h3>
                        <h6>price: ${price}</h6>
                        <h6>size: ${size} SQFT</h6>
                        <h6>copacity: max copacity {capacity > 1 ? `${capacity} people` : `${capacity} person`}</h6>
                        <h6>{pets ? 'pets allowed' : 'pets not allowed'}</h6>
                        <h6>{breakfast ? 'breakfast free' : 'breakfast included'}</h6>
                    </article>
                </div>
            </section>
            <section className="room-extras">
                <h6>Extras</h6>
                <ul className="extras">
                    {extras.map((item, index) => {
                        return <li key={index}>- {item}</li>
                    })
                    }
                </ul>
            </section>
        </>

    }
}
