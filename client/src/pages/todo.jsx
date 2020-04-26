import React from 'react'
import axios from 'axios'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import Content from '../components/Content.jsx'
class NotePage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            userEmail: '',
            userID: ''
        }
    }

    componentWillMount() {
        const token = localStorage.getItem('user-token')
        const sendToken = {
            token: token
        }
        axios.post('http://localhost:8000/users/currentUser', sendToken)
            .then((resp) => {
                this.setState({
                    userEmail: resp.data.email,
                    userID: resp.data._id
                });
            })
    }

    /*shouldComponentUpdate(nextState) {
        return nextState.userID !== this.state.userID;
    }*/
  
    render() {
        return(
          <div>
              <Header />
              <Content userID={this.state.userID} userEmail={this.state.userEmail} />
              <Footer />
          </div>  
        )
    }

}

export default NotePage