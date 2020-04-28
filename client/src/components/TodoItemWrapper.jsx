import React from 'react'
import axios from 'axios'

class TodoItemWrapper extends React.Component {

    constructor(props) {
        super(props)
        this.deleteTodoItem = this.deleteTodoItem.bind(this)
        this.favoriteTodoItem = this.favoriteTodoItem.bind(this)
        this.handleTodoItem = this.handleTodoItem.bind(this)
        this.doneTodoItem = this.doneTodoItem.bind(this)
        this.localDoneTodoItem = this.localDoneTodoItem.bind(this)
        this.openTodoItem = this.openTodoItem.bind(this)
        this.createSection = this.createSection.bind(this)
        this.fetchSection = this.fetchSection.bind(this)
        this.onChangeSection = this.onChangeSection.bind(this)
        this.openSectionDialog = this.openSectionDialog.bind(this)
        this.closeSectionDialog = this.closeSectionDialog.bind(this)
        this.state = {
            notesInDB: [],
            noteAuthor: this.props.author,
            sectionName: '',
            sectionDialogOpen: false
        }
    }

    componentDidMount() {
        this.fetchSection();
    }

    openTodoItem(e) {
        const item = document.getElementById(e);
        item.classList.toggle('opened')
    }

    localDoneTodoItem(e) {
        const item = document.getElementById(e);
        item.classList.toggle('done')
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

    handleTodoItem(e) {
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

    onChangeSection(e) {
        this.setState({
            sectionName: e.target.value
       });
    }

    createSection(e) {
        const token = localStorage.getItem('user-token')
        const section = {
            token: token,
            sectionName: this.state.sectionName
        }
        axios.post('http://localhost:8000/api/sections/create', section)
            .then((resp) => {
                console.log(resp);
            })
        this.setState({
            sectionName: ''
        })
    }

    fetchSection() {
        const token = localStorage.getItem('user-token')
        const section = {
            token: token
        }
        axios.post('http://localhost:8000/api/sections/fetch', section)
            .then((resp) => {
                console.log(resp);
            })
    }

    openSectionDialog() {
        this.setState({
            sectionDialogOpen: true
        })
    }

    closeSectionDialog() {
        this.setState({
            sectionDialogOpen: false
        })
    }

    render() {
        return (
            <div className="todoItemWrapper">
                <h2>Today</h2>
                <a id="addSections" onClick={this.openSectionDialog}>Add new sections</a>
                <div id="dynamicSection" className={this.state.sectionDialogOpen == true ? 'dynamicSection open' : 'dynamicSection'}>
                    <input id="sectionName" type="text" onChange={this.onChangeSection} placeholder="Add a new task category..."></input>
                    <a onClick={() => {
                    this.createSection()
                    this.closeSectionDialog()
                    }}>Save and close</a>
                </div>

                {this.props.allNotes.map(note =>
                    <div className={note.favorite == true ? 'todoItem favorite' : 'todoItem'} id={note._id}>
                        <div className="wrapper">
                            <a className="done" onClick={() => {
                                this.doneTodoItem(note)
                                this.localDoneTodoItem(note._id)
                                }}></a>
                            <p className="todoItemContent">{note.name}</p>
                            <a className="edit" onClick={() => this.openTodoItem(note._id)}>Edit</a>
                        </div>
                        <div className="actionArea">
                            <a className="favorite" onClick={() => this.favoriteTodoItem(note)}><img src="/img/favorite.svg"></img></a>
                            <a className="delete" onClick={() => this.deleteTodoItem(note._id)}><img src="/img/close.svg"></img></a> 
                            <a className="handle" onClick={() => this.handleTodoItem(note._id)}><img src="/img/handle.svg"></img></a> 
                        </div> 
                    </div>  
                )}
            </div>
        )
    }
}

export default TodoItemWrapper