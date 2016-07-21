import React, {Component} from 'react';

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
        } = this.props;
        console.log('selected details', this.props);
        return (
            <div className="DetailView">
                <div className="DetailBody">
                    <h3>{categories.map((category) => category).join(', ')}</h3>
                    <img src={imageUrl}/>
                    <h1>{title}</h1>
                    <div dangerouslySetInnerHTML={{__html: description}}/>
                    Starts: {starts}, Ends: {ends}, Added: {added}
                    <p>{organization} is a nonprofit based in the West Town neighborhood of Chicago.</p>
                </div>
                <div className="DetailFoot">
                    <button className="DetailFootButton" type="button">Count me in!</button>
                </div>
            </div>
        );
    }
}
