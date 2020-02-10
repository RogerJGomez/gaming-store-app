import React from 'react'
import {Col, Card, CardImg, CardText, CardBody,
    CardTitle, Button } from 'reactstrap'
import CustomAlert from 'sweetalert2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'


const styles= {
    marginTop:'30px',
    marginBottom:'30px'
}

const Toast = CustomAlert.mixin({
    toast: true,
    position: 'center-end',
    showConfirmButton: false,
    timer: 2300,
    timerProgressBar: true,
    onOpen: (toast) => {
      toast.addEventListener('mouseenter', CustomAlert.stopTimer)
      toast.addEventListener('mouseleave', CustomAlert.resumeTimer)
    }
  })


 const ShopItem = (props) =>{

    const alertHandler = () =>{
        if(props.product.stock>0){
            Toast.fire({
                icon: 'success',
                title: 'Product added to cart'
            })
        }
        else{
            Toast.fire({
                icon: 'error',
                title: 'Product out of stock'
            })
        }
    }

    return (
        <Col md="3">
        <div >
            <Card style={styles}>
                <CardImg top width="30%" src={props.product.image} alt="Card image cap" />
                <CardBody style={{textAlign:'center'}}>
                    <CardTitle><h3>{props.product.name}</h3></CardTitle>
                    <CardText>{props.product.description}</CardText>
                    <CardText><strong>${props.product.price}</strong></CardText>
                    <CardText>Stock: {props.product.stock}</CardText>
    <Button onClick={()=>{props.addProduct(props.product); alertHandler()}} color="secondary">Add to cart {<FontAwesomeIcon icon={faShoppingCart} />}</Button>
                </CardBody>
            </Card>
        </div>
    </Col>
    )
}

export default ShopItem

