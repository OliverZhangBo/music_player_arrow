import React, { Component } from "react";
import "./Header.css";

import { connect } from "react-redux";

import { NavLink } from "react-router-dom"

class HeaderUI extends Component{
    constructor(){
        super();
    }
    render(){
        return(
            <div id="header">
                <span>{ this.props.musicTitle }</span>
                { this.props.isIconBackHeader && <NavLink to="/musiclist"><span className="iconfont iconfanhui"></span></NavLink> }
            </div>
        );
    }
    componentDidMount(){
        this.props.IS_ICON_BACK_HEADER()
    }
}

function mapStateToProps(state){
    return{
        isIconBackHeader : state.isIconBackHeader,
        musicTitle:state.musicTitle
    };
}
function mapDispatchToProps(dispatch){
    return{
        IS_ICON_BACK_HEADER(){
            dispatch({type:"IS_ICON_BACK_HEADER",payload:false})
        }
    };
}


var Header=connect(mapStateToProps,mapDispatchToProps)(HeaderUI)

export default Header;