import React from 'react'

class Header extends React.Component {

    render() {
        return (
            <header className="header">
                <img className="logo" src="/img/logo.svg"></img>
                <img className="settingsIcon" src="/img/settings.svg"></img>
            </header>
        )
    }

}

export default Header