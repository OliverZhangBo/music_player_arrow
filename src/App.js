import React, { Component } from 'react';
import './App.css';

import{
  BrowserRouter as Router,
  Route,
  NavLink,
  Redirect,
  Switch
}from "react-router-dom"

import Header from "./components/header/Header"
import MusicList from "./components/musiclist/MusicList"
import Lyric from "./components/lyric/Lyric"
import Footer from "./components/footer/Footer"

class App extends Component{
  render(){
    return(
      <Router>
        <div id="app">
          <Header/>
          <Switch>
            <Route path="/musiclist" component={MusicList}/> */}
            <Route path="/lyric/:mid" component={Lyric}/>
            <Redirect from="/*" to="/musiclist"/>
          </Switch>
          <Footer/>
        </div>
      </Router>
      
    );
  }
}

export default App;
