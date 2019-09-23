import React, { Component } from "react";
import "./MusicList.css"

import { connect } from "react-redux";

import axios from "axios";

class MusicListUI extends Component{
    constructor(){
        super();
        this.state={
            songs:[]
        };
        this.isMove=false;
        this.touchMove=this.touchMove.bind(this);
        this.touchEnd=this.touchEnd.bind(this);
    }
    render(){
        return(
            <div id="musiclist">
                <ul>
                    {
                        this.state.songs.map((val,index)=>{
                            return(
                                <li className={ this.props.musicID===val.mid?"list_item selected":"list_item" } key={val.mid} onTouchMove={this.touchMove} onTouchEnd={()=>this.touchEnd(val.mid, val.title,index)}>
                                    <div className="sequence">{index+1}</div>
                                    <div className="details">
                                        <span className="title">{val.title}</span>
                                        <span className="singer">{val.author}</span>
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
        this.props.IS_ICON_BACK_HEADER();
        // 获取数据
        axios.get("/music/api",{
            params:{
                "key":523077333,
                "id":3641614987,
                "type":"songlist",
                "cache":1,
                "size":"hq"
            }
        }).then((res)=>{
            var Code = res.data.Code;
            if(Code==="OK"){
                this.setState({
                    songs:res.data.Body
                })
            }
        })
    }
    touchMove(){
        this.isMove=true;
    }
    touchEnd(mid, title, index){
        if(this.isMove){  // 滑动
            this.isMove=false;
        }else{  // 点击
            this.props.history.push("/lyric/"+mid);  // 编程式路由，点击去到lyric页
            // 一开始我放在调整后做的，不成功
            this.setState({
                whichOneSelected:mid
            })
            this.props.MUSIC_ID(mid);  // 点击改变mid  也就是歌曲的id
            this.props.IS_MUSIC_PLAY();  // 点击改变播放状态
            this.props.MUSIC_TITLE(title);
            var next_id = index;
            if(next_id==this.state.songs.length){
                next_id=-1;
            }
            this.props.NEXT_MUSIC_ID(this.state.songs[next_id+1].mid);  // 下一首歌的id
            var prev_id = index;
            if(prev_id==0){
                next_id=this.state.songs.length;
            }
            this.props.PRE_MUSIC_ID(this.state.songs[prev_id-1].mid);  // 上一首歌的id
        }
    }
}

function mapStateToProps(state){
    return{
        musicID:state.musicID
    };
}

function mapDispatchToProps(dispatch){
    return{
        IS_ICON_BACK_HEADER(){
            dispatch({type:"IS_ICON_BACK_HEADER",payload:false})
        },
        MUSIC_ID(id){
            dispatch({type:"MUSIC_ID",payload:id})
        },
        IS_MUSIC_PLAY(){
            dispatch({type:"IS_MUSIC_PLAY",payload:true})
        },
        MUSIC_TITLE(title){
            dispatch({type:"MUSIC_TITLE",payload:title})
        },
        NEXT_MUSIC_ID(next_id){
            dispatch({type:"NEXT_MUSIC_ID",payload:next_id})
        },
        PRE_MUSIC_ID(prev_id){
            dispatch({type:"PRE_MUSIC_ID",payload:prev_id})
        }
    };
}

var MusicList = connect(mapStateToProps,mapDispatchToProps)(MusicListUI)

export default MusicList;