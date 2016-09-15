import React from 'react';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';

import * as Colors from 'material-ui/styles/colors';
import palette from '../data/Colors';

import Button from './Button';
import Category from './Category';

import Callouts from '../data/Callouts';

class Callout extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card
                style={{
                    background: palette.accent1Color,
                    margin: '.5rem',
                }}
            >
                <CardTitle
                    title={
                        <Category
                            name={this.props.category}
                            showName
                            inverse={true}
                            textBefore="Without"
                        />
                    }
                    titleColor={Colors.white}
                />
                <CardText color={Colors.white}>
                    {Callouts[this.props.category]}
                </CardText>
                <CardActions>
                    <Button
                        label="Learn more"
                        backgroundColor={palette.accent1Color}
                        style={{color: Colors.white}}
                    />
                </CardActions>
            </Card>
        );
    }
}

export default Callout;
