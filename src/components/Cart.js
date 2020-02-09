import React from 'react'
import { Container, Row, Col, Card, CardImg, CardText, CardBody,
    CardTitle, Button } from 'reactstrap'
import { connect } from 'react-redux';


const styles={
    border:"1px solid black", borderRadius:"10px"
}

const Cart = ({cart, removeProduct}) => {
    return (

        <Container style={{textAlign:'center'}}>

            <Row style={styles} >

                <Col md="12">
                    <h1>Cart</h1>
                </Col>
                {        
                    cart.map(product => {
                        return (
                            <Col md="3" key ={product.id}>
                            <div >
                                <Card style={{marginTop:'30px', marginBottom:'30px'}}>
                                    <CardImg top width="30%" src={product.image} alt="Card image cap" />
                                    <CardBody style={{textAlign:'center'}}>
                                        <CardTitle><h3>{product.name}</h3></CardTitle>
                                        <CardText><strong>${product.price}</strong></CardText>
                                        <CardText>Quantity: {product.quantity}</CardText>
                                        <Button onClick={()=>{removeProduct(product)}} color="danger">Remove from cart</Button>
                                    </CardBody>
                                </Card>
                            </div>
                        </Col>
                        )
                    })
                }

            </Row>

        </Container>
    )
}

const mapStateToProps = state => ({
    cart: state.cart
  });


const mapDispatchToProps = dispatch => ({
removeProduct(product) {
    dispatch({
    type: "REMOVE_PRODUCT",
    product
    });
}
});
  
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Cart);
