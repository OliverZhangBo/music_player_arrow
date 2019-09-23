import React, { Component } from "react";
import "./Lyric.css"

import { connect } from "react-redux";

import axios from "axios";

class LyricUI extends Component{
    constructor(){
        super();
        this.state={
            lyricList:[],
            whichOneLyricSelected:-1,
        }
    }
    render(){
        return(
            <div id="lyric">
                <div className="container">
                    <ul ref="lyricUl">
                        {/* <li className="title">年轮</li>
                        <li>数着一圈圈年轮</li>
                        <li className="selected">我认真</li> */}
                        {
                            this.state.lyricList.map((val,index)=>{
                                return(
                                    <li className={ this.state.whichOneLyricSelected===index?"selected":"" } key={index}>{ val.lyric}</li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }
    componentDidMount(){
        this.props.IS_ICON_BACK_HEADER();
        var mid=this.props.match.params.mid;
        axios.get("/music/api",{
            params:{
                "key":523077333,
                "cache":1,
                "type":"lrc",
                "id":mid
            }
        }).then((res)=>{
            this.setState({
                lyricList:this.formatLyric(res.data)
            })
        })
        if(this.props.isMusicPlay){  // 播放状态
            this.playLyric();
        }else{
            this.pauseLyric();
        }

    }
    formatLyric(data){
         var result=[];
         var re=/\[([^\]]+)\]([^[]+)/g;  
         data.replace(re,($0,$1,$2)=>{
             result.push({time : this.formatTime($1) , lyric:$2})
         })
         return result;
    }
    formatTime(time){
        var timeArr = time.split(":");
        return (parseFloat(timeArr[0]*60) +  parseFloat(timeArr[1])).toFixed(2)
    }
    playLyric(){
        this.lyricRunnig();
        this.timer = setInterval(this.lyricRunnig.bind(this),500);
    }
    pauseLyric(){
        clearInterval(this.timer);
    }
    lyricRunnig(){
        var audioElem = document.getElementById("audioElem");
        var currentTime = audioElem.currentTime;
        var lyricList = this.state.lyricList;
        var lyricUl = this.refs.lyricUl;
        lyricList[lyricList.length]=audioElem.duration;
        for(var i=0;i<lyricList.length-1;i++){
            if(currentTime>=lyricList[i].time && currentTime<lyricList[i+1].time){
                this.setState({
                    whichOneLyricSelected: i
                })
                if(i>6){
                    lyricUl.style.top = -(lyricUl.firstChild.offsetHeight * (i-3)) +"px"
                }
            }
        }
    }
    componentWillUnmount(){  // 组件结束时结束定时器
        clearInterval(this.timer);
    }
}

function mapStateToProps(state){
    return{
        isMusicPlay:state.isMusicPlay
    };
}

function mapDispatchToProps(dispatch){
    return{
        IS_ICON_BACK_HEADER(){
            dispatch({type:"IS_ICON_BACK_HEADER",payload:true})
        }
    };
}

var Lyric = connect(mapStateToProps,mapDispatchToProps)(LyricUI)

export default Lyric;