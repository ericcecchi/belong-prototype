import React, {Component} from 'react';
import {parse} from 'markdown';

import Category from './Category';

function sendEmail() {
    alert('Great! We’ll send you confirmation email with the time, address, and reassurance that someone will be expecting you. Go ahead and add it to your calendar, but we’ll also send you a reminder email a day before the event.');
}

export default class DetailView extends React.Component {
    render() {
        const {
            description,
            categories,
            location,
            imageUrl,
            organization,
            title,
            family,
            group,
            individual,
            ongoing,
            oneTime,
        } = this.props;
        const added = (Math.floor(Math.random() * 10) + 1) + ' days ago'
        const starts = 'Thursday, August 4, 2016 from 7:00–9:00 PM'
        console.log('selected details', this.props);
        const filters = [];
        if (family) filters.push('Family-friendly');
        if (group) filters.push('Group-friendly');
        if (individual) filters.push('Individual-friendly');
        if (ongoing) filters.push('Ongoing');
        if (oneTime) filters.push('One-time');

        const filterDetails = filters.length > 0 && (
            <div className="DetailFilters">
                <h3>This opportunity is:</h3>
                <ul>
                    {filters.map(filter => <li>{filter}</li>)}
                </ul>
            </div>
        );

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
                    <p><strong>{starts}</strong></p>
                    <div dangerouslySetInnerHTML={{__html: parse(description)}}/>
                    <p><strong>Location: </strong> 1 Infinite Loop, Cupertino, CA 95014</p>
                    {filterDetails}
                    <div className="DetailsOrganization">
                        <h3>About {organization.name}</h3>
                        <p>{organization.bio}</p>
                        <p><a href={organization.website} target="_belong-organization">Visit website</a>  •  (312) 867-5309</p>
                    </div>
                </div>
                <div className="DetailFoot">
                    <button className="DetailFootButton" type="button" onClick={sendEmail}>Count me in!</button>
                </div>
            </div>
        );
    }
}
