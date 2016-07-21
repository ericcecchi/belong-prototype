import React, { Component } from 'react';
import * as API from './API';

import DetailView from './DetailView';
import ListItem from './ListItem';

const Filters = {
    byCategory: function (opportunities, category) {
        return opportunities.filter((opportunity) => opportunity.categories && opportunity.categories.indexOf(category) > -1);
    }
};

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opportunities: null,
            selected: null,
            filters: [],
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

    removeCategory() {
        const currentState = this.state;
        currentState.filters.find((filter) => {
            if (filter.name == 'byCategory') {
                currentState.filters.splice(currentState.filters.indexOf(filter), 1);
                return true;
            } else {
                return false;
            }
        });
        this.setState(Object.assign({}, currentState));
    }

    setCategory(event) {
        const currentState = this.state;
        const category = event.target.value;
        this.removeCategory();
        if (category) {
            currentState.filters.push({
                name: 'byCategory',
                value: category
            });
            this.setState(Object.assign({}, currentState));
        }
    }

    render() {
        console.log('Belong:render', this.state);
        let opportunities = this.state.opportunities;
        if (opportunities) {
            this.state.filters.forEach((filter) => {
                opportunities = Filters[filter['name']](opportunities, filter['value']);
            });
        }
        const category = this.state.filters.find((filter) => filter.name == 'byCategory');
        const categoryName = category ? category.value : 'things';
        const callout = category && (
                <div className="Callout">
                    <h1>Without {categoryName}</h1>
                    <p>Every year more than 23,000 children age out of foster care, leaving them without families of their own.</p>
                    <a href="#">Learn more</a>
                </div>
            );

        return (
            <div className={'Belong'+ (this.state.selected !== null ? ' selected' : '')}>
                <div className="Header">
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
                <select onChange={this.setCategory.bind(this)}>
                    <option value="" default>in need</option>
                    <option value="Family">without family</option>
                    <option value="Food">without food</option>
                    <option value="Freedom">without freedom</option>
                    <option value="A Home">without a home</option>
                    <option value="Money">without money</option>
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
                {callout}
                {opportunities && opportunities.map((opportunity, index) => {
                    return <ListItem key={index} onClick={this.setSelected.bind(null, index)} {...opportunity}/>;
                })}
                {this.state.selected !== null && opportunities[this.state.selected] && <DetailView {...opportunities[this.state.selected]} />}
            </div>
        );
    }
}
