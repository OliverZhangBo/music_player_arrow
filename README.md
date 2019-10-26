This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### V 0.0.1
时间： 2019.9.23
简单地完成了初步的模型，包括四个主要组件，Header，Footer，musicList，Lyric
1. 数据来源
    通过反向代理得到歌曲列表，包括 mid， 歌曲名， 歌手， 歌曲链接， 歌词链接， 图片链接
2. 组件
    1）Header, 通过编程式路由实现从 Lyric 跳转到 musicList；
    2）musicList， 通过反向代理获取数据，获得音乐列表；通过动态路由实现 musicList 跳转到 Lyric 页；通过 mid 来确定哪一首歌被选中
    3）Footer, 通过 play() pause() 控制播放暂停， 通过mid确定哪一首歌播放
    4）Lyric， 通过 currTime 来确定目前应该播放的歌词 
3. store
    1）播放状态  是否在播放
    2）播放音乐id

### V 0.1.0
时间： 2019.9.24 
先解释一下为什么版本直接变成0.1.0了，因为这一次的修改将会很大
1. 音乐数据将会放到store中
2. 全用ES6写法
3. 删除id = app 的 div 

4. 剪影

![Image text](https://github.com/Arrow-zb/music_player_arrow/blob/master/arrow%20musicplayer%20screen%20shot/musicList.png)

![Image text](https://github.com/Arrow-zb/music_player_arrow/blob/master/arrow%20musicplayer%20screen%20shot/lyric.png)

![Image text](https://github.com/Arrow-zb/music_player_arrow/blob/master/arrow%20musicplayer%20screen%20shot/pic.png)













备份 api "backup" : "https://api.mlwei.com/"

