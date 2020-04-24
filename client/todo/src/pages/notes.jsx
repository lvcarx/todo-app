import React from 'react';

class NotePage extends React.Component {

    constructor() {
        super()
        this.state = {
            loggedIn: JSON.parse(localStorage.getItem('loggedIn'))
        }
    }

    componentWillMount() {
        
    }

    render() {
        return(
          <div>
              <h1>NotesPage</h1>
          </div>  
        )
    }

}

export default NotePage