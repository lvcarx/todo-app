import axios from 'axios'
import React from 'react'
import SettingsModal from '../components/modals/SettingsModal.jsx'
import UserModal from '../components/modals/UserModal.jsx'
import EditAccount from './modals/EditAccount.jsx'

class Header extends React.Component {

    constructor(props) {
        super(props)
        this.openModal = this.openModal.bind(this)
        this.openEditAccount = this.openEditAccount.bind(this)
        this.state = {
            showModal: false,
            darkMode: false,
            color: '',
            editAccount: false
        }
    }

    openModal() {
        this.setState({
            showModal: true
        })
    }

    closeModal() {
        this.setState({
            showModal: false
        })
    }

    componentDidMount() {
        this.props.fetchSettings();
    }

    openEditAccount() {
        this.setState({
            editAccount: !this.state.editAccount
        })
        console.log(this.state.editAccount);
    }

    render() {
        return (
            <header className="header">
                <img className="logo" src="/img/logo.svg"></img>
                <img className="settingsIcon" src="/img/settings.svg" onClick={this.openModal}></img>
                <SettingsModal grandchildFetchSettings={this.props.fetchSettings} closeModal2={() => this.closeModal()} opened = {this.state.showModal} darkMode={this.props.darkMode} color={this.props.color} />
                <UserModal openEditAccount={this.openEditAccount} />

                {this.state.editAccount == true &&
                        <EditAccount  openEditAccount={this.openEditAccount} />
                }

            </header>
        )
    }
}

export default Header