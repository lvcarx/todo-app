import React from 'react'
import axios from 'axios'

class TodoItemWrapper extends React.Component {

    constructor(props) {
        super(props)
        this.deleteTodoItem = this.deleteTodoItem.bind(this)
        this.favoriteTodoItem = this.favoriteTodoItem.bind(this)
        this.doneTodoItem = this.doneTodoItem.bind(this)
        this.openTodoItem = this.openTodoItem.bind(this)
        this.state = {
            notesInDB: [],
            noteAuthor: this.props.author
        }
    }

    openTodoItem(e) {
        const item = document.getElementById(e);
        console.log(e);
        item.classList.toggle('opened')
    }

    doneTodoItem(e) {
        const todo = {
            author: this.props.author,
            todoItem: e,
            done: !e.done
        }
        axios.post('http://localhost:8000/api/todo/update', todo)
            .then(this.props.fetchTodoItems())
            .catch(err => console.log(err)) 
            .finally(this.props.fetchTodoItems())
    }

    favoriteTodoItem(e) {
        const todo = {
            author: this.props.author,
            todoItem: e,
            favorite: !e.favorite
        }
        axios.post('http://localhost:8000/api/todo/update', todo)
            .then(this.props.fetchTodoItems())
            .catch(err => console.log(err)) 
            .finally(this.props.fetchTodoItems())
    }

    deleteTodoItem(e) {
        const todo = {
            author: this.props.author,
            todoItem: e
        }
        console.log(todo);
        axios.post('http://localhost:8000/api/todo/delete', todo)
            .then(this.props.fetchTodoItems())
            .catch(err => console.log(err)) 
            .finally(this.props.fetchTodoItems())
    }

    render() {
        return (
            <div className="todoItemWrapper">
                {this.props.allNotes.map(note =>
                    <div className="todoItem" id={note._id}>
                        <div className="wrapper">
                            <a className="done" onClick={() => this.doneTodoItem(note)}></a>
                            <p className="todoItemContent">{note.name}</p>
                            <a className="edit" onClick={() => this.openTodoItem(note._id)}>Edit</a>
                        </div>
                        <div className="actionArea">
                            <a className="favorite" onClick={() => this.favoriteTodoItem(note)}><img src="/img/favorite.svg"></img></a>
                            <a className="delete" onClick={() => this.deleteTodoItem(note._id)}><img src="/img/close.svg"></img></a> 
                        </div> 
                    </div>  
                )}
            </div>
        )
    }
}

export default TodoItemWrapper