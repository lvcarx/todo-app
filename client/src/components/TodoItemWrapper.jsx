import React from 'react'
import axios from 'axios'

class TodoItemWrapper extends React.Component {

    constructor(props) {
        super(props)
        this.deleteTodoItem = this.deleteTodoItem.bind(this)
        this.favoriteTodoItem = this.favoriteTodoItem.bind(this)
        
        this.state = {
            notesInDB: [],
            noteAuthor: this.props.author
        }
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
                    <div>
                        <p>{note.name}</p>
                        <p onClick={() => this.doneTodoItem(note)}>Done item</p>
                        <p onClick={() => this.favoriteTodoItem(note)}>Favorite item</p>
                        <p onClick={() => this.deleteTodoItem(note._id)}>Delete item</p>  
                    </div>  
                )}
               
              {/* <li class="listElement task:3 favoriteItem opened" id="task:3todoItemsisFav">
                   <a id="check" class="check" onclick="checkListItem(this)"></a>
                   <a class="textWrapper">wdqwwq</a><a class="edit" id="edit" onclick="focuseItem(this)">Edit</a>
                   <a class="actionArea" id="actionArea"><a class="button handle">
                       <img class="handle light" src="img/handle2.svg">
                           <img class="handle dark" src="img/dark/handle-dark.svg"></a>
                           <a id="delete" class="button delete" onclick="removeListItem(this)">
                               <img class="button light delete" src="img/close2.svg">
                                   <img class="button delete dark" src="img/dark/close-dark.svg"></a>
                                   <a id="favorite" onclick="removeFavoriteListItem(this)" class="button favoriteButton">
                                       <img class="button light favoriteButton" src="img/favorite2.svg">
                                           <img class="button favoriteButton dark" src="img/dark/favorite-dark.svg"></a></a></li>
                */}
                
            </div>
        )
    }



}

export default TodoItemWrapper