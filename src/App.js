import React, { Component , Fragment } from 'react';

import{
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
}from "react-router-dom"

import { connect } from "react-redux";

import axios from 'axios';

import Header from "./components/header/Header";
import MusicList from "./components/musiclist/MusicList";
import Lyric from "./components/lyric/Lyric";
import SongCover from "./components/songcover/SongCover"
import Footer from "./components/footer/Footer";
import Loading from "./components/loading/Loading";

class AppUI extends Component{
  constructor(){
    super();
    this.state = {
      isLoading : true
    }
  }
  render(){
    return(
      <Fragment>
        {
          this.state.isLoading ? <Loading/> :  
            <Router>
              <Fragment>
                <Header/>
                <Switch>
                  <Route path = "/musiclist" component = { MusicList }/>
                  <Route path = "/lyric" component = { Lyric }/>
                  <Route path = "/songcover" component = { SongCover }/>
                  <Redirect from = "/*" to = "/musiclist"/>
                </Switch>
                <Footer/>
              </Fragment>
            </Router>
        }
      </Fragment>
    );
  }

  componentDidMount(){  // 组件渲染后执行数据的代理
    // axios.get("/music/api/"){       // 主用
    axios.get("/api/",{               // 备用
      params:{
          "key":523077333,
          "id":3641614987,
          "type":"songlist",
          "cache":1,
          "size":"hq"
      }
  }).then((res) => {  
      const errCode = res.data.Code;
      if(errCode === 'OK'){
          const data = res.data.Body;
          this.props.MUSIC_LIST(data);    // 获取到数据后，直接将数据放入状态管理中
          this.setState({
            isLoading : false
          });
      }  
  });
  }
}

function mapStateToProps(state){
  return{};
}

function mapDispatchToProps(dispatch){
  return{
    MUSIC_LIST(list){
      dispatch({type:'MUSIC_LIST', payload:list})
    }
  };
}

let App = connect(mapStateToProps, mapDispatchToProps)(AppUI);

export default App;
