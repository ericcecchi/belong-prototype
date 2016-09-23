import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';

class Select extends React.Component {
    static defaultProps = {
        autoWidth: true
    };

    constructor(props) {
        super(props);
        this.state = {value: props.defaultValue || null};
    }

    handleChange = (event, index, value) => {
        this.setState({value});
        this.props.onChange && this.props.onChange(event, index, value);
    };

    render() {
        const {defaultValue, ...rest} = this.props;
        return (
            <DropDownMenu
                {...rest}
                value={this.state.value}
                onChange={this.handleChange} />
        );
    }
}

export default Select;
