import React, { Component } from 'react'
import { Container, Row } from 'reactstrap'
import ShopItem from './ShopItem'
import ProductsData from '../ProductsData'

export class Shop extends Component {
    
    constructor(){
        super()
        this.state = {
            products:[]
        }
    }

    componentDidMount(){

        this.setState({
            products: ProductsData
        })

    }


    render() {
        return (
            <Container>
                <Row>
                    {        
                        this.state.products.map(product => {
                            return(
                                <ShopItem key={product.id} product ={product} />
                            )
                        })
                    }
                </Row>
            </Container>
        )
    }
}

export default Shop
