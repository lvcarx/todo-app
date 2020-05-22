import React from 'react'
import axios from 'axios'
class SettingsModal extends React.Component {

    constructor(props) {
        super(props)
        this.changeColorSettings = this.changeColorSettings.bind(this)
        this.changeDarkModeSettings = this.changeDarkModeSettings.bind(this)
        this.state = {
            darkMode: this.props.darkMode,
            color: this.props.color
        }
    }

    changeDarkModeSettings() {
        const token = localStorage.getItem('user-token')
        const setting = {
            token: token,
            darkMode: !this.props.darkMode
        }
        axios.post(`${process.env.REACT_APP_TEST}/api/settings/update`, setting)
            .then(this.props.grandchildFetchSettings())
            .catch(err => console.log(err)) 
            .finally(this.props.grandchildFetchSettings());
    }

    changeColorSettings(e) {
        const token = localStorage.getItem('user-token')
        const setting = {
            token: token,
            color: e
        }
        axios.post(`${process.env.REACT_APP_TEST}/api/settings/update`, setting)
            .then(this.props.grandchildFetchSettings())
            .catch(err => console.log(err)) 
            .finally(this.props.grandchildFetchSettings());
    }

    render() {
        return (
            <div className={this.props.opened === true ? 'modal open' : 'modal'} id="settingsModal">
                <a id="close" onClick={this.props.closeModal2} className="close"><img src="/img/close.svg"></img></a>
                <h2>Settings</h2>
                <div className="">
                    <h3>Appearance</h3>
                    <a className={this.props.darkMode == true ? 'true' : 'false'} id="darkModeToggle" onClick={this.changeDarkModeSettings}>Dark Mode</a>
                    <h4>Colors</h4>
                    <div className="wrapper">
                        <a className="color blue" id="blueMode" onClick={() => this.changeColorSettings('blue')}></a>
                        <a className="color green" id="greenMode" onClick={() => this.changeColorSettings('green')}></a>
                        <a className="color pink" id="pinkMode" onClick={() => this.changeColorSettings('pink')}></a>
                    </div>
                </div>
            </div>
        )
    }

}

export default SettingsModal