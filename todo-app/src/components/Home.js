import React from 'react'
import Navbar from './Navbar'
import Todo from './Todo'
import { Provider } from 'react-redux'
import store from './Store'

function Home() {
  return (
    <div>
      <Navbar/>
      <Provider store ={store}>
       <Todo/>
      </Provider>
    </div>
  )
}

export default Home