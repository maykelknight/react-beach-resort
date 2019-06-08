import React, {Component} from 'react';
import logo from "../images/logo.svg";
import {FaAlignRight} from "react-icons/fa";
import {Link} from "react-router-dom";
import Title from "./Title";
import {FaShuttleVan, FaBeer, FaHiking, FaCocktail} from "react-icons/fa";

export default class Services extends Component {
    state = {
        services: [
            {
                icon: <FaBeer />,
                title: "Strongest Beer",
                info: "Lorem iasp asd lkasdm lkmakls dmlkasmd lkamdlk mald "
            },
            {

                icon: <FaHiking />,
                title: "Endless Hiking",
                info: "Lorem iasp asd lkasdm lkmakls dmlkasmd lkamdlk mald "
            },
            {

                icon: <FaShuttleVan />,
                title: "Free Shuttle",
                info: "Lorem iasp asd lkasdm lkmakls dmlkasmd lkamdlk mald "
            },
            {

                icon: <FaCocktail />,
                title: "Free Coctails",
                info: "Lorem iasp asd lkasdm lkmakls dmlkasmd lkamdlk mald "
            },
        ]
    };
    render() {
        return (
            <section className="services">
                <Title title="Services" />
                <div className="services-center">
                    {this.state.services.map((item, index) => {
                        return <article id={index} className="service">
                            <span>{item.icon}</span>
                            <h6>{item.title}</h6>
                            <p>{item.info}</p>
                        </article>
                    })}
                </div>
            </section>
        )
    }
}
