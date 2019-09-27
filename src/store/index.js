import { createStore, combineReducers } from "redux";

function musicListReducer(state=[], action){
    if(action.type === 'MUSIC_LIST'){
        return action.payload;
    }else{
        return state;
    }
}

function nowMusicIndexReducer(state=0, action){
    if(action.type === 'NOW_MUSIC_INDEX'){
        return action.payload;
    }else{
        return state;
    }
}

function musicPlayingStateReducer(state=false, action){
    if(action.type === 'MUSIC_PLAYING_STATE'){
        return action.payload;
    }else{
        return state;
    }
}

function whichComponentNowReducer(state='', action){
    if(action.type === 'WHICH_COM_NOW'){
        return action.payload;
    }else{
        return state;
    }
}

function nowMusicLyricListReducer(state=[], action){
    if(action.type === 'NOW_LYRIC_LIST'){
        return action.payload;
    }else{
        return state;
    }
}

function nowMusicLyricIndexReducer(state=0, action){
    if(action.type === 'NOW_LYRIC_INDEX'){
        return action.payload;
    }else{
        return state;
    }
}

function nowMusicPicReducer(state='', action){
    if(action.type === 'NOW_MUSIC_PIC'){
        return action.payload;
    }else{
        return state;
    }
}

var reducer = combineReducers({
   musicList : musicListReducer,
   nowMusicIndex : nowMusicIndexReducer,
   musicPlayingState : musicPlayingStateReducer,
   whichComponentNow : whichComponentNowReducer,
   nowMusicLyricList : nowMusicLyricListReducer,
   nowMusicLyricIndex : nowMusicLyricIndexReducer,
   nowMusicPic : nowMusicPicReducer,
})

var store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store;