// import React, { Component } from "react";
// import "./Footer.css";

// import { connect } from "react-redux";

// import axios from "axios";

// class FooterUI extends Component{
//     render(){
//         return(
//             <div id="footer">
//                 <div className="progress">
//                     <span className="goingTime" ref="goingTime">00：00</span>
//                     <span className="bar">
//                         <span className="barBall" ref="barBall"></span>
//                         <span className="barNow" ref="barNow"></span>
//                     </span>
//                     <span className="endTime" ref="endTime">00:00</span>
                    
//                 </div>
//                 <div className="way">
//                     <span className="iconfont how iconloopone"></span>
//                     <span className="iconfont iconprevious" onTouchStart={ ()=>{this.previousSong()} }></span>        
//                     <span className="iconfont pause_run iconzanting" onTouchStart={ ()=>{this.runPauseBut()} } ref="runPauseBut"></span>
//                     <span className="iconfont iconnext" onTouchStart={ ()=>{this.nextSong()} }></span> 
//                     <span className="iconfont iconziyuan" ></span>  
//                 </div>
//                 <audio ref="audioElement" src={ this.props.nowMusicIndex?this.props.musicList[this.props.nowMusicIndex].url:"" }></audio>
//             </div>
//         );
//     }
    
//     componentDidMount(){  // 组件渲染后执行数据的代理
//         axios.get("/music/api",{
//             params:{
//                 "key":523077333,
//                 "id":3641614987,
//                 "type":"songlist",
//                 "cache":1,
//                 "size":"hq"
//             }
//         }).then((res) => {  
//             const errCode = res.data.Code;
//             if(errCode === 'OK'){
//                 const data = res.data.Body;
//                 this.props.MUSIC_LIST(data);    // 获取到数据后，直接将数据放入状态管理中
//             }  
//         });
//     }
    
//     componentDidUpdate(){  // 当组件更新时
//         if(this.props.musicPlayingState){  // 如果播放状态为true时
//             this.refs.audioElement.play();
//             this.refs.runPauseBut.setAttribute("class","iconfont pause_run iconbofang");
//             this.songRunningFun();
//             this.timer = setInterval(this.songRunningFun.bind(this),1000);  
//         }else{
//             clearInterval(this.timer);
//             this.timer = null;
//         };
//         this.barBallDrag();
        
//     }

//     runPauseBut(){  // 点击播放与暂停按钮
//         if(this.refs.audioElement.getAttribute("src")){  // 
//             if(this.props.musicPlayingState){  // 如果播放状态为true时
//                 this.refs.audioElement.pause();  // 暂停音乐，并且改变播放状态
//                 this.props.MUSIC_PLAYING_STATE(false);
//                 this.refs.runPauseBut.setAttribute("class","iconfont pause_run iconzanting");  // 因为要改变播放按钮的样式，不得不进行了DOM操作，希望之后改进
//             }else{
//                 this.refs.audioElement.pause();  // 播放音乐，并且改变播放状态
//                 this.props.MUSIC_PLAYING_STATE(true);
//                 this.refs.runPauseBut.setAttribute("class","iconfont pause_run iconbofang");
//             }
//         }
//     }

//     previousSong(){  // 上一首歌曲的功能  并且把播放状态改为 true
//         if(this.refs.audioElement.getAttribute("src")){
//             let nowMusicIndex = this.props.nowMusicIndex;
//             let previousSongIndex;
//             if(nowMusicIndex === 0){
//                 previousSongIndex = this.props.musicList.length-1;
//             }else{
//                 previousSongIndex = nowMusicIndex-1;
//             }
//             this.props.NOW_MUSIC_INDEX(previousSongIndex);
//             this.props.MUSIC_PLAYING_STATE(true);
//         }
//     }

//     nextSong(){  // 下一首歌曲的功能  并且把播放状态改为 true
//         if(this.refs.audioElement.getAttribute("src")){  // 
//             let nowMusicIndex = this.props.nowMusicIndex;
//             let nextSongIndex;
//             if(nowMusicIndex === this.props.musicList.length-1){
//                 nextSongIndex = 0;
//             }else{
//                 nextSongIndex = nowMusicIndex+1;
//             }
//             this.props.NOW_MUSIC_INDEX(nextSongIndex);
//             this.props.MUSIC_PLAYING_STATE(true);
//         }
//     }

//     barBallDrag(){  // 实现小球拖动的功能
//         if(this.refs.audioElement.getAttribute("src")){
//             const barBall = this.refs.barBall;
//             const audioElement = this.refs.audioElement;
//             barBall.ontouchstart = function(ev){
//                 const touchStartInfo = ev.changedTouches[0];
//                 const disX = touchStartInfo.pageX  - this.offsetLeft;  // 鼠标点击的位置相对于元素本身的位置的
//                 document.ontouchmove = function(ev){
//                     const touchMoveInfo = ev.changedTouches[0];
//                     let left = touchMoveInfo.pageX - disX;
//                     const thisHalfWidth = barBall.offsetWidth/2;
//                     const thisParentWidth = barBall.parentNode.offsetWidth;
//                     if(left < -thisHalfWidth){
//                         left = -thisHalfWidth
//                     }else if(left > thisParentWidth-thisHalfWidth){
//                         left = thisParentWidth-thisHalfWidth
//                     }
//                     barBall.style.left = left+"px";  // 小球拖动完成
//                     let scale = (left+thisHalfWidth)/thisParentWidth;  // 小球拖动的比例， 用于实现进度条跟随拖动
//                     barBall.nextSibling.style.width = scale*100 + "%";  // 实现了进度条
//                     audioElement.currentTime = audioElement.duration * scale;  // 当然，拖到哪儿，音乐肯定就播放到哪儿了
//                 };
//                 document.ontouchend = function(){
//                     document.ontouchstart = document.ontouchend = null;
//                 }
//             }
//         }
//     }

//     songRunningFun(){  // 播放时，应该实现 小球前走，进度条前走，播放时间前走
//         const audioElement = this.refs.audioElement;
//         const barBall = this.refs.barBall;
//         const goingTime = this.refs.goingTime;
//         const endTime = this.refs.endTime
//         let currentTime = audioElement.currentTime;
//         let duration = audioElement.duration;
//         let scale = currentTime/duration;
//         barBall.style.left = scale*barBall.parentNode.offsetWidth - barBall.offsetWidth/2 + 'px';
//         barBall.nextSibling.style.width = scale*100 + "%";
//         goingTime.innerHTML = this.timeFormat(currentTime);
//         if(scale<0.01){
//             endTime.innerHTML = this.timeFormat(audioElement.duration);  // 只想让其执行一次,我得想个办法
//         }
//         if(scale === 1){  // 此时应该自动播放下一首了
//             this.nextSong();
//         }
//     }

//     timeFormat(time){
//         let minutes = Math.floor(time/60);
//         let secondes = (time%60).toFixed(0);
//         if(minutes<10){
//             minutes = "0"+minutes;
//         }
//         if(secondes<10){
//             secondes = "0"+secondes;
//         }
//         return minutes + ':' + secondes
//     }
// }

// function mapStateToProps(state){
//     return{
//         musicList:state.musicList,
//         nowMusicIndex:state.nowMusicIndex,
//         musicPlayingState:state.musicPlayingState
//     };
// }

// function mapDispatchToProps(dispatch){
//     return{
//         MUSIC_LIST(list){
//             dispatch({type:'MUSIC_LIST', payload:list})
//         },
//         MUSIC_PLAYING_STATE(boolen){
//             dispatch({ type:'MUSIC_PLAYING_STATE', payload:boolen })
//         },
//         NOW_MUSIC_INDEX(index){
//             dispatch({ type:'NOW_MUSIC_INDEX', payload:index })
//         }
//     };
// }

// var Footer = connect(mapStateToProps, mapDispatchToProps)(FooterUI)

// export default Footer;



import React, { Component } from "react";
import "./Footer.css";

import { connect } from "react-redux";

import axios from 'axios';

class FooterUI extends Component{
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
                    <span className="iconfont iconprevious" onTouchStart={ ()=>{this.previousSong()} }></span>        
                    <span className="iconfont pause_run iconzanting" onTouchStart={ ()=>{this.runPauseBut()} } ref="runPauseBut"></span>
                    <span className="iconfont iconnext" onTouchStart={ ()=>{this.nextSong()} }></span> 
                    <span className="iconfont iconziyuan" ></span>  
                </div>
                <audio ref="audioElement" src={ this.props.musicList[this.props.nowMusicIndex].url }></audio>
            </div>
        );
    }
      
    componentDidUpdate(){  // 当组件更新时
        if(this.props.musicPlayingState){  // 如果播放状态为true时
            this.refs.audioElement.play();
            this.refs.runPauseBut.setAttribute("class","iconfont pause_run iconbofang");
            this.songRunningFun();
            this.timer = setInterval(this.songRunningFun.bind(this),500); 
        }else{
            clearInterval(this.timer);
            this.timer = null;
        };
        this.barBallDrag();
    }

    runPauseBut(){  // 点击播放与暂停按钮
        if(this.props.musicPlayingState){  // 如果播放状态为true时
            this.refs.audioElement.pause();  // 暂停音乐，并且改变播放状态
            this.props.MUSIC_PLAYING_STATE(false);
            this.refs.runPauseBut.setAttribute("class","iconfont pause_run iconzanting");  // 因为要改变播放按钮的样式，不得不进行了DOM操作，希望之后改进
        }else{
            this.refs.audioElement.pause();  // 播放音乐，并且改变播放状态
            this.props.MUSIC_PLAYING_STATE(true);
            this.refs.runPauseBut.setAttribute("class","iconfont pause_run iconbofang");
        }   
    }

    previousSong(){  // 上一首歌曲的功能  并且把播放状态改为 true
        let nowMusicIndex = this.props.nowMusicIndex;
        let previousSongIndex;
        if(nowMusicIndex === 0){
            previousSongIndex = this.props.musicList.length-1;
        }else{
            previousSongIndex = nowMusicIndex-1;
        }
        this.props.NOW_MUSIC_INDEX(previousSongIndex);
        this.props.MUSIC_PLAYING_STATE(true);  
        axios.get(this.props.musicList[previousSongIndex].lrc).then((res)=>{  // 点击上一首时要去获取相应的歌词
            let nowLyric = [...this.formatLyric(res.data),{co_time:1000, co_lyric: 'arrow'}];
            this.props.NOW_LYRIC_LIST(nowLyric);
            
        })
        
    }

    nextSong(){  // 下一首歌曲的功能  并且把播放状态改为 true
        let nowMusicIndex = this.props.nowMusicIndex;
        let nextSongIndex;
        if(nowMusicIndex === this.props.musicList.length-1){
            nextSongIndex = 0;
        }else{
            nextSongIndex = nowMusicIndex+1;
        }
        this.props.NOW_MUSIC_INDEX(nextSongIndex);
        this.props.MUSIC_PLAYING_STATE(true);
        axios.get(this.props.musicList[nextSongIndex].lrc).then((res)=>{  // 点击上一首时要去获取相应的歌词
            let nowLyric = [...this.formatLyric(res.data),{co_time:1000, co_lyric: 'arrow'}];
            this.props.NOW_LYRIC_LIST(nowLyric); 
        })
        
    }

    barBallDrag(){  // 实现小球拖动的功能
        const barBall = this.refs.barBall;
        const audioElement = this.refs.audioElement;
        barBall.ontouchstart = function(ev){
            const touchStartInfo = ev.changedTouches[0];
            const disX = touchStartInfo.pageX  - this.offsetLeft;  // 鼠标点击的位置相对于元素本身的位置的
            document.ontouchmove = function(ev){
                const touchMoveInfo = ev.changedTouches[0];
                let left = touchMoveInfo.pageX - disX;
                const thisHalfWidth = barBall.offsetWidth/2;
                const thisParentWidth = barBall.parentNode.offsetWidth;
                if(left < -thisHalfWidth){
                    left = -thisHalfWidth
                }else if(left > thisParentWidth-thisHalfWidth){
                    left = thisParentWidth-thisHalfWidth
                }
                barBall.style.left = left+"px";  // 小球拖动完成
                let scale = (left+thisHalfWidth)/thisParentWidth;  // 小球拖动的比例， 用于实现进度条跟随拖动
                barBall.nextSibling.style.width = scale*100 + "%";  // 实现了进度条
                audioElement.currentTime = audioElement.duration * scale;  // 当然，拖到哪儿，音乐肯定就播放到哪儿了
            };
            document.ontouchend = function(){
                document.ontouchstart = document.ontouchend = null;
            }
        }
    }

    songRunningFun(){  // 播放时，应该实现 小球前走，进度条前走，播放时间前走
        const audioElement = this.refs.audioElement;
        const barBall = this.refs.barBall;
        const goingTime = this.refs.goingTime;
        const endTime = this.refs.endTime;
        let currentTime = audioElement.currentTime;
        let duration = audioElement.duration;
        let scale = currentTime/duration;
        barBall.style.left = scale*barBall.parentNode.offsetWidth - barBall.offsetWidth/2 + 'px';
        barBall.nextSibling.style.width = scale*100 + "%";
        goingTime.innerHTML = this.timeFormat(currentTime);
        if(scale<0.01){
            endTime.innerHTML = this.timeFormat(audioElement.duration);  // 只想让其执行一次,我得想个办法
        }
        if(scale === 1){  // 此时应该自动播放下一首了
            this.nextSong();
        }
        let nowMusicLyricList = this.props.nowMusicLyricList;
        for(let i=0;i < nowMusicLyricList.length - 1; i++){
            if(nowMusicLyricList[i].co_time <= currentTime && nowMusicLyricList[i+1].co_time > currentTime){
                this.props.NOW_LYRIC_INDEX(i);
            }
        }
    }

    timeFormat(time){
        let minutes = Math.floor(time/60);
        let secondes = (time%60).toFixed(0);
        if(minutes<10){
            minutes = "0"+minutes;
        }
        if(secondes<10){
            secondes = "0"+secondes;
        }
        return minutes + ':' + secondes
    }

    formatLyric(nowLyric){
        const reg =  /\[([^\]]+)\]([^[]+)/g;
        let result = [];
        nowLyric.replace(reg,($0, $1, $2)=>{
            result.push({ co_time:this.timeFormatLyric($1), co_lyric: $2})
        }); 
        return result;
    }

    timeFormatLyric(time){
        let timeArr = time.split(":");  
        return parseInt(timeArr[0]*60) + parseInt(timeArr[1]);
    }

}

function mapStateToProps(state){
    return{
        musicList:state.musicList,
        nowMusicIndex:state.nowMusicIndex,
        musicPlayingState:state.musicPlayingState,
        nowMusicLyricList : state.nowMusicLyricList,
        nowMusicLyricIndex : state.nowMusicLyricIndex
    };
}

function mapDispatchToProps(dispatch){
    return{
        MUSIC_PLAYING_STATE(boolen){
            dispatch({ type:'MUSIC_PLAYING_STATE', payload:boolen })
        },
        NOW_MUSIC_INDEX(index){
            dispatch({ type:'NOW_MUSIC_INDEX', payload:index })
        },
        NOW_LYRIC_INDEX(index){
            dispatch({ type:'NOW_LYRIC_INDEX', payload:index })
        },
        NOW_LYRIC_LIST(list){
            dispatch({ type:'NOW_LYRIC_LIST', payload:list })
        }
    };
}

var Footer = connect(mapStateToProps, mapDispatchToProps)(FooterUI)

export default Footer;

