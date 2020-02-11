import { createStore} from 'redux';
import ProductsData from './ProductsData'

const initialState = {
    products:ProductsData,
    cart:[],
    subtotal:0
};

const reducerManager = (state = initialState, action) => {

    if (action.type === "ADD_PRODUCT") {

        let productAdded = state.products.filter(product => product.id === action.product.id)
        
        if(productAdded[0].stock===0){
            return {
                ...state
              };
        }

        let newShop= state.products.filter(product => product.id !== action.product.id)

        productAdded[0].stock = productAdded[0].stock - 1

        newShop.push(productAdded[0])

        newShop.sort((productA,productB) => (productA.id<productB.id ? -1 : (productA.rol > productB.rol) ? 1 : 0))

        let productCart = state.cart.filter(product => product.id === action.product.id)

        let newcart = state.cart.filter(product => product.id !== action.product.id)

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
                quantity:1,
            }
            newcart.push(newCartProduct)
        }
        
        newcart.sort((productA,productB) => (productA.id<productB.id ? -1 : (productA.rol > productB.rol) ? 1 : 0))

        let subtotal = newcart.reduce((total, product) => total + product.price*product.quantity, 0)

        return {
        ...state,
        cart: newcart,
        products: newShop,
        subtotal
      };

    }

    if (action.type === "REMOVE_PRODUCT") {

        let shopProduct= state.products.filter(product => product.id === action.product.id)

        let cartPrduct = state.cart.filter(product => product.id === action.product.id)

        shopProduct[0].stock = shopProduct[0].stock + cartPrduct[0].quantity

        let newShop = state.products.filter(product => product.id !== action.product.id)

        newShop.push(shopProduct[0])
        
        newShop.sort((productA,productB) => (productA.id<productB.id ? -1 : (productA.rol > productB.rol) ? 1 : 0))

        let newcart = state.cart.filter(product => product.id !== action.product.id)

        newcart.sort((productA,productB) => (productA.id<productB.id ? -1 : (productA.rol > productB.rol) ? 1 : 0))
        
        let subtotal = newcart.reduce((total, product) => total + product.price*product.quantity, 0)

        return {
        ...state,
        cart: newcart,
        products: newShop,
        subtotal
      };

    }

    if (action.type === "PLUS_PRODUCT") {

        let currentProduct= state.products.filter(product => product.id === action.product.id)

        currentProduct[0].stock = currentProduct[0].stock -1

        let newShop = state.products.filter(product => product.id !== action.product.id)

        newShop.push(currentProduct[0])
        
        newShop.sort((productA,productB) => (productA.id<productB.id ? -1 : (productA.rol > productB.rol) ? 1 : 0))

        let newcart = state.cart.filter(product => product.id !== action.product.id)

        action.product.quantity = action.product.quantity + 1 

        newcart.push(action.product)

        newcart.sort((productA,productB) => (productA.id<productB.id ? -1 : (productA.rol > productB.rol) ? 1 : 0))
        
        let subtotal = newcart.reduce((total, product) => total + product.price*product.quantity, 0)

        

        return {
        ...state,
        cart: newcart,
        products: newShop,
        subtotal
      };

    }

    if (action.type === "MINUS_PRODUCT") {

        let currentProduct= state.products.filter(product => product.id === action.product.id)

        currentProduct[0].stock = currentProduct[0].stock +1

        let newShop = state.products.filter(product => product.id !== action.product.id)

        newShop.push(currentProduct[0])
        
        newShop.sort((productA,productB) => (productA.id<productB.id ? -1 : (productA.rol > productB.rol) ? 1 : 0))

        let newcart = state.cart.filter(product => product.id !== action.product.id)

        action.product.quantity = action.product.quantity -1 

        newcart.push(action.product)
        
        newcart.sort((productA,productB) => (productA.id<productB.id ? -1 : (productA.rol > productB.rol) ? 1 : 0))
        
        let subtotal = newcart.reduce((total, product) => total + product.price*product.quantity, 0)


        return {
        ...state,
        cart: newcart,
        products: newShop,
        subtotal
      };

    }

    if (action.type === "PURCHASE_PRODUCTS") {

        return {
        ...state,
        cart: [],
        subtotal: 0
      };

    }

    return state;

  };
  
  export default createStore(reducerManager);