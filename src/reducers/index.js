
import ProductsData from '../ProductsData'
import {ADD_PRODUCT, REMOVE_PRODUCT, PLUS_PRODUCT, MINUS_PRODUCT, PURCHASE_PRODUCTS} from '../actions/types'


const initialState = {
    products:ProductsData,
    cart:[],
    subtotal:0
};


export const reducers = (state = initialState, action) => {

    switch(action.type){

        case ADD_PRODUCT:

          var products = [...state.products]
          var productAdded = products.find(product => product.id === action.product.id)
          
          if(productAdded.stock===0){
              return state
          }

          products = products.filter(product => product.id !== action.product.id)

          productAdded.stock = productAdded.stock - 1

          products = [...products, productAdded]

          products.sort((productA,productB) => (productA.id<productB.id ? -1 : (productA.rol > productB.rol) ? 1 : 0))

          var cart = [...state.cart]
          
          var productCart = cart.find(product => product.id === action.product.id)

          cart = cart.filter(product => product.id !== action.product.id)

          if(productCart){

              productCart.quantity = productCart.quantity + 1
              cart = [...cart, productCart]
          }
          else{

              let newCartProduct = {
                  id:productAdded.id,
                  name:productAdded.name,
                  image:productAdded.image,
                  price:productAdded.price,
                  type:productAdded.type,
                  quantity:1,
              }
              cart = [...cart, newCartProduct]
          }
          
          cart.sort((productA,productB) => (productA.id<productB.id ? -1 : (productA.rol > productB.rol) ? 1 : 0))

          var subtotal = cart.reduce((total, product) => total + product.price*product.quantity, 0)

          return {
          ...state,
          cart,
          products,
          subtotal
        }

        case REMOVE_PRODUCT:

          products = [...state.products]

          var shopProduct = products.find(product => product.id === action.product.id)

          cart = [...state.cart]

          var cartPrduct = cart.find(product => product.id === action.product.id)

          shopProduct.stock =  shopProduct.stock + cartPrduct.quantity

          cart = cart.filter(product => product.id !== action.product.id)

          cart.sort((productA,productB) => (productA.id<productB.id ? -1 : (productA.rol > productB.rol) ? 1 : 0))

          products = products.filter(product => product.id !== action.product.id)

          products = [...products, shopProduct]
          
          products.sort((productA,productB) => (productA.id<productB.id ? -1 : (productA.rol > productB.rol) ? 1 : 0))
          
          subtotal = cart.reduce((total, product) => total + product.price*product.quantity, 0)

          return {
          ...state,
          cart,
          products,
          subtotal
        }

        case PLUS_PRODUCT:

          products = [...state.products]

          shopProduct = products.find(product => product.id === action.product.id)

          shopProduct.stock = shopProduct.stock - 1

          products = products.filter(product => product.id !== action.product.id)

          products = [...products, shopProduct]
          
          products.sort((productA,productB) => (productA.id<productB.id ? -1 : (productA.rol > productB.rol) ? 1 : 0))

          cart = [...state.cart]
          cart = cart.filter(product => product.id !== action.product.id)

          var newProduct = action.product

          newProduct.quantity = newProduct.quantity + 1

          cart = [...cart, newProduct]

          cart.sort((productA,productB) => (productA.id<productB.id ? -1 : (productA.rol > productB.rol) ? 1 : 0))
          
          subtotal = cart.reduce((total, product) => total + product.price*product.quantity, 0)

          

          return {
          ...state,
          cart,
          products,
          subtotal
        }

        case MINUS_PRODUCT: 
        
          products = [...state.products]

          shopProduct = products.find(product => product.id === action.product.id)

          shopProduct.stock  = shopProduct.stock + 1

          products = products.filter(product => product.id !== action.product.id)

          products = [...products, shopProduct]
          
          products.sort((productA,productB) => (productA.id<productB.id ? -1 : (productA.rol > productB.rol) ? 1 : 0))

          cart = [...state.cart]
          cart = cart.filter(product => product.id !== action.product.id)

          newProduct = action.product

          newProduct.quantity = newProduct.quantity - 1

          cart = [...cart, newProduct]

          cart.sort((productA,productB) => (productA.id<productB.id ? -1 : (productA.rol > productB.rol) ? 1 : 0))
          
          subtotal = cart.reduce((total, product) => total + product.price*product.quantity, 0)


          return {
          ...state,
          cart,
          products,
          subtotal
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