import React, {useContext} from "react";
import {RoomContext} from "../context";
import Title from "./Title";

const getUnique =(items, value) => {
    return [...new Set(items.map(item => item[value]))]
};

export default function RoomFilter ({rooms}) {
    const context = useContext(RoomContext);
    console.log('context', context);
    const {handleChange, type, capacity, price, minPrice, maxPrice, minSize, maxSize, breakfast, pets} = context;

    // get uniqe types
    let types = getUnique(rooms, 'type');

    // add all
    types = ['all', ...types];

    //map to jsx
    types = types.map((item, index) => {
        return (<option value={item} key={index}>{item}</option>)
    });

    let capacities = getUnique(rooms, 'capacity');
    capacities = capacities.map((item, index) => {
        return (<option value={item} key={index}>{item}</option>)
    });

    return (
        <section className="filter-container">
            <Title title="Search rooms" />
            <form className="filter-form">
                {/*select type*/}
                <div className="form-group">
                    <label htmlFor="type">room type</label>
                    <select
                        name="type"
                        id="type"
                        value={type}
                        className="form-control"
                        onChange={handleChange}
                    >
                        {types}
                    </select>
                </div>

                {/*end select type*/}

                {/*select capacity*/}
                <div className="form-group">
                    <label htmlFor="capacity">capacity</label>
                    <select
                        name="capacity"
                        id="capacity"
                        value={capacity}
                        className="form-control"
                        onChange={handleChange}
                    >
                        {capacities}
                    </select>
                </div>

                {/*end select capacity*/}

                {/*select capacity*/}
                <div className="form-group">
                    <label htmlFor="price">room price ${price}</label>
                    <input type="range" name="price" className="form-control" id="price" min={minPrice} max={maxPrice} value={price} onChange={handleChange}/>
                </div>
                {/*end select capacity*/}

                {/*select size*/}
                <div className="form-group">
                    <label htmlFor="size">Size</label>
                    <div className="size-inputs">
                        <input type="number" name="minSize" id="size" value={minSize} onChange={handleChange} className="size-input"/>
                        <input type="number" name="maxSize" id="size" value={maxSize} onChange={handleChange} className="size-input"/>
                    </div>
                </div>
                {/*end select size*/}


                {/*select extras*/}
                <div className="form-group">
                    <div className="single-extra">
                        <input type="checkbox"
                               name="breakfast"
                               id="breakfast"
                               checked={breakfast}
                               onChange={handleChange}/>
                        <label htmlFor="breakfast">Breakfast</label>
                    </div>
                    <div className="single-extra">
                        <input type="checkbox"
                               name="pets"
                               id="pets"
                               checked={pets}
                               onChange={handleChange}/>
                        <label htmlFor="pets">pets</label>
                    </div>
                </div>
                {/*end select extras*/}
            </form>
        </section>
    )
}
