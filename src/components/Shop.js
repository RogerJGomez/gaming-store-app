import React from 'react'
import { Container, Row } from 'reactstrap'
import ShopItem from './ShopItem'
import { connect } from 'react-redux';

  const Shop = ({ products, addProduct}) => {

    return (
        <Container>
            <Row>
            {        
                products.map(product => {
                    return(
                        <ShopItem key={product.id} product ={product} addProduct={addProduct}/>
                    )
                })
            }
            </Row>
        </Container>
    )

}

const mapStateToProps = state => ({
    products: state.products
  });


const mapDispatchToProps = dispatch => ({
addProduct(product) {
    dispatch({
    type: "ADD_PRODUCT",
    product
    });
}
});
  
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Shop);
