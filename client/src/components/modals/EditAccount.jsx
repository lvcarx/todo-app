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
        this.onChangeNewPassword = this.onChangeNewPassword.bind(this)
        this.onChangeNewPassword2 = this.onChangeNewPassword2.bind(this)
        this.onChangeNewEmail = this.onChangeNewEmail.bind(this)
        this.state = {
            emailOpen: false,
            passwordOpen: false,
            currentPassword: '',
            newMail: '',
            newPassword: '',
            newPassword2: '',
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

    onChangeNewEmail(e) {
        this.setState({
            newMail: e.target.value
        });
    }

    onChangeCurrentPassword(e) {
        this.setState({
            currentPassword: e.target.value
        });
    }

    onChangeNewPassword(e) {
        this.setState({
            newPassword: e.target.value
        });
    }

    onChangeNewPassword2(e) {
        this.setState({
            newPassword2: e.target.value
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
            email: this.state.newMail
        }  
        axios.post(`${process.env.REACT_APP_TEST}/api/users/update`, sendToken)
            .then((res) => {
                console.log(res.data);
            })
    }

    changePassword() {
        const token = localStorage.getItem('user-token')
        console.log(this.state.newPassword)
        const sendToken = {
            token: token,
            password: this.state.newPassword,
            password2: this.state.newPassword2
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

                <div className="settingSection">
                    <div className="wrapper">
                        <h3>Change E-Mail Address</h3>
                        <a onClick={this.openEmailDialog}>Edit</a>
                    </div>
                    {this.state.emailOpen == true &&
                    <div className="settingContent">
                        <label>Change your E-Mail
                        <input type="mail" name="email" id="" onChange={this.onChangeNewEmail} placeholder="Type your new E-Mail here..."/></label>
                        <a onClick={this.changeEmail} className="button">Save</a>
                    </div>
                    }
                </div>
                
                <div className="settingSection">
                    <div className="wrapper">
                        <h3>Change Password</h3>
                        <a onClick={this.openPasswordDialog}>Change</a>
                    </div>

                    {(this.state.passwordOpen == true && this.state.allowed == false) &&
                        <div className="settingContent">
                            <label>Current password
                            <input type="password" name="password" id="" onChange={this.onChangeCurrentPassword} placeholder="What's your current password?"/></label>
                            <a onClick={this.isUserAllowedToChangePassword} className="button">Continue</a>
                        </div>
                    }
                        {(this.state.allowed == true && this.state.passwordOpen == true) &&
                            <div className="settingContent">
                                <label>New password
                                <input type="password" name="password" id="" onChange={this.onChangeNewPassword} placeholder="Enter your new password"/>
                                <input type="password" name="password2" id="" onChange={this.onChangeNewPassword2} placeholder="Confirm your new password"/></label>
                                <a onClick={this.changePassword} className="button">Save</a>
                            </div>
                    }
                </div>

                <div className="settingSection">
                    <div className="wrapper">
                        <h3>Delete your Account and all personal data</h3>
                        <a onClick={this.openPasswordDialog}>Delete</a>
                    </div>
                </div>
            </div>
        )
    }

}

export default EditAccount