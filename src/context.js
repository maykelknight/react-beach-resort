import React, {Component} from 'react';
import items from './data'
import Client from "./Contentful";

// Client.getEntries({
//     content_type: 'name'
// }).then(response => console.log('WW', response.items)).catch(error => console.log(error));
const RoomContext = React.createContext();

class RoomProvider extends Component {
    state = {
        rooms: [],
        sortedRooms: [],
        featuredRooms: [],
        loading: true,
        type: 'all',
        capacity: 1,
        price: 0,
        minPrice: 0,
        maxPrice: 0,
        minSize: 0,
        maxSize: 0,
        breakfast: false,
        pets: false
    };

    getData = async () => {
        try {
            let response = await Client.getEntries({
                content_type: 'name',
                order: "sys.createdAt"
            });
            // console.log('res', response.items)
            this.setData(response.items);

        } catch (e) {
            console.log('Contentful error', e)
        }
    };



    setData (roomsData) {
        let rooms = this.formatData(roomsData);
        console.log(rooms);
        let featuredRooms = rooms.filter(room => room.featured === true);

        let maxPrice = Math.max(...rooms.map(item => item.price));
        let maxSize = Math.max(...rooms.map(item => item.size));

        this.setState({
            rooms,
            featuredRooms,
            sortedRooms: rooms,
            loading: false,
            price: maxPrice,
            maxPrice,
            maxSize
        })
    }

    componentDidMount () {
        // this.getData(); //fetching data from Contentify
        this.setData(items)
    }

    handleChange = event => {


        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = event.target.name;
        this.setState({
            [name]: value
        }, this.filterRooms);

        // const type = event.target.type;
        // const name = event.target.name;
        // const value = event.target.value;
        // console.log('A', type, name, value);
    };

    filterRooms = () => {
        console.log("hello");
        let {rooms, featuredRooms, loading, type, capacity, price, minPrice, maxPrice, minSize, maxSize, breakfast, pets} = this.state;
        capacity = parseInt(capacity);
        price = parseInt(price);

        let tempRooms = [...rooms];
        if (type !== 'all') {
            tempRooms = tempRooms.filter(item => item.type === type);
        }
        if (capacity !== 1) {
            tempRooms = tempRooms.filter(item => item.capacity >= capacity)
        }

        tempRooms = tempRooms.filter(item => item.price <= price);
        tempRooms = tempRooms.filter(item => item.size >= minSize && item.size <= maxSize);

        if (breakfast) {
            tempRooms = tempRooms.filter(item => item.breakfast)
        }

        if (pets) {
            tempRooms = tempRooms.filter(item => item.pets)
        }

        this.setState({sortedRooms: tempRooms})
    };


    formatData (items) {
        let tempItems = items.map(item => {
            let id = item.sys.id;
            let images = item.fields.images.map(image => image.fields.file.url);
            let room = {...item.fields, images, id};
            return room;
        });
        return tempItems;
    }

    getRoom = (slug) => {
        let tempRooms = [...this.state.rooms];
        return tempRooms.find(room => room.slug === slug);
    };

    render () {
        return (
            <RoomContext.Provider value={{...this.state, getRoom: this.getRoom, handleChange: this.handleChange}}>
                {this.props.children}
            </RoomContext.Provider>
        )
    }
}

//hoc
export function withRoomConsumer (Component) {
    return function ConsumerWrapper (props) {
        return (
            <RoomConsumer>
                {value => <Component {...props} context={value}/>}
            </RoomConsumer>
        )
    }
}

const RoomConsumer = RoomContext.Consumer;

export {RoomProvider, RoomConsumer, RoomContext}
