import React, { Component } from "react";
import "./Lyric.css"

import { connect } from "react-redux";

import axios from 'axios';

class LyricUI extends Component{
    render(){
        return(
            <div id="lyric">
                <div className="container">
                    <ul ref="lyricUl" onTouchStart = { ()=>{ this.toPic() } } >   
                        {
                            this.props.nowMusicLyricList.map((val, index)=>{
                                return(
                                    <li className={ this.props.nowMusicLyricIndex===index ? 'selected' : '' } key={ index }>{ val.co_lyric }</li>
                                ) 
                            })
                        }
                                       
                    </ul>
                </div>
            </div>
        );
    }

    componentDidMount(){  // 代理获取歌词
        this.props.WHICH_COM_NOW("lyric");
        axios.get(this.props.musicList[this.props.nowMusicIndex].lrc).then((res)=>{
            let nowLyric = [...this.formatLyric(res.data),{co_time:1000, co_lyric: 'arrow'}];
            this.props.NOW_LYRIC_LIST(nowLyric);
        })
        if(this.props.musicPlayingState){
            this.lyricRunnig();
            this.interval = setInterval(()=>this.lyricRunnig(), 1000);
        }else{
            clearInterval(this.interval);
        }
    }

    componentDidUpdate(){
        if(this.props.musicPlayingState && this.interval==null){
            this.lyricRunnig();
            this.interval = setInterval(()=>this.lyricRunnig(), 1000);
        }else{
            clearInterval(this.interval);
            this.interval=null;
        }
    }
    
    lyricRunnig(){
        // 播放状态  歌词向上移动
        let nowMusicLyricIndex = this.props.nowMusicLyricIndex;
        if(nowMusicLyricIndex > 5){
            this.refs.lyricUl.style.top = -this.refs.lyricUl.firstElementChild.offsetHeight * (nowMusicLyricIndex-5) + "px";
        }else{
            this.refs.lyricUl.style.top = 0;
        }
    }

    formatLyric(nowLyric){
        const reg =  /\[([^\]]+)\]([^[]+)/g;
        let result = [];
        nowLyric.replace(reg,($0, $1, $2)=>{
            result.push({ co_time:this.timeFormat($1), co_lyric: $2})
        }); 
        return result;
    }

    timeFormat(time){
        let timeArr = time.split(":");  
        return parseInt(timeArr[0]*60) + parseInt(timeArr[1]);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
        this.interval=null;
    }

    toPic(){
        this.props.history.push("/songcover")
    }
    
}

function mapStateToProps(state){
    return{
        musicList : state.musicList,
        nowMusicIndex : state.nowMusicIndex,
        nowMusicLyricList : state.nowMusicLyricList,
        nowMusicLyricIndex : state.nowMusicLyricIndex,
        musicPlayingState : state.musicPlayingState
    };
}

function mapDispatchToProps(dispatch){
    return{
        WHICH_COM_NOW(which){
            dispatch({ type:'WHICH_COM_NOW', payload:which })
        },
        NOW_LYRIC_LIST(list){
            dispatch({ type:'NOW_LYRIC_LIST', payload:list })
        }
    };
}

let Lyric = connect(mapStateToProps,mapDispatchToProps)(LyricUI)

export default Lyric;