import { createStore, combineReducers } from "redux";

function isIconBackHeaderReducer(state=true, action){
    if(action.type==="IS_ICON_BACK_HEADER"){
        return action.payload;
    }else{
        return state;
    }
}

function musicIDReducer(state="",action){
    if(action.type==="MUSIC_ID"){
        return action.payload;
    }else{
        return state;
    }
}

function isMusicPlayReducer(state=false, action){
    if(action.type==="IS_MUSIC_PLAY"){
        return action.payload;
    }else{
        return state;
    }
}

function musicTitleReducer(state="巅峰榜 热歌", action){
    if(action.type==="MUSIC_TITLE"){
        return action.payload;
    }else{
        return state;
    }
}

function preMusicIDReducer(state="", action){
    if(action.type==="PRE_MUSIC_ID"){
        return action.payload;
    }else{
        return state;
    }
}

function nextMusicIDReducer(state="", action){
    if(action.type==="NEXT_MUSIC_ID"){
        return action.payload;
    }else{
        return state;
    }
}

var reducer = combineReducers({
    isIconBackHeader : isIconBackHeaderReducer,
    musicID : musicIDReducer,
    isMusicPlay:isMusicPlayReducer,
    musicTitle:musicTitleReducer,
    preMusicID:preMusicIDReducer,
    nextMusicID:nextMusicIDReducer
})

var store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store;