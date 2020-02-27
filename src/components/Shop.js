import React from 'react'
import { Container, Row, Col, Card, CardImg, CardText, CardBody,
    CardTitle, Button } from 'reactstrap'
import { connect } from 'react-redux'
import CustomAlert from 'sweetalert2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import {add} from '../actions'

const styles= {
    marginTop:'2vh',
    marginBottom:'2vh',
    minHeight:'50vh'
}

const Toast = CustomAlert.mixin({
    toast: true,
    position: 'center-end',
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
    onOpen: (toast) => {
      toast.addEventListener('mouseenter', CustomAlert.stopTimer)
      toast.addEventListener('mouseleave', CustomAlert.resumeTimer)
    }
  })



const Shop = ({products,subtotal, addProduct}) => {

    const alertHandler = (product) =>{

        if(product.stock>0){
            Toast.fire({
                icon: 'success',
                title: "Product added to cart"
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

        <Container style={{marginTop:"7vh"}}>
            <h3>Subtotal ${subtotal}</h3>
            <Row>
            {     
                products.map(product => {
                    return(
                        <Col md="3" key ={product.id}>
                        <div >
                            <Card style={styles}>
                                <CardImg top width="30%" src={product.image} style={{padding:"5%"}} alt="Card image cap" />
                                <CardBody style={{textAlign:'center'}}>
                                    <CardTitle><h3>{product.name}</h3></CardTitle>
                                    <CardText>{product.description}</CardText>
                                    <CardText><strong>${product.price}</strong></CardText>
                                    <CardText>Stock: {product.stock}</CardText>
                                    <Button onClick={()=>{addProduct(product); alertHandler(product)}}>Add to cart {<FontAwesomeIcon icon={faShoppingCart} />}</Button>
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
    products: state.products,
    subtotal: state.subtotal
  });


  const mapDispatchToProps = dispatch => ({
    addProduct: (product) => {
      dispatch(add(product))
    }
})

  
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Shop);
