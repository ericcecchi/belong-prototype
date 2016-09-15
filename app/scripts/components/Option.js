import React from 'react';
import MenuItem from 'material-ui/MenuItem';

class Option extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MenuItem {...this.props} />
        );
    }
}

export default Option;
