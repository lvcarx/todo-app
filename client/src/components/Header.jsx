import axios from 'axios'
import React from 'react'
import SettingsModal from '../components/modals/SettingsModal.jsx'

class Header extends React.Component {

    constructor(props) {
        super(props)
        this.openModal = this.openModal.bind(this)
        //this.fetchSettings = this.fetchSettings.bind(this)
        this.state = {
            showModal: false,
            darkMode: false,
            color: ''
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

    /*fetchSettings() {
        const token = localStorage.getItem('user-token')
        const sendToken = {
            token: token
        }
        axios.post('http://localhost:8000/api/settings/fetch', sendToken)
            .then((resp) => {
                this.setState({
                    darkMode: resp.data.darkMode,
                    color: resp.data.color
                });
            })
    }*/

    render() {
        return (
            <header className="header">
                <img className="logo" src="/img/logo.svg"></img>
                <img className="settingsIcon" src="/img/settings.svg" onClick={this.openModal}></img>
                <SettingsModal grandchildFetchSettings={this.props.fetchSettings} closeModal2={() => this.closeModal()} opened = {this.state.showModal} darkMode={this.props.darkMode} color={this.props.color} />
            </header>
        )
    }
}

export default Header