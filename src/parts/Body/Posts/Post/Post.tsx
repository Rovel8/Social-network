import React from "react";
import classes from './Post.module.css'
import {PostsType} from "../../../../Types/Types";


const Post: React.FC<PostsType> = (props) => {


    return (
        <div className={classes.Post}>
            <div className={classes.message}>{props.message}</div>
            <span className={classes.userInfo}>{props.name}, {props.age}</span>
            <img src="https://www.meme-arsenal.com/memes/b5d2ec8e1ffa887b239fb66a8653dfe6.jpg" alt=""/>
            <div className={classes.likes}>{props.likeCounts} likes</div>
        </div>
    );
}

export default Post