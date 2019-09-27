import React, { Component } from  'react';

import './SongCover.css'

import { connect } from "react-redux";

class SongCoverUI extends Component{
    render(){
        return(
            <div id="songCover">
                <div className='container' onTouchStart = { ()=>{ this.toLyric() } }>
                    <img ref="songCover" src={ this.props.musicList[this.props.nowMusicIndex].pic } alt=""/>
                </div>
            </div>
        )
    }

    componentDidMount(){
        if(this.props.musicPlayingState){
            this.refs.songCover.style.animationPlayState="running"
        }else{
            this.refs.songCover.style.animationPlayState="paused"
        }
    }    
    componentDidUpdate(){
        if(this.props.musicPlayingState){
            this.refs.songCover.style.animationPlayState="running"
        }else{
            this.refs.songCover.style.animationPlayState="paused"
        }
    }
    
    toLyric(){
        this.props.history.push("/lyric")
    }
}

function mapStateToProps(state){
    return{
        musicList:state.musicList,
        nowMusicIndex:state.nowMusicIndex,
        musicPlayingState:state.musicPlayingState
    }
}

function mapDispathcToProps(dispatch){
    return{

    }
}

let SongCover = connect(mapStateToProps, mapDispathcToProps)(SongCoverUI);

export default SongCover;