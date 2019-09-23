import React, { Component } from "react";
import "./Footer.css";

import { connect } from "react-redux";

import { NavLink } from "react-router-dom";

class FooterUI extends Component{
    constructor(){
        super();
        this.pause_run_handle = this.pause_run_handle.bind(this);
    }
    render(){
        return(
            <div id="footer">
                <div className="progress">
                    <span className="goingTime" ref="goingTime">00：00</span>
                    <span className="bar">
                        <span className="barBall" ref="barBall"></span>
                        <span className="barNow" ref="barNow"></span>
                    </span>
                    <span className="endTime" ref="endTime">00:00</span>
                    
                </div>
                <div className="way">
                    <span className="iconfont how iconloopone"></span>
                    <span className="iconfont iconprevious" onTouchStart={ ()=>this.prev_next_Song(this.props.preMusicID) }></span>        
                    <span className="iconfont pause_run iconzanting" ref="pause_run" onTouchStart={ this.pause_run_handle }></span>
                    <span className="iconfont iconnext" onTouchStart={ ()=>this.prev_next_Song(this.props.nextMusicID) }></span> 
                    <NavLink to="/musiclist"><span className="iconfont iconziyuan"></span></NavLink>      
                </div>
                <audio id="audioElem" ref="audioElem"  src={ this.props.musicID && "https://api.mlwei.com/music/api/?key=523077333&type=url&id="+this.props.musicID +"&size="}></audio>
            </div>
        );
    }
    componentDidMount(){
        this.musicBarDrag(); 
    }
    componentDidUpdate(){
        if(this.props.isMusicPlay){  // 如果状态为播放
            this.playMusic();
        }else{
            this.pauseMusic(); 
        }
    }
    playMusic(){
        this.refs.pause_run.setAttribute("class","iconfont pause_run iconbofang");
        this.refs.audioElem.play();
        this.playingRun();
        this.timer = setInterval(this.playingRun.bind(this),1000);
    }
    pauseMusic(){
        this.refs.pause_run.setAttribute("class","iconfont pause_run iconzanting");
        this.refs.audioElem.pause();
        clearInterval(this.timer)
    }
    pause_run_handle(){
        if(!this.refs.audioElem.getAttribute("src")){
            return;  // 初始时，src为空，不让它向下走
        }
        if(this.props.isMusicPlay){  // 如果状态为播放
            this.pauseMusic();
            this.IS_MUSIC_PLAY(false)
        }else{  // 
            this.playMusic();
            this.IS_MUSIC_PLAY(true)
        }
    }
    IS_MUSIC_PLAY(now){
        this.props.IS_MUSIC_PLAY(now)  // 点击播放暂停按钮时触发  改变store的状态
    }
    playingRun(){  // 播放时的功能，如进度条，歌词  
        var barNow = this.refs.barNow;
        var barBall = this.refs.barBall;
        var audioElem = this.refs.audioElem;
        var goingTime = this.refs.goingTime;
        var endTime = this.refs.endTime
        var scale = audioElem.currentTime / audioElem.duration;
        barNow.style.width = scale*100+"%";
        barBall.style.left = scale * barNow.parentElement.offsetWidth - (barBall.offsetWidth/2) + "px";
        goingTime.innerHTML = this.timeFormat(audioElem.currentTime);  
        endTime.innerHTML = this.timeFormat(audioElem.duration);   // 这里有待 改善  
    }
    musicBarDrag(){  // 实现托拽进度条  以及 进度条跟随小球变化
        var barNow = this.refs.barNow
        var audioElem = this.refs.audioElem
        this.refs.barBall.ontouchstart = function(ev){
            let touch = ev.changedTouches[0];
            var disX = touch.pageX  - this.offsetLeft;
            document.ontouchmove = (ev)=>{
                let touch = ev.changedTouches[0];
                var left = touch.pageX - disX;
                var thisWidthHalf = this.offsetWidth/2
                if(left<-thisWidthHalf){
                    left = -thisWidthHalf;  // 球的中心在进度条的两端中心位置
                }else if(left>this.parentElement.offsetWidth-thisWidthHalf){
                    left=this.parentElement.offsetWidth-thisWidthHalf
                }
                this.style.left = left + "px"; 
                // barNow.style.width = left + thisWidthHalf + "px";
                var scale = (left+thisWidthHalf)/(this.parentElement.offsetWidth)  // 百分比
                barNow.style.width = scale*100+"%";
                // 以上两种方式都是可以的

                // 不过，通过拖拽进度条要实现歌曲的时间，所以还是使用百分比更好
                audioElem.currentTime = scale * audioElem.duration
            };
            document.ontouchend = function(){
                document.ontouchstart = null;
                document.ontouchend = null;
            }
        };
        return false;
    }
    timeFormat(time){
        var minute = Math.floor(time / 60);
        var second = Math.floor(time % 60);
        if(second<10){
            second = "0"+second;
        }
        if(minute<10){
            minute = "0"+minute;
        }
        return minute + ":" + second;
    }
    prev_next_Song(now_id){  // 上一首歌 和下一首歌
        this.props.MUSIC_ID(now_id)
    }  
}


// audio.currentTime = 100   // 播放的当前时间
// audio.duration  // 播放的总时间

function mapStateToProps(state){
    return{
        musicID:state.musicID,
        isMusicPlay:state.isMusicPlay,
        preMusicID:state.preMusicID,
        nextMusicID:state.nextMusicID
    }
}

function mapDispatchToProps(dispatch){
    return{
        IS_MUSIC_PLAY(now){
            dispatch({type:"IS_MUSIC_PLAY",payload:now})
        },
        MUSIC_ID(now){
            dispatch({type:"MUSIC_ID",payload:now})
        }
       
    }
}

var Footer = connect(mapStateToProps, mapDispatchToProps)(FooterUI)

export default Footer;