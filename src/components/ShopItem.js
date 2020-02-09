import React, { Component } from 'react'
import {Col, Card, CardImg, CardText, CardBody,
    CardTitle, Button } from 'reactstrap'
import CustomAlert from 'sweetalert2'
const styles= {
    marginTop:'30px',
    marginBottom:'30px'
}

const Toast = CustomAlert.mixin({
    toast: true,
    position: 'center-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    onOpen: (toast) => {
      toast.addEventListener('mouseenter', CustomAlert.stopTimer)
      toast.addEventListener('mouseleave', CustomAlert.resumeTimer)
    }
  })


export class ShopItem extends Component {

    alertHandler = () =>{
        if(this.props.product.stock>0){
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
            <Col md="3">
            <div >
                <Card style={styles}>
                    <CardImg top width="30%" src={this.props.product.image} alt="Card image cap" />
                    <CardBody style={{textAlign:'center'}}>
                        <CardTitle><h3>{this.props.product.name}</h3></CardTitle>
                        <CardText>{this.props.product.description}</CardText>
                        <CardText><strong>${this.props.product.price}</strong></CardText>
                        <CardText>Stock: {this.props.product.stock}</CardText>
                        <Button onClick={()=>{this.props.addProduct(this.props.product); this.alertHandler()}} color="secondary">Add to cart</Button>
                    </CardBody>
                </Card>
            </div>
        </Col>
        )
    }
}

export default ShopItem