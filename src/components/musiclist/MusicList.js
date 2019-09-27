import React, { Component } from "react";
import "./MusicList.css"

import { connect } from "react-redux";

class MusicListUI extends Component{
    constructor(){
        super();
        this.isMoving=false;  // 默认没有在滑动
    }

    render(){
        return(
            <div id="musiclist">
                <ul ref = "listUl">
                    {
                        this.props.musicList.map((val, index)=>{
                            return(
                                <li className={ this.props.nowMusicIndex===index ? "list_item selected" : "list_item"} onTouchMove={ ()=>this.isMove() } onTouchEnd={ ()=>this.isClick(index) } key={ val.mid }>
                                    <div className="sequence">{ index+1 }</div>
                                    <div className="details">
                                        <span className="title">{ val.title }</span>
                                        <span className="singer">{ val.author }</span>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        );
    }

    componentDidMount(){
        this.props.WHICH_COM_NOW("musiclist");
        let listUl = this.refs.listUl;
        document.documentElement.scrollTop = listUl.firstElementChild.offsetHeight * (this.props.nowMusicIndex-5);
    }

    isMove(){  // 用户在滑动
        this.isMoving = true;  // 这里可以直接赋值只因为渲染时其实没有用到这个变量
    }

    isClick(index){  
        if(this.isMoving){  // 用户是在滑动
            this.isMoving = false;  // 滑动结束后
        }else{  // 这就是在真正点击
            this.props.NOW_MUSIC_INDEX(index);  // 点击将index放入状态管理
            this.props.history.push("/lyric");  // 点击实现跳转
            this.props.MUSIC_PLAYING_STATE(true);// 点击改变播放状态
        }
    }
   
}

function mapStateToProps(state){
    return{
        musicList : state.musicList,
        nowMusicIndex : state.nowMusicIndex
    };
}

function mapDispatchToProps(dispatch){
    return{
        NOW_MUSIC_INDEX(index){
            dispatch({ type:'NOW_MUSIC_INDEX', payload:index })
        },
        MUSIC_PLAYING_STATE(boolen){
            dispatch({ type:'MUSIC_PLAYING_STATE', payload:boolen })
        },
        WHICH_COM_NOW(which){
            dispatch({ type:'WHICH_COM_NOW', payload:which })
        }
    };
}

let MusicList = connect(mapStateToProps,mapDispatchToProps)(MusicListUI)

export default MusicList;