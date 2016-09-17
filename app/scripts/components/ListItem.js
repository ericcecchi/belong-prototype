import React, { Component } from 'react';

import Button from './Button';

import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';

export default class ListItem extends Component {
  render () {
    const {
      categories,
      imageUrl,
      onClick,
      organization,
      title,
    } = this.props;
    return (
      <Card onClick={onClick}>
          <CardMedia>
              <img src={imageUrl} />
          </CardMedia>
          <CardTitle
              title={<span dangerouslySetInnerHTML={{__html: title}} />}
              subtitle={<span dangerouslySetInnerHTML={{__html: organization.name}} />}
          />
          <CardActions>
              <Button label="Learn more" />
          </CardActions>
      </Card>
    );
  }
}
