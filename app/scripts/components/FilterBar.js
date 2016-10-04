import React from 'react';

import * as API from './API';

import Option from './Option';
import Select from './Select';
import IconButton from 'material-ui/IconButton';
import FilterList from 'material-ui/svg-icons/content/filter-list';
import Paper from 'material-ui/Paper';

export default class FilterBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Paper
                className="FilterBar"
                rounded={false}
                style={{
                    zIndex: 2,
                    position: 'relative'
                }}
            >
                <div>
                    <Select
                        defaultValue={null}
                        onChange={this.props.toggleCategory}
                        style={{height: 'auto'}}
                        underlineStyle={{border: 'none'}}
                    >
                        <Option value={null} primaryText="Help people in any need" />
                        <Option value={API.getCategoryByName('Family').id} primaryText="Help people without family" />
                        <Option value={API.getCategoryByName('Health').id} primaryText="Help people without health" />
                        <Option value={API.getCategoryByName('Freedom').id} primaryText="Help people without freedom" />
                        <Option value={API.getCategoryByName('Homes').id} primaryText="Help people without homes" />
                        <Option value={API.getCategoryByName('Money').id} primaryText="Help people without money" />
                    </Select>

                    {false && (<Select
                        defaultValue="Chicago"
                        style={{height: 'auto', marginLeft: '10px'}}
                        underlineStyle={{border: 'none'}}
                    >
                        <Option value="Chicago" primaryText="near Chicago" />
                        <Option value="Los Angeles" primaryText="near Los Angeles" />
                        <Option value="Minneapolis" primaryText="near Minneapolis" />
                        <Option value="Salt Lake City" primaryText="near Salt Lake City" />
                    </Select>)}
                </div>

                <div>
                    <IconButton
                        tooltip="Filter"
                        onClick={this.props.openModal}
                    >
                        <FilterList />
                    </IconButton>
                </div>
            </Paper>
        );
    }
}
