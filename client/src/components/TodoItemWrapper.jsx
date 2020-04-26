import React from 'react'
import axios from 'axios'
import TodoItem from './TodoItem'
class TodoItemWrapper extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            notesInDB: [],
            noteAuthor: this.props.author
        }
    }

    render() {
        return (
            <div className="todoItemWrapper">
                {this.props.allNotes.map(note =>
                    <p>{note.name}</p>)}
               
            </div>
        )
    }



}

export default TodoItemWrapper