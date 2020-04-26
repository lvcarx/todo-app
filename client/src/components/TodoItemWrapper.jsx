import React from 'react'
import axios from 'axios'
import TodoItem from './TodoItem'

class TodoItemWrapper extends React.Component {

    constructor(props) {
        super(props)
        this.fetchTodoItems = this.fetchTodoItems.bind(this)
        this.state = {
            notesInDB: [],
            noteAuthor: this.props.author
        }
    }
    
    fetchTodoItems() {
        const user = {
            author: this.props.author
        } 
        console.log(user)
        axios.post('http://localhost:8000/api/todo/fetch', user) 
            .then((res) => {
                console.log(res.data)
                this.setState({
                    notesInDB: res.data
                });
                console.log(this.state.notesInDB);
            })
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.author !== this.props.author) {
            return true;
        }
        return false;
    }

    componentDidUpdate() {
       this.fetchTodoItems()
    }

    

    render() {
        return (
            <div className="todoItemWrapper">
                <TodoItem todoItems = {this.state.notesInDB} />
            </div>
        )
    }

}

export default TodoItemWrapper