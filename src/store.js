import { createStore} from 'redux';
import ProductsData from './ProductsData'

const initialState = {
    products:ProductsData,
    cart:[]
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
            productAdded[0].quantity=1
            newcart.push(productAdded[0])
        }

        newcart.sort((productA,productB) => (productA.id<productB.id ? -1 : (productA.rol > productB.rol) ? 1 : 0))
      
        return {
        ...state,
        cart: newcart,
        products: newShop
      };

    }

    if (action.type === "REMOVE_PRODUCT") {

        let currentProduct= state.products.filter(product => product.id === action.product.id)

        currentProduct[0].stock = currentProduct[0].stock +1

        let newShop = state.products.filter(product => product.id !== action.product.id)

        newShop.push(currentProduct[0])
        
        newShop.sort((productA,productB) => (productA.id<productB.id ? -1 : (productA.rol > productB.rol) ? 1 : 0))

        let productCart = state.cart.filter(product => product.id === action.product.id)

        let newcart = state.cart.filter(product => product.id !== action.product.id)

        if(productCart[0].quantity>1){
            productCart[0].quantity = productCart[0].quantity - 1 
            newcart.push(productCart[0])
        }

        newcart.sort((productA,productB) => (productA.id<productB.id ? -1 : (productA.rol > productB.rol) ? 1 : 0))

        return {
        ...state,
        cart: newcart,
        products: newShop
      };

    }

    return state;

  };
  
  export default createStore(reducerManager);