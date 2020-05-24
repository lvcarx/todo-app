import React from 'react'
import axios from 'axios'

class EditAccount extends React.Component {

    constructor(props) {
        super(props)
        this.openEmailDialog = this.openEmailDialog.bind(this)
        this.openPasswordDialog = this.openPasswordDialog.bind(this)
        this.changeEmail = this.changeEmail.bind(this)
        this.changePassword = this.changePassword.bind(this)
        this.isUserAllowedToChangePassword = this.isUserAllowedToChangePassword.bind(this)
        this.onChangeCurrentPassword = this.onChangeCurrentPassword.bind(this)
        
        this.state = {
            emailOpen: false,
            passwordOpen: false,
            currentPassword: '',
            newMail: '',
            newPassword: '',
            allowed: false
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

    onChangeCurrentPassword(e) {
        this.setState({
            currentPassword: e.target.value
        });
    }

    isUserAllowedToChangePassword() {
        const token = localStorage.getItem('user-token')
        const sendUser = {
            token: token,
            password: this.state.currentPassword
        }  
        axios.post(`${process.env.REACT_APP_TEST}/api/users/changePassword`, sendUser)
            .then((res) => {
                console.log("WORKS? " + res.data.authenticated);
                this.setState({
                    allowed: res.data.authenticated
                });
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
                    <label>Change your E-Mail
                    <input type="text" name="email" id="" placeholder="Type your new E-Mail here..."/></label>
                    <a onClick={this.changeEmail}>Save</a>
                </div>
                }
                
                <h3>Change Password</h3>
                <a onClick={this.openPasswordDialog}>Change</a>
                {this.state.passwordOpen == true &&
                    <div>
                        <label>Current password
                        <input type="text" name="password" id="" onChange={this.onChangeCurrentPassword} placeholder="What's your current password?"/></label>
                        <a onClick={this.isUserAllowedToChangePassword}>Save</a>
                    </div>
                }
                    {this.state.allowed == true &&
                        <div>
                            <label>New password
                            <input type="text" name="password" id="" placeholder=""/></label>
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