import React from 'react'
import axios from 'axios'

class UserModal extends React.Component {

    constructor(props) {
        super(props)
        this.openModal = this.openModal.bind(this)
        this.tryLogout = this.tryLogout.bind(this)
        this.removeAccount = this.removeAccount.bind(this)
        // this.openEditAccount = this.openEditAccount.bind(this)
        this.reloadAfterDeletion = this.reloadAfterDeletion.bind(this)
        this.state = {
            accountModalOpen: false,
            editAccount: false,
            currentEmail: ''
        }
    }

    componentDidMount() {
        const token = localStorage.getItem('user-token')
        const sendToken = {
            token: token
        }
        axios.post(`${process.env.REACT_APP_TEST}/api/users/currentUser`, sendToken)
            .then((resp) => {
                this.setState({
                    currentEmail: resp.data.email
                });
            })
    }

    openModal() {
        this.setState({
            accountModalOpen: !this.state.accountModalOpen
        })
    }

    tryLogout() {
        localStorage.removeItem('user-token');
        window.location.reload(false);
    }

    render() {
        return (
            <div className="accountModalWrapper">
                    <img onClick={this.openModal} class="accountIcon" src="img/account.svg"></img>
                    <div class={this.state.accountModalOpen == true ? 'accountModal opened' : 'accountModal'}><h3>Hi, {this.state.currentEmail}!</h3>
                       <li><a onClick={this.tryLogout} class="link">Logout</a></li>
                       <li><a onClick={this.props.openEditAccount} class="link">User Settings</a></li>
                    </div>
            </div>
        )
    }

}

export default UserModal