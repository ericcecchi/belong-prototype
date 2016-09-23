import React from 'react';

import * as API from './API';

import Option from './Option';
import Select from './Select';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

export default class FilterBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Toolbar>
                <ToolbarGroup firstChild={true}>
                    <Select
                        defaultValue={null}
                        onChange={this.props.toggleCategory}
                        underlineStyle={{border: 'none'}}
                    >
                        <Option value={null} primaryText="Help people in any need" />
                        <Option value={API.getCategoryByName('Family').id} primaryText="Help people without family" />
                        <Option value={API.getCategoryByName('Health').id} primaryText="Help people without health" />
                        <Option value={API.getCategoryByName('Freedom').id} primaryText="Help people without freedom" />
                        <Option value={API.getCategoryByName('Homes').id} primaryText="Help people without homes" />
                        <Option value={API.getCategoryByName('Money').id} primaryText="Help people without money" />
                    </Select>

                    <Select
                        defaultValue="Chicago"
                        style={{marginLeft: '10px'}}
                        underlineStyle={{border: 'none'}}
                    >
                        <Option value="Chicago" primaryText="near Chicago" />
                        <Option value="Los Angeles" primaryText="near Los Angeles" />
                        <Option value="Minneapolis" primaryText="near Minneapolis" />
                        <Option value="Salt Lake City" primaryText="near Salt Lake City" />
                    </Select>
                </ToolbarGroup>

                <ToolbarGroup lastChild={true}>
                    <RaisedButton
                        label="Filters"
                        onClick={this.props.openModal}
                    />
                </ToolbarGroup>
            </Toolbar>
        );
    }
}
