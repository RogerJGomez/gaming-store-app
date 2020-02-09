import React, { Component } from 'react'
import { Container, Row } from 'reactstrap'
import ShopItem from './ShopItem'
import ProductsData from '../ProductsData'
import CustomAlert from 'sweetalert2'

const Toast = CustomAlert.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    onOpen: (toast) => {
      toast.addEventListener('mouseenter', CustomAlert.stopTimer)
      toast.addEventListener('mouseleave', CustomAlert.resumeTimer)
    }
  })
  

export class Shop extends Component {
    
    constructor(){
        super()
        this.state = {
            products:[],
            cart:[]
        }
    }

    componentDidMount(){

        this.setState({
            products: ProductsData
        })

    }


    addProduct = id =>{

        let product = this.state.products.filter(product => product.id === id)

        if(product[0].stock>0){
            product[0].stock= product[0].stock-1
            let newProducts = this.state.products.filter(product => product.id !== id)
            let newCart = this.state.cart
            newCart.push(product[0])
            newProducts.push(product[0]) 
            this.setState({
                products:newProducts,
                cart: newCart
            })
            Toast.fire({
                icon: 'success',
                title: 'Product added successfully'
            })
        }
        else{
            Toast.fire({
                icon: 'error',
                title: 'Product out of stock'
            })
        }

        
    }

    render() {
        return (
            <Container>
                <Row>
                    {        
                        this.state.products.map(product => {
                            return(
                                <ShopItem key={product.id} product ={product} addProduct={this.addProduct}/>
                            )
                        })
                    }
                </Row>
            </Container>
        )
    }
}

export default Shop
