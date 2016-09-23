import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Subheader from 'material-ui/Subheader';

class FilterDialog extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <List>
                <Subheader>Filters</Subheader>
                <ListItem
                    primaryText="Groups"
                    secondaryText="Good for 2 or more people"
                    leftCheckbox={
                        <Checkbox
                            defaultChecked={this.props.filters.group}
                            onCheck={this.props.toggleFilter('group', true)}
                        />
                    }
                />
                <ListItem
                    primaryText="Family"
                    secondaryText="Family-friendly"
                    leftCheckbox={
                        <Checkbox
                            defaultChecked={this.props.filters.family}
                            onCheck={this.props.toggleFilter('family', true)}
                        />
                    }
                />
                <ListItem
                    primaryText="Long-term"
                    secondaryText="Ongoing serving commitment"
                    leftCheckbox={
                        <Checkbox
                            defaultChecked={this.props.filters.ongoing}
                            onCheck={this.props.toggleFilter('ongoing', true)}
                        />
                    }
                />
                <ListItem
                    primaryText="One-time"
                    secondaryText="Single-service opportunities"
                    leftCheckbox={
                        <Checkbox
                            defaultChecked={this.props.filters.oneTime}
                            onCheck={this.props.toggleFilter('oneTime', true)}
                        />
                    }
                />
            </List>

        );
    }
}

export default FilterDialog;
