import React, {Component} from 'react';
import {parse} from 'markdown';

import Category from './Category';

export default class DetailView extends React.Component {
    render() {
        const {
            added,
            description,
            categories,
            ends,
            imageUrl,
            organization,
            starts,
            title,
            family,
            group,
            individual,
            ongoing,
            oneTime,
        } = this.props;
        console.log('selected details', this.props);
        const filters = [];
        if (family) filters.push('Family-friendly');
        if (group) filters.push('Group-friendly');
        if (individual) filters.push('Individual-friendly');
        if (ongoing) filters.push('Ongoing');
        if (oneTime) filters.push('One-time');

        return (
            <div className="DetailView">
                <div className="DetailBody">
                    <h3>{categories.map((category) => (
                      <Category
                        key={category}
                        name={category}
                        showName
                        textBefore="Helping People Without"/>))}</h3>
                    <img src={imageUrl}/>
                    <h1>{title}</h1>
                    <div dangerouslySetInnerHTML={{__html: parse(description)}}/>
                    <p><strong>Starts: {starts} • Ends: {ends} • Added: {added}</strong></p>
                    <div className="DetailFilters">
                        <h3>This opportunity is:</h3>
                        <ul>
                            {filters.map(filter => <li>{filter}</li>)}
                        </ul>
                    </div>
                    <h3>About {organization.name}</h3>
                    <p>{organization.bio}</p>
                    <p><a href={organization.website} target="_belong-organization">Visit website</a></p>
                </div>
                <div className="DetailFoot">
                    <button className="DetailFootButton" type="button">Count me in!</button>
                </div>
            </div>
        );
    }
}
