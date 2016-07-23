import React, { Component } from 'react';
import * as API from './API';

import Category from './Category';
import DetailView from './DetailView';
import ListItem from './ListItem';

function booleanFilter(things, property) {
    return things.filter((thing) => thing[property]);
}

const Filters = {
    category: function (opportunities, category) {
        return opportunities.filter((opportunity) => opportunity.categories && opportunity.categories.indexOf(category) > -1);
    },
    individual: (opportunities) => booleanFilter(opportunities, 'individual'),
    family: (opportunities) => booleanFilter(opportunities, 'family'),
    group: (opportunities) => booleanFilter(opportunities, 'group'),
    oneTime: (opportunities) => booleanFilter(opportunities, 'oneTime'),
    ongoing: (opportunities) => booleanFilter(opportunities, 'ongoing'),
};

const Callouts = {
    'Homes': 'On any given night, there are over 43 million children who sleep with no roof over their heads. What if we could provide resources, hope, and a place to belong?',
    'Health': 'More than 25% of our nation suffers from mental illness alone. Is there a way we could bring healing, hope, and belonging to those without health?',
    'Money': 'While progress is being made, there are still close to 800 million in our world who are chronically undernourished. Join those providing basic needs for the under-resourced.',
    'Freedom': 'There are an estimated 4.5 million people trapped in forced sexual exploitation globally. Join the movement to bring freedom and hope to people who are enslaved or imprisoned today.',
    'Family': '132 million children worldwide are orphans, making them more at risk for trafficking and other dangers. Let’s join those who are trying to bring hope and a place to belong.',
};

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filters: [],
            moreFilters: true,
            opportunities: null,
            organizations: null,
            selected: null,
        };
        this.setSelected = this.setSelected.bind(this);
        this.toggleMoreFilters = this.toggleMoreFilters.bind(this);
    }

    componentDidMount() {
        API.getOpportunities().then((opportunities) => {
            this.setState({
                opportunities
            });
        });

        API.getOrganizations().then((organizations) => {
            console.log('orgs: ' + organizations)
            this.setState({
                organizations
            });
        });
    }

    setSelected(id) {
        this.setState({selected: id});
    }

    removeFilter(name) {
        const currentState = this.state;
        const hadFilter = currentState.filters.find((filter) => {
            if (filter.name == name) {
                currentState.filters.splice(currentState.filters.indexOf(filter), 1);
                return true;
            } else {
                return false;
            }
        });
        this.setState(Object.assign({}, currentState));
        return hadFilter;
    }

    hasFilter(name) {
        const currentState = this.state;
        return !!currentState.filters.find((filter) => {
            return filter.name == name;
        });
    }

    toggleFilter(name, isBoolean = false) {
        return (event) => {
            const currentState = this.state;
            const value = event.target.value;
            const hadFilter = this.removeFilter(name);
            if (value && (!isBoolean || !hadFilter)) {
                currentState.filters.push({
                    name,
                    value
                });
                this.setState(Object.assign({}, currentState, {selected: null}));
            }
        }
    }

    toggleMoreFilters() {
        this.setState({moreFilters: !this.state.moreFilters});
    }

    render() {
        console.log('Belong:render', this.state);
        let opportunities = this.state.opportunities;
        if (opportunities) {
            this.state.filters.forEach((filter) => {
                opportunities = Filters[filter['name']](opportunities, filter['value']);
            });
        }
        const category = this.state.filters.find((filter) => filter.name == 'category');
        const categoryName = category ? category.value : 'things';
        const callout = category && (
                <div className="Callout">
                    <h1>
                        <Category
                            name={categoryName}
                            showName
                            textBefore="Without"/>
                    </h1>
                    <p>{Callouts[categoryName]}</p>
                    <a href="#">Learn more</a>
                </div>
            );
        const selectedOpportunity = this.state.selected != null && opportunities[this.state.selected];
        const selectedOrg = this.state.selected != null && this.state.organizations.find(org => org.name == selectedOpportunity.organization);

        return (
            <div className={'Belong'+ (this.state.selected !== null ? ' selected' : '')}>
                <div className="DetailView-container">
                    {this.state.selected !== null && opportunities[this.state.selected] && <DetailView {...selectedOpportunity} organization={selectedOrg} closeView={this.setSelected.bind(this, null)} />}
                </div>

                <div className="Belong-main">
                    <div className="Header">
                        <div>
                            I’m a
                            <select style={{marginLeft: '10px'}}>
                                <option>Volunteer</option>
                                <option>Group Leader</option>
                                <option>Nonprofit</option>
                            </select>
                        </div>
                        <h1>Belong</h1>
                        <button className="Button LinkButton" type="button">Sign in</button>
                    </div>
                    <div className="MainFilters">
                        <span>Help people </span>
                        <select onChange={this.toggleFilter('category').bind(this)}>
                            <option value="" default>in any need</option>
                            <option value="Family">without family</option>
                            <option value="Health">without health</option>
                            <option value="Freedom">without freedom</option>
                            <option value="Homes">without homes</option>
                            <option value="Money">without money</option>
                        </select>
                        <span> near </span>
                        <select>
                            <option>Chicago</option>
                            <option>Los Angeles</option>
                            <option>Minneapolis</option>
                            <option>Salt Lake City</option>
                        </select>
                        {/*<button type="button" className="Button LinkButton" onClick={this.toggleMoreFilters}>More filters</button>*/}
                    </div>
                    {this.state.moreFilters && (
                        <div className="MoreFilters">
                            <span>Filter by: </span>
                            <input
                                type="checkbox"
                                id="individual"
                                onChange={this.toggleFilter('individual', true).bind(this)}
                                value={this.hasFilter.call(this, 'individual')} />
                            <label htmlFor="individual">for individuals</label>

                            <input
                                type="checkbox"
                                id="group"
                                onChange={this.toggleFilter('group', true).bind(this)}
                                value={this.hasFilter.call(this, 'group')} />
                            <label htmlFor="group">for groups</label>

                            <input
                                type="checkbox"
                                id="family"
                                onChange={this.toggleFilter('family', true).bind(this)}
                                value={this.hasFilter.call(this, 'family')} />
                            <label htmlFor="family">family-friendly</label>

                            <input
                                type="checkbox"
                                id="ongoing"
                                onChange={this.toggleFilter('ongoing', true).bind(this)}
                                value={this.hasFilter.call(this, 'ongoing')} />
                            <label htmlFor="ongoing">long-term</label>

                            <input
                                type="checkbox"
                                id="oneTime"
                                onChange={this.toggleFilter('oneTime', true).bind(this)}
                                value={this.hasFilter.call(this, 'oneTime')} />
                            <label htmlFor="oneTime">one-time</label>
                        </div>
                    )}
                    {callout}
                    {opportunities && opportunities.map((opportunity, index) => {
                        return <ListItem key={index} onClick={this.setSelected.bind(null, index)} {...opportunity}/>;
                    })}
                    {opportunities && opportunities.length == 0 && <h2>No opportunities found with selected filters.</h2>}
                </div>
            </div>
        );
    }
}
