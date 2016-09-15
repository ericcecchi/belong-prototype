import React, {Component} from 'react';
import {parse} from 'markdown';

import Button from './Button';
import Category from './Category';

import AppBar from 'material-ui/AppBar';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

function sendEmail() {
    alert('Great! We’ll send you confirmation email with the time, address, and reassurance that someone will be expecting you. Go ahead and add it to your calendar, but we’ll also send you a reminder email a day before the event.');
}

function saveForLater() {
    alert('We will save this opportunity to a list for you to check at a later time.');
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
            <Paper className="DetailView" zDepth={4} rounded={false}>
                <Paper zDepth={2} rounded={false}>
                    <Toolbar>
                        <ToolbarGroup
                            firstChild={true}
                            style={{
                                alignItems: 'center'
                            }}
                        >
                            <IconButton onClick={this.props.closeView}><NavigationClose /></IconButton>
                            <ToolbarTitle text="Opportunity Details"/>
                        </ToolbarGroup>
                    </Toolbar>
                </Paper>

                <div className="DetailBody">
                    <img src={imageUrl}/>
                    <div className="DetailBody-content">
                        {categories.map((category) => (
                            <Category
                                key={category}
                                name={category}
                                showName
                                textBefore="Helping People Without"/>)
                        )}
                        <h2>{title}</h2>
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
                </div>
                <Paper className="DetailFoot" zDepth={1}>
                    <Button label="Count me in!" onClick={sendEmail} raised={true} primary={true} />
                    <Button label="Save for later" onClick={saveForLater} style={{marginLeft: '1rem'}} />
                </Paper>
            </Paper>
        );
    }
}
