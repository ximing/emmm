/**
 * Created by yeanzhi on 17/4/12.
 */
'use strict';
import React, {Component} from "react";
import Item from './Item';
import {observer,inject} from '../main.js';

@inject('todo') @observer 
export default class DemoContainer extends Component{
    render(){
        return (
            <div>
                {
                    this.props.todo.list.map((todo,i)=>{
                        return(
                            <Item todo={todo} key={i}></Item>
                        )
                    })
                }
                
            </div>
        )
    }
}
