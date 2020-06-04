import React from 'react'
import axios from 'axios'

class UserModal extends React.Component {

    constructor(props) {
        super(props)
        this.openModal = this.openModal.bind(this)
        this.tryLogout = this.tryLogout.bind(this)
        this.closeModal = this.closeModal.bind(this)
        //this.updateImage = this.updateImage.bind(this)

        this.state = {
            accountModalOpen: false,
            editAccount: false,
            currentEmail: '',
            profilePicture: ''
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
                    currentEmail: resp.data.email,
                    profilePicture: resp.data.profilePicture
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

    closeModal() {
        this.setState({
            accountModalOpen: false
        })
    }

    updateImage() {
        console.log('called');
        const token = localStorage.getItem('user-token')
        const sendToken = {
            token: token
        }
        axios.post(`${process.env.REACT_APP_TEST}/api/users/currentUser`, sendToken)
            .then((resp) => {
                this.setState({
                    currentEmail: resp.data.email,
                    profilePicture: resp.data.profilePicture
                });
            })
    }

    render() {
        return (
            <div className="accountModalWrapper">
                    <img onClick={this.openModal} class="accountIcon" src="img/account.svg"></img>
                    <div class={this.state.accountModalOpen == true ? 'accountModal modal open' : 'modal accountModal'}>
                        <a id="close" onClick={this.closeModal} className="close"><img src="/img/close.svg"></img></a>
                        
                        <div className="wrapper profileSection">
                            {this.state.profilePicture &&
                            <div className="profilePictureWrapper">
                                <img className="profilePicture" src={this.state.profilePicture}></img>
                            </div>
                            }
                            <h3>Hi, {this.state.currentEmail}!</h3>
                        </div>

                       <li className=""><a onClick={this.tryLogout} className="link modalSection">Logout</a></li>
                       <li className=""><a onClick={this.props.openEditAccount} updateImage={this.updateImage} className="link modalSection">User Settings</a></li>
                    </div>
            </div>
        )
    }

}

export default UserModal