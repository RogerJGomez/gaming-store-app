
import ProductsData from '../ProductsData'
import {ADD_PRODUCT, REMOVE_PRODUCT, PLUS_PRODUCT, MINUS_PRODUCT, PURCHASE_PRODUCTS} from '../actions/types'


const initialState = {
    products:ProductsData,
    cart:[],
    subtotal:0
};


/* Functions */

const sortProducts = products =>{
  products.sort((productA,productB) => (productA.id<productB.id ? -1 : (productA.rol > productB.rol) ? 1 : 0))
}

const setQuantity = (cart, products, type , action) =>{

  let cartProduct = cart.find(product => product.id === action.product.id)
  let shopProduct = products.find(product => product.id === action.product.id)

  if(type ===  "minus"){
    
    if(cartProduct.quantity!==1){
      cartProduct.quantity -=1
      shopProduct.stock  +=1
    }

  }
  else{
    if(shopProduct.stock!==0){
      cartProduct.quantity +=1
      shopProduct.stock  -=1
    }
  }
  
  products = products.filter(product => product.id !== action.product.id)
  products = [...products, shopProduct]
  cart = cart.filter(product => product.id !== action.product.id)
  cart = [...cart, cartProduct]
  sortProducts(cart)
  sortProducts(products)  
}

/* Functions */



export const reducers = (state = initialState, action) => {

    let products = JSON.parse(JSON.stringify(state.products))
    let cart = JSON.parse(JSON.stringify(state.cart))
    let productCart = {}
    let shopProduct = {}

    switch(action.type){

        case ADD_PRODUCT:

          shopProduct = products.find(product => product.id === action.product.id)
          if(shopProduct.stock===0){ 
              return{
                ...state
              }
          }
          shopProduct.stock = shopProduct.stock - 1
          products = products.filter(product => product.id !== action.product.id)
          products = [...products, shopProduct]
          sortProducts(products)
          productCart = cart.find(product => product.id === action.product.id)

          if(productCart){ //If the product exists in the cart, the quantity increases
              cart = cart.filter(product => product.id !== action.product.id)
              productCart.quantity = productCart.quantity + 1
              cart = [...cart, productCart]
          }
          else{ //Else we create a new product to store it in the cart
              let newCartProduct = {
                  id:shopProduct.id,
                  name:shopProduct.name,
                  image:shopProduct.image,
                  price:shopProduct.price,
                  type:shopProduct.type,
                  quantity:1,
              }
              cart = [...cart, newCartProduct]
          }
          
          sortProducts(cart)

          return {
          ...state,
          cart,
          products,
          subtotal : cart.reduce((total, product) => total + product.price*product.quantity, 0)
        }
          


        case REMOVE_PRODUCT:

          shopProduct = products.find(product => product.id === action.product.id)
          shopProduct.stock =  shopProduct.stock + action.product.quantity
          cart = cart.filter(product => product.id !== action.product.id)
          return {
          ...state,
          cart,
          products,
          subtotal : cart.reduce((total, product) => total + product.price*product.quantity, 0)
        }

        case PLUS_PRODUCT:


            setQuantity(cart, products, "plus", action)

          return {
          ...state,
          cart,
          products,
          subtotal : cart.reduce((total, product) => total + product.price*product.quantity, 0)
        }

        case MINUS_PRODUCT: 
        
            setQuantity(cart, products, "minus", action)
          return {
          ...state,
          cart,
          products,
          subtotal : cart.reduce((total, product) => total + product.price*product.quantity, 0)
        }
        
        case PURCHASE_PRODUCTS:
          return {
            ...state,
            cart: [],
            subtotal: 0
          }
        
        default:
          return state
    }

  }