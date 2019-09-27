import React, { Component } from "react";
import "./Header.css";

import { connect } from "react-redux";

import { NavLink } from "react-router-dom";

class HeaderUI extends Component{
    render(){
        return(
            <div id="header">
                <span>{ this.props.musicList[this.props.nowMusicIndex].title}</span>
                {
                    this.props.whichComponentNow === "musiclist" ||  <NavLink to="/musiclist"><span className="iconfont iconfanhui"></span></NavLink> 
                }
            </div>
        );
    }

}

function mapStateToProps(state){
    return{
        musicList : state.musicList,
        nowMusicIndex : state.nowMusicIndex,
        whichComponentNow : state.whichComponentNow
    };
}
function mapDispatchToProps(dispatch){
    return{
        
    };
}


let Header=connect(mapStateToProps,mapDispatchToProps)(HeaderUI)

export default Header;