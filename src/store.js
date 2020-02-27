import { createStore} from 'redux'
import {reducers} from './reducers'
import { saveState, loadState } from './localStorage'

const initialState = loadState()

const store = createStore(reducers, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.subscribe(() =>{
    saveState(store.getState())
})

export default store;
