import React from 'react'
import { Container, Row, Col, Card, CardImg, CardText, CardBody,
    CardTitle, Button } from 'reactstrap'
import { connect } from 'react-redux'
import CustomAlert from 'sweetalert2'


const styles={
    border:"1px solid rgba(0,0,0,.125)", borderRadius:"15px", marginTop:"50px",padding:"2%"}

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



const Cart = ({cart, subtotal, removeProduct, plusProduct, minusProduct, purchaseProducts}) => {

    const alertHandler = () =>{
 
        Toast.fire({
            icon: 'success',
            title: 'Product removed successfully'
        })
        
    }

    const alertPayment = () =>{

        let total = 'Order Number: '+ Math.floor((Math.random() * 10000000) + 1)
        CustomAlert.fire({
            position: 'center',
            icon: 'success',
            title: 'Purchased!',
            text: total,
            showConfirmButton: true,
          })
        
    }

    const ImgDisplay = (props) =>{
        console.log(props.product.type)
        if(props.product.type==="game"){
            return(
                <CardImg top src={props.product.image} alt="Card image cap" className="game"/>
            )
        }
        return(
            <CardImg top src={props.product.image} alt="Card image cap" className="console"/>
        )
    }

    const DisplayCart = (props) =>{

        if(props.cart.length>0){
           
             let shopCart =   cart.map(product => {
                 return(
                    <Col md="4" key ={product.id}>
                    <div >
                        <Card style={{marginTop:'30px', marginBottom:'30px'}}>
                        <ImgDisplay product={product} />
                            <CardBody style={{textAlign:'center'}}>
                                <CardTitle><h3>{product.name}</h3></CardTitle>
                                <CardText><strong>${product.price}</strong></CardText>
                                <CardText>Quantity: {product.quantity } 
                                    <Button  onClick={()=>{minusProduct(product)}} style={{marginRight:"5px", marginLeft:"5px"}} color="secondary" size="sm"><strong>-</strong></Button>

                                    <Button onClick={()=>{plusProduct(product)}} color="secondary" size="sm"><strong>+</strong></Button>
                                 </CardText>
                                <Button onClick={()=>{removeProduct(product); alertHandler()}} color="secondary">Remove from cart</Button>
                            </CardBody>
                        </Card>
                    </div>
                </Col>
                )
                })

            return (
                shopCart
            )
        }

        return(
            <Col md="12" >
                <div >
                    <Card style={{marginTop:'30px', marginBottom:'30px'}}>

                        <CardBody style={{textAlign:'center'}}>
                            <CardTitle><h3>Empty cart</h3></CardTitle>
                        </CardBody>
                    </Card>
                </div>
            </Col>
        )
    }

    const DisplayButton = () =>{

        if(subtotal>0){
            return(<Button onClick={()=>{purchaseProducts(); alertPayment()}} color="secondary">Proceed to payment</Button>)
        }
        return null
    }

    return (

        <Container style={{textAlign:'center', marginBottom:'40px'}}>

            <Row style={styles} >

                <Col md="12">
                    <h1>Cart</h1>
                </Col>
                <Col md="12" >
                    <Row>
                        <DisplayCart cart = {cart}/>
                    </Row>
                </Col>
                <Col md="12">

                    <h3>Details</h3>
                    <h4>Subtotal: ${subtotal}</h4>

                    <DisplayButton />

                </Col>

            </Row>

        </Container>
    )
}

const mapStateToProps = state => ({
    cart: state.cart,
    subtotal: state.subtotal
  });


const mapDispatchToProps = dispatch => ({
    
    removeProduct(product) {
        dispatch({
        type: "REMOVE_PRODUCT",
        product
        });
    },
    plusProduct(product) {
        dispatch({
        type: "PLUS_PRODUCT",
        product
        });
    },
    minusProduct(product) {
        dispatch({
        type: "MINUS_PRODUCT",
        product
        });
    },
    purchaseProducts() {
        dispatch({
        type: "PURCHASE_PRODUCTS"
        });
    }


});
  
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Cart);
