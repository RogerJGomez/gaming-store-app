import React from 'react'
import {Col, Card, CardImg, CardText, CardBody,
    CardTitle, Button } from 'reactstrap'

const styles= {
    marginTop:'30px',
    marginBottom:'30px'
}
 const ShopItem = props => {
    return (
        <Col md="3">
            <div >
                <Card style={styles}>
                    <CardImg top width="30%" src={props.product.image} alt="Card image cap" />
                    <CardBody style={{textAlign:'center'}}>
                        <CardTitle><h3>{props.product.name}</h3></CardTitle>
                        <CardText>{props.product.description}</CardText>
                        <CardText>Available: {props.product.stock}</CardText>
                        <Button onClick={()=>{props.addProduct(props.product.id)}} color="secondary">Add to cart</Button>
                    </CardBody>
                </Card>
            </div>
        </Col>
    )
}


export default ShopItem