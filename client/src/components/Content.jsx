import React from 'react'
import axios from 'axios'
import TodoItemWrapper from './TodoItemWrapper.jsx'

class Content extends React.Component {

    constructor(props) {
        super(props)
        this.createTodoItem = this.createTodoItem.bind(this)
        this.changeTodoItemText = this.changeTodoItemText.bind(this)
        this.state = {
            currentNote: '',
            userID: this.props.userID,
            userEmail: this.props.userEmail
        }
    }

    changeTodoItemText(e) {
        this.setState({
            currentNote: e.target.value
        });
    }

    createTodoItem() {
        const todo = {
            name: this.state.currentNote,
            author: this.props.userID
        }
        axios.post('http://localhost:8000/api/todo/create', todo)
            .then()
            .catch()
    }
    
    render() {
        return (
            <div className="content">
                <div>
                    <form id="form">
                        <div class="inputWrapper">
                            <p id="errorNotice"></p>
                            <input type="text" id="box" onChange={this.changeTodoItemText} placeholder="Add a task..."></input>
                            <a type="button" id="submit" value="Add to list" onClick={this.createTodoItem}>Add to list</a>
                        </div>
                    </form>
                </div>
                <TodoItemWrapper author = {this.props.userID} />
            </div>
        )
    }

}

export default Content