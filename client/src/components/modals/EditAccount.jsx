import React from 'react'
import axios from 'axios'

class EditAccount extends React.Component {

    constructor(props) {
        super(props)
        this.openEmailDialog = this.openEmailDialog.bind(this)
        this.openPasswordDialog = this.openPasswordDialog.bind(this)
        this.changeEmail = this.changeEmail.bind(this)
        this.changePassword = this.changePassword.bind(this)
        this.state = {
            emailOpen: false,
            passwordOpen: false,
            newMail: '',
            newPassword: ''
        }
    }

    openEmailDialog() {
        this.setState({
            emailOpen: !this.state.emailOpen
        })
    }

    openPasswordDialog() {
        this.setState({
            passwordOpen: !this.state.passwordOpen
        })
    }

    changeEmail() {
        const token = localStorage.getItem('user-token')
        const sendToken = {
            token: token,
            mail: this.state.newMail
        }  
        axios.post(`${process.env.REACT_APP_TEST}/api/users/update`, sendToken)
            .then((res) => {
                console.log(res.data);
            })
    }

    changePassword() {
        const token = localStorage.getItem('user-token')
        const sendToken = {
            token: token,
            password: this.state.newPassword
        }  
        axios.post(`${process.env.REACT_APP_TEST}/api/users/update`, sendToken)
            .then((res) => {
                console.log(res.data);
            })
    }

    render() {
        return (
            <div className="editAccountWrapper modal open">
                <a id="close" onClick={this.props.openEditAccount} className="close"><img src="/img/close.svg"></img></a>
                <h2>Edit your Account</h2>

                
                <h3>Change E-Mail Address</h3>
                <a onClick={this.openEmailDialog}>Edit</a>
                {this.state.emailOpen == true &&
                <div>
                    <input type="text" name="email" id=""/>
                    <a onClick={this.changeEmail}>Save</a>
                </div>
                }
                
                <h3>Change Password</h3>
                <a onClick={this.openPasswordDialog}>Edit</a>
                {this.state.passwordOpen == true &&
                <div>
                    <input type="text" name="password" id=""/>
                    <a onClick={this.changePassword}>Save</a>
                </div>
                }

                <h3>Delete your Account and all personal data</h3>
                <a onClick={this.openPasswordDialog}>Delete</a>

            </div>
        )
    }

}

export default EditAccount