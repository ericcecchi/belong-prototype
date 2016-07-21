import React from 'react';
import * as API from './API';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            opportunities: null
        };
    }

    componentDidMount() {
        API.getOpportunities().then((opportunities) => {
            this.setState({
                opportunities: JSON.stringify(opportunities)
            });
        });
    }

    render() {
        return <code>{this.state.opportunities || 'No opportunities found'}</code>;
    }
}
