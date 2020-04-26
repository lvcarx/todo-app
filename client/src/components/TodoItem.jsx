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
        return false
    }

    render() {
        return (
            null
            
        )
    }

}

export default TodoItem