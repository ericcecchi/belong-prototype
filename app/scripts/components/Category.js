import React, { Component } from 'react';

export default class Category extends Component {
    render () {
        const {
            name,
            showName,
            textBefore,
        } = this.props;
        const nameToIconMap = {
            Family: 'child',
            Freedom: 'link',
            Health: 'medkit',
            'A Home': 'home',
            Money: 'money',
        };
        return (
            <div className={'Category '+ name}>
                <div className="CategoryIcon">
                    <span className={'fa fa-'+ nameToIconMap[name]}/>
                </div>
                {showName && <div>{textBefore} {name}</div>}
            </div>
        );
    }
}
