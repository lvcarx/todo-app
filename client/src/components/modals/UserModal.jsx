import React from 'react'
import axios from 'axios'

class UserModal extends React.Component {

    constructor(props) {
        super(props)
        this.openModal = this.openModal.bind(this)
        this.tryLogout = this.tryLogout.bind(this)
        this.state = {
            accountModalOpen: false
        }
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

    removeAccount() {
        const token = localStorage.getItem('user-token');
        axios.post('/api/users/delete', token)
            .then((resp) => {
                localStorage.removeItem("user-token", resp.data);
                window.location.reload(false);
            })
    }

    render() {
        return (
            <div className="accountModalWrapper">
                   <img onClick={this.openModal} class="accountIcon" src="img/account.svg"></img>
                   <div class={this.state.accountModalOpen == true ? 'accountModal opened' : 'accountModal'}><h3>Hi, yolanda@streber10222.de!</h3>
                       <li><a class="link">Logout</a></li>
                       <li><a class="link">Delete your account</a></li>
                       <p><a class="link" href="/"></a></p>
                    </div>
            </div>
        )
    }

}

export default UserModal