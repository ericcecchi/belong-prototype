import React, { Component } from 'react';

import * as API from './API';

import classnames from 'classnames';

export default class Category extends Component {
    render () {
        const {
            id,
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
        const category = API.getCategoryById(id);
        return (
            <span title={'People without ' + category.name} className={classnames('Category', category.name, {'_inverse': inverse})}>
                <span className="CategoryIcon">
                    <span className={'fa fa-'+ nameToIconMap[category.name]}/>
                </span>
                {showName && <div>{textBefore} {category.name}</div>}
            </span>
        );
    }
}
