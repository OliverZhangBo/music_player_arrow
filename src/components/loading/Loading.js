import React, { Component } from 'react';

import "./Loading.css"

class Loading extends Component{
    render(){
        return(
            <div id="loading">
                <div className="container">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        )
    }
}

export default Loading;