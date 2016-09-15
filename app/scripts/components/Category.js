import React, { Component } from 'react';
import classnames from 'classnames';

export default class Category extends Component {
    render () {
        const {
            name,
            showName,
            textBefore,
            inverse,
        } = this.props;
        const nameToIconMap = {
            Family: 'child',
            Freedom: 'link',
            Health: 'medkit',
            Homes: 'home',
            Money: 'money',
        };
        return (
            <div className={classnames('Category', name, {'_inverse': inverse})}>
                <div className="CategoryIcon">
                    <span className={'fa fa-'+ nameToIconMap[name]}/>
                </div>
                {showName && <div>{textBefore} {name}</div>}
            </div>
        );
    }
}
