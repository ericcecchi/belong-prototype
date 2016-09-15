import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

class Button extends React.Component {
    static defaultProps = {
        raised: false
    };

    constructor(props) {
        super(props);
    }

    render() {
        const { raised, ...rest } = this.props;
        return raised ? <RaisedButton {...rest} /> : <FlatButton {...rest} />;
    }
}

export default Button;
