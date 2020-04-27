import React from 'react'

class SettingsModal extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    

    render() {
        console.log(this.props.darkMode);
        console.log(this.props.color);
        return (
            <div className="modal" id="settingsModal">
                <h2>Settings</h2>
                <div className="content">
                    <h3>Appearance</h3>
                    <a className="" id="darkModeToggle">Dark Mode</a>
                    <h4>Colors</h4>
                    <div className="colorPicker">
                        <a className="color blue" id="blueMode"></a>
                        <a className="color green" id="greenMode"></a>
                        <a className="color pink" id="pinkMode"></a>
                    </div>

                    <h3>Reset App (Developer)</h3>        
                    <a onclick="clearLocalStorage()">Delete all data</a>

                </div>
            </div>
        )
    }

}

export default SettingsModal