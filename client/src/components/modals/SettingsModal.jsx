import React from 'react'
import Header from '../Header.jsx'
class SettingsModal extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        
        return (
            <div className={this.props.opened === true ? 'modal open' : 'modal'} id="settingsModal">
                <a id="close" onClick={this.props.closeModal2} className="close"><img src="/img/close.svg" className="light"></img></a>
                <h2>Settings</h2>
                <div className="">
                    <h3>Appearance</h3>
                    <a className="" id="darkModeToggle">Dark Mode</a>
                    <h4>Colors</h4>
                    <div className="colorPicker">
                        <a className="color blue" id="blueMode"></a>
                        <a className="color green" id="greenMode"></a>
                        <a className="color pink" id="pinkMode"></a>
                    </div>

                    <h3>Reset App (Developer)</h3>        
                    <a>Delete all data</a>

                </div>
            </div>
        )
    }

}

export default SettingsModal