import React from 'react';
import './Products.css';

class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            basket: [],
            totalPrice: 0   
        }

        this.buyingItem = this.buyingItem.bind(this)
    }    

    componentDidMount() {
        fetch('https://fakestoreapi.com/products/')
            .then(res => res.json())
            .then(json => {
                console.log(json)
                this.setState({
                    products: json
                })
            })
    }

    componentDidUpdate() {
        return true
    }

    buyingItem(title, price, id)  {
        const newItem = { title : 'title', price : 'price', id : 'id'}
        const checkItem = this.state.basket.findIndex((elem) => {
            return elem.id === newItem.id
        })

        if (checkItem === -1) {
            const addItem = this.state.basket.concat(newItem)
            this.setState({
                basket: addItem,
                totalPrice: Number((this.state.totalPrice + price).toFixed(2))
            })
        } else {
            this.state.basket.splice(checkItem, 1)
            const addItem = this.state.basket
            this.setState({
                basket: addItem,
                totalPrice: Number((this.state.totalPrice).toFixed(2))
            })
        }
    }
    
    render() {
        const {products} = this.state

        return (
            <>
                {products.length ? products.map((item)=>
                    <div className='productsField' key={item.id}>
                        <h3>{item.title}</h3>
                        <h4>Price: {item.price} </h4>
                        <button onClick={() => this.buyingItem(item.title, item.price, item.id)} title='Buy'>Buy</button>
                    </div>) : <p>Loading...</p>                                     
                }
                <p className='totalPrice'>Total: {this.state.totalPrice}</p>        
            </>
        )
    }
}

export default Products;