import React from 'react';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

class TopNavigation extends React.Component {
    static defaultProps = {
        topButton: null
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <AppBar
                className="Belong-navigation"
                showMenuIconButton={false}
                title="Belong"
                iconStyleRight={{
                    display: 'flex',
                    alignItems: 'center',
                    marginRight: 0
                }}
                iconElementRight={this.props.topButton}
            >
            </AppBar>
        );
    }
}

export default TopNavigation;
