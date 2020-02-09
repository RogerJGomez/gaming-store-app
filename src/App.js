import React from 'react'
import { Provider } from 'react-redux'
import store from './store'
import MyNav from './components/Navbar'
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <MyNav />
      </div>
    </Provider>
  );
}

export default App;
