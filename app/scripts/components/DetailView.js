import React, {Component} from 'react';

import Button from './Button';
import Category from './Category';

import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import NavigationBack from 'material-ui/svg-icons/navigation/arrow-back';

import palette from '../data/Colors';

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
            time,
            family,
            group,
            individual,
            ongoing,
            oneTime,
        } = this.props;
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
                <div className="DetailView-image">
                    <IconButton
                        onClick={this.props.closeView}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0
                        }}
                        iconStyle={{
                            fill: 'white'
                        }}
                    >
                        <NavigationBack />
                    </IconButton>
                    <img src={imageUrl}/>
                </div>

                <Paper
                    rounded={false}
                    className="DetailBody-head"
                    style={{
                        background: palette.primary1Color,
                        color: 'white'
                    }}
                >
                    <h2>
                        <span dangerouslySetInnerHTML={{__html: title}} />
                        {organization.name && <span><br/><small style={{color: 'white'}} dangerouslySetInnerHTML={{__html: organization.name}} /></span>}
                    </h2>
                </Paper>

                <div className="DetailBody">
                    <div className="DetailBody-content">
                        <p>
                            <strong>{time}</strong> • {categories.map((category) => (
                                <Category
                                    key={category}
                                    id={category}
                                />)
                            )}
                        </p>
                        <div dangerouslySetInnerHTML={{__html: description}}/>
                        {location && <p style={{marginTop: '1rem'}}><strong>Location: </strong> {location}</p>}
                        {filterDetails}
                        {organization.bio && (
                            <div className="DetailsOrganization">
                                <h3>About {organization.name}</h3>
                                <p>{organization.bio}</p>
                                {organization.website && <p><a href={organization.website} target="_belong-organization">Visit website</a></p>}
                            </div>
                        )}
                    </div>
                </div>

                <Paper className="DetailFoot" zDepth={1}>
                    <Button label="Count me in!" onClick={sendEmail} primary={true} />
                    <Button label="Save for later" onClick={saveForLater} style={{marginLeft: '1rem'}} />
                </Paper>
            </Paper>
        );
    }
}
