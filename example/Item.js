import React,{Component} from 'react';
export default class extends Component{
    render(){
        console.log(this.props)
        return(
            <div>
                {this.props.todo.content}
                {this.props.todo.userName}
            </div>
        )
    }
}
