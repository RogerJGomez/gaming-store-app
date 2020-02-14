
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
          var productAdded = [...state.products]
          productAdded = productAdded.filter(product => product.id === action.product.id)
          
          if(productAdded[0].stock===0){
              return state
          }

          var newShop = [...state.products]
          newShop = newShop.filter(product => product.id !== action.product.id)

          productAdded[0].stock = productAdded[0].stock - 1

          newShop = [...newShop, productAdded[0]]

          newShop.sort((productA,productB) => (productA.id<productB.id ? -1 : (productA.rol > productB.rol) ? 1 : 0))

          var productCart = [...state.cart]
          productCart = productCart.filter(product => product.id === action.product.id)

          var newcart = [...state.cart]
          newcart = newcart.filter(product => product.id !== action.product.id)

          if(productCart.length>0){
              productCart[0].quantity = productCart[0].quantity + 1 
              newcart.push(productCart[0])
          }
          else{
              let newCartProduct ={
                  id:productAdded[0].id,
                  name:productAdded[0].name,
                  image:productAdded[0].image,
                  price:productAdded[0].price,
                  type:productAdded[0].type,
                  quantity:1,
              }
              newcart.push(newCartProduct)
          }
          
          newcart.sort((productA,productB) => (productA.id<productB.id ? -1 : (productA.rol > productB.rol) ? 1 : 0))

          var subtotal = newcart.reduce((total, product) => total + product.price*product.quantity, 0)

          return {
          ...state,
          cart: newcart,
          products: newShop,
          subtotal
        }

        case REMOVE_PRODUCT:

          var shopProduct= [...state.products]
          shopProduct = shopProduct.filter(product => product.id === action.product.id)

          var cartPrduct = [...state.cart]
          cartPrduct = cartPrduct.filter(product => product.id === action.product.id)

          shopProduct[0].stock = shopProduct[0].stock + cartPrduct[0].quantity

          newShop = [...state.products]
          newShop =  newShop.filter(product => product.id !== action.product.id)

          newShop.push(shopProduct[0])
          
          newShop.sort((productA,productB) => (productA.id<productB.id ? -1 : (productA.rol > productB.rol) ? 1 : 0))

          newcart = [...state.cart]
          newcart= newcart.filter(product => product.id !== action.product.id)

          newcart.sort((productA,productB) => (productA.id<productB.id ? -1 : (productA.rol > productB.rol) ? 1 : 0))
          
          subtotal = newcart.reduce((total, product) => total + product.price*product.quantity, 0)

          return {
          ...state,
          cart: newcart,
          products: newShop,
          subtotal
        }

        case PLUS_PRODUCT:

          shopProduct= [...state.products]
          shopProduct = shopProduct.filter(product => product.id === action.product.id)

          shopProduct[0].stock = shopProduct[0].stock -1

          newShop = [...state.products]
          newShop = newShop.filter(product => product.id !== action.product.id)

          newShop.push(shopProduct[0])
          
          newShop.sort((productA,productB) => (productA.id<productB.id ? -1 : (productA.rol > productB.rol) ? 1 : 0))

          newcart = [...state.cart]
          newcart = newcart.filter(product => product.id !== action.product.id)

          var product = action.product

          product.quantity = product.quantity +1

          newcart.push(product)

          newcart.sort((productA,productB) => (productA.id<productB.id ? -1 : (productA.rol > productB.rol) ? 1 : 0))
          
          subtotal = newcart.reduce((total, product) => total + product.price*product.quantity, 0)

          

          return {
          ...state,
          cart: newcart,
          products: newShop,
          subtotal
        }


        case MINUS_PRODUCT: 
        
          shopProduct= [...state.products]
          shopProduct= shopProduct.filter(product => product.id === action.product.id)

          shopProduct[0].stock = shopProduct[0].stock +1
          
          newShop = [...state.products]
          newShop = newShop.filter(product => product.id !== action.product.id)
          newShop.push(shopProduct[0])
          
          newShop.sort((productA,productB) => (productA.id<productB.id ? -1 : (productA.rol > productB.rol) ? 1 : 0))

          newcart = [...state.cart]
          newcart = newcart.filter(product => product.id !== action.product.id)

          product = action.product

          product.quantity = product.quantity -1

          newcart.push(product)
        
          newcart.sort((productA,productB) => (productA.id<productB.id ? -1 : (productA.rol > productB.rol) ? 1 : 0))
          
          subtotal = newcart.reduce((total, product) => total + product.price*product.quantity, 0)


          return {
          ...state,
          cart: newcart,
          products: newShop,
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