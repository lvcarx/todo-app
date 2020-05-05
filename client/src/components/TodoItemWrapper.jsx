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
        this.chooseSection = this.chooseSection.bind(this)
        this.deleteSection = this.deleteSection.bind(this)
        this.changeSectionInItem = this.changeSectionInItem.bind(this)
        this.closeCategoryDialog = this.closeCategoryDialog.bind(this)

        this.state = {
            notesInDB: [],
            noteAuthor: this.props.author,
            sectionName: '',
            sectionDialogOpen: false,
            currentSection: 'all',
            categoryModalOpen: false
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
        const token = localStorage.getItem('user-token')
        const todo = {
            token: token,
            todoItem: e,
            done: !e.done
        }
        console.log(todo)
        axios.post(`${process.env.REACT_APP_TEST}/api/todo/update`, todo)
            .then(this.props.fetchTodoItems())
            .catch(err => console.log(err)) 
            .finally(this.props.fetchTodoItems())
    }

    favoriteTodoItem(e) {
        const token = localStorage.getItem('user-token')
        const todo = {
            token: token,
            todoItem: e,
            favorite: !e.favorite
        }
        console.log(todo)
        axios.post(`${process.env.REACT_APP_TEST}/api/todo/update`, todo)
            .then(this.props.fetchTodoItems())
            .catch(err => console.log(err)) 
            .finally(this.props.fetchTodoItems())
    }

    handleTodoItem(e) {
        const item = document.getElementById(e);
        item.classList.add('categoryModalOpen')
    }

    deleteTodoItem(e) {
        const token = localStorage.getItem('user-token')
        const todo = {
            token: token,
            todoItem: e
        }
        axios.post(`${process.env.REACT_APP_TEST}/api/todo/delete`, todo)
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
        axios.post(`${process.env.REACT_APP_TEST}/api/sections/create`, section)
            .then(this.props.fetchSections())
            .catch(err => console.log(err)) 
            .finally(this.props.fetchTodoItems())
        this.setState({
            sectionName: ''
        })
    }

    fetchSection() {
        const token = localStorage.getItem('user-token')
        const section = {
            token: token
        }
        axios.post(`${process.env.REACT_APP_TEST}/api/sections/fetch`, section)
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

    closeCategoryDialog(e) {
        /*this.setState({
            categoryModalOpen: false
        })*/
        const item = document.getElementById(e);
        item.classList.remove('categoryModalOpen')
    }

    chooseSection(e) {
        this.setState({
            currentSection: e
        })
    }

    deleteSection(e) {
        const token = localStorage.getItem('user-token')
        const section = {
            token: token,
            sections: e
        }
        console.log(section);
        axios.post(`${process.env.REACT_APP_TEST}/api/sections/delete`, section)
            .then(this.props.fetchSections())
            .catch(err => console.log(err)) 
            .finally(this.props.fetchSections())
    }

    changeSectionInItem(todoId, section) {
        const token = localStorage.getItem('user-token')
        const todo = {
            todoItem: todoId,
            token: token,
            category: section
        }
        axios.post(`${process.env.REACT_APP_TEST}/api/todo/update`, todo)
            .then(this.props.fetchTodoItems())
            .catch(err => console.log(err)) 
            .finally(this.props.fetchTodoItems())
    }

    render() {
        if (this.state.currentSection == 'all') {
            return (
                <div className="todoItemWrapper">
                    <h2>Get stuff done!</h2>

                    <a id="addSections" onClick={this.openSectionDialog}>Add new sections</a>
                    <div id="dynamicSection" className={this.state.sectionDialogOpen == true ? 'dynamicSection open' : 'dynamicSection'}>
                        <input id="sectionName" type="text" onChange={this.onChangeSection} placeholder="Add a new task category..."></input>
                        <a onClick={() => {
                            this.createSection()
                            this.closeSectionDialog()
                        }}>Save and close</a>
                    </div>

                    <div className="sections">
                    <div className={this.state.currentSection == 'all' ? 'sectionWrapper current' : 'sectionWrapper'}>
                            <span className="section" onClick={() => this.chooseSection('all')}>All</span>
                    </div>
                        {this.props.sections.map(section =>          
                                <div className={this.state.currentSection == section ? 'sectionWrapper current' : 'sectionWrapper'}>
                                    <span className="section" onClick={() => this.chooseSection(section)}>{section}</span>
                                    <a><img onClick={() => this.deleteSection(section)} className="close" src="/img/deleteCategory.svg"></img></a>
                                </div>
                        )}
                    </div>
                    
                    {this.props.allNotes.map(note =>
                        <div className={`todoItem ${note.favorite == true ? 'favorite' : ''} ${note.done == true ? 'done' : ''} `} id={note._id}>
                            <div className="wrapper">
                                <a className="done" onClick={() => this.doneTodoItem(note)}></a>
                                <p className="todoItemContent">{note.name}</p>
                                <a className="edit" onClick={() => this.openTodoItem(note._id)}>Edit</a>
                            </div>
                            <div className="actionArea">
                                <a className="favorite" onClick={() => this.favoriteTodoItem(note)}><img src="/img/favorite.svg"></img></a>
                                <a className="delete" onClick={() => this.deleteTodoItem(note._id)}><img src="/img/close.svg"></img></a> 
                                <a className="handle" onClick={() => this.handleTodoItem(note._id)}><img src="/img/handle.svg"></img></a> 
                            </div> 
                            <div className={this.state.categoryModalOpen == true ? 'changeSection modal open' : 'changeSection modal'} id={note._id}>
                                <a id="close" onClick={() => this.closeCategoryDialog(note._id)} className="close"><img src="/img/close.svg"></img></a>
                                <h2>Change Section</h2>
                                <div className="sectionWrapper">
                                {this.props.sections.map(section => 
                                    <span className={note.category == section ? 'current' : ''} onClick={() => this.changeSectionInItem(note._id, section)}>{section}</span>   
                                )}
                                </div>
                            </div>
                        </div>  
                    )}
                </div>
            )
        } else {
            return (
            <div className="todoItemWrapper">
                    <h2>Get stuff done!</h2>

                    <a id="addSections" onClick={this.openSectionDialog}>Add new sections</a>
                    <div id="dynamicSection" className={this.state.sectionDialogOpen == true ? 'dynamicSection open' : 'dynamicSection'}>
                        <input id="sectionName" type="text" onChange={this.onChangeSection} placeholder="Add a new task category..."></input>
                        <a onClick={() => {
                            this.createSection()
                            this.closeSectionDialog()
                        }}>Save and close</a>
                    </div>

                    <div className="sections">
                    <div className='sectionWrapper'>
                            <span className="section" onClick={() => this.chooseSection('all')}>All</span>
                    </div>
                        {this.props.sections.map(section =>          
                                <div className={this.state.currentSection == section ? 'sectionWrapper current' : 'sectionWrapper'}>
                                    <span className="section" onClick={() => this.chooseSection(section)}>{section}</span>
                                    <a><img onClick={() => this.deleteSection(section)} className="close" src="/img/deleteCategory.svg"></img></a>
                                </div>
                        )}
                    </div>
                    
                    {this.props.allNotes.filter(note => note.category == this.state.currentSection).map(note =>
                        <div className={`todoItem ${note.favorite == true ? 'favorite' : ''} ${note.done == true ? 'done' : ''} `} id={note._id}>
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
                            <div className={this.state.categoryModalOpen == true ? 'changeSection modal open' : 'changeSection modal'} id={note._id}>
                                <h2>Change Section</h2>
                                <div className="sectionWrapper">
                                {this.props.sections.map(section => 
                                    <span className={note.category == section ? 'current' : ''} onClick={() => this.changeSectionInItem(note._id, section)}>{section}</span>
                                )}
                                </div>
                            </div>
                        </div>  
                    )}
                </div>
            )
        }
    }
    
}

export default TodoItemWrapper