import React, { Component } from 'react';
import * as API from './API';

import DetailView from './DetailView';
import ListItem from './ListItem';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opportunities: null,
            selected: null,
        };
        this.setSelected = this.setSelected.bind(this);
    }

    componentDidMount() {
        API.getOpportunities().then((opportunities) => {
            this.setState({
                opportunities
            });
        });
    }

    setSelected(id) {
        this.setState({selected: id});
    }

    render() {
        console.log('Belong:render', this.state);
        return (
            <div className="Belong">
                <div className="SpaceBetween">
                    <div>
                        <select>
                            <option>Volunteer</option>
                            <option>Nonprofit</option>
                        </select>
                    </div>
                    <h1>Belong</h1>
                    <button type="button">Sign in</button>
                </div>
                <hr />
                <span> Help people</span>
                <select>
                    <option>without family</option>
                    <option>without food</option>
                    <option>without freedom</option>
                    <option>without homes</option>
                    <option>without income</option>
                </select>
                <span> near </span>
                <select>
                    <option>Chicago</option>
                    <option>Los Angeles</option>
                    <option>Minneapolis</option>
                    <option>Salt Lake City</option>
                </select>
                <span>More filters: </span>
                <input type="checkbox" id="individual"/><label htmlFor="individual">individual</label>
                <input type="checkbox" id="family"/><label htmlFor="family">family friendly</label>
                <input type="checkbox" id="group"/><label htmlFor="group">group friendly</label>
                <input type="checkbox" id="ongoing"/><label htmlFor="ongoing">ongoing</label>
                <input type="checkbox" id="onetime"/><label htmlFor="onetime">one-time</label>
                <div className="Callout">
                    <h1>Without Family</h1>
                    <p>Every year more than 23,000 children age out of foster care, leaving them without families of their own.</p>
                    <a href="#">Learn more</a>
                </div>
                {this.state.opportunities && this.state.opportunities.map((opportunity, index) => {
                    return <ListItem key={index} onClick={this.setSelected.bind(null, index)} {...opportunity}/>;
                })}
                {this.state.selected !== null && <DetailView {...this.state.opportunities[this.state.selected]} />}
            </div>
        );
    }
}
