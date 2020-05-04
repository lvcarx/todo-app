import React from 'react'
import axios from 'axios'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import Content from '../components/Content.jsx'

class NotePage extends React.Component {

    constructor(props) {
        super(props)
        this.fetchSettings = this.fetchSettings.bind(this)
        this.state = {
            userEmail: '',
            userID: '',
            color: '',
            darkMode: ''
        }
    }

    componentWillMount() {
        const token = localStorage.getItem('user-token')
        const sendToken = {
            token: token
        }
        axios.post('/api/users/currentUser', sendToken)
            .then((resp) => {
                this.setState({
                    userEmail: resp.data.email,
                    userID: resp.data._id
                });
            })
        this.fetchSettings()
    }

    fetchSettings() {
        const token = localStorage.getItem('user-token')
        const sendToken = {
            token: token
        }
        axios.post('/api/settings/fetch', sendToken)
            .then((resp) => {
                this.setState({
                    darkMode: resp.data.darkMode,
                    color: resp.data.color
                });
            })
            console.log(this.state.darkMode)
            console.log(this.state.color)
    }

    render() {
        return(
          <div className={this.state.darkMode == true ? 'dark' : 'light'} id={this.state.color}>
              <Header fetchSettings={this.fetchSettings} darkMode={this.state.darkMode} color={this.state.color} />
              <Content userID={this.state.userID} userEmail={this.state.userEmail} />
              <Footer />
          </div>  
        )
    }

}

export default NotePage