import React from 'react'
import axios from 'axios'
import TodoItemWrapper from './TodoItemWrapper.jsx'
class Content extends React.Component {

    constructor(props) {
        super(props)
        this.createTodoItem = this.createTodoItem.bind(this)
        this.changeTodoItemText = this.changeTodoItemText.bind(this)
        this.fetchTodoItems = this.fetchTodoItems.bind(this)
        this.fetchSections = this.fetchSections.bind(this)
        
        this.state = {
            currentNote: '',
            currentTodo: '',
            notesInDB: [],
            sectionsInDB: [],
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
        const token = localStorage.getItem('user-token')
        const todo = {
            name: this.state.currentNote,
            author: token
        }
        this.setState({
            currentTodo: this.state.currentNote
        })
        axios.post(`${process.env.REACT_APP_TEST}/api/todo/create`, todo)
            .then(this.fetchTodoItems())
            .catch(err => console.log(err))
            .finally(this.fetchTodoItems());
    }

    shouldComponentUpdate(nextState, nextProps) {
        if (nextProps.author !== this.props.author) {
            return true;
        }
        if (nextState.notesInDB !== this.state.notesInDB) {
            return true;
        }
        return false;
    }

    componentDidMount() {
        this.fetchTodoItems();
        this.fetchSections();
    }

    fetchTodoItems() {
        const token = localStorage.getItem('user-token')
        const sendToken = {
            token: token
        }
        axios.post(`${process.env.REACT_APP_TEST}/api/todo/fetch`, sendToken)
            .then((res) => {
                this.setState({
                    notesInDB: res.data
                });
            })
    }

    fetchSections() {
        const token = localStorage.getItem('user-token')
        const sendToken = {
            token: token
        }  
        axios.post(`${process.env.REACT_APP_TEST}/api/sections/fetch`, sendToken)
            .then((res) => {
                this.setState({
                    sectionsInDB: res.data[0].sections
                });
            })
    }
    
    render() {
        return (
            <div className="content">
                <div className="itemForm">
                    <form id="form">
                        <div className="inputWrapper">
                            <p id="errorNotice"></p>
                            <input type="text" id="box" onChange={this.changeTodoItemText} placeholder="Add a task..."></input>
                            <a type="button" id="submit" value="Add to list" onClick={this.createTodoItem}>Add to list</a>
                        </div>
                    </form>
                </div>
                <TodoItemWrapper fetchSections={this.fetchSections} sections = {this.state.sectionsInDB} fetchTodoItems={this.fetchTodoItems} allNotes = {this.state.notesInDB}/>
            </div>
        )
    }
}

export default Content