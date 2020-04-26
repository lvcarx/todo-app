import React from 'react'

class TodoItem extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.todoItems !== this.props.todoItems) {
            return true;
        } 
       
    }

    render() {
        return (
            this.props.todoItems.map(note =>
                <p>{note.name}</p>
            )
        )
    }

}

export default TodoItem