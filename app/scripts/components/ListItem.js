import React, { Component } from 'react';

export default class ListItem extends Component {
  render () {
    const {
      id,
      imageUrl,
      onClick,
      organization,
      title,
    } = this.props;
    return (
      <div className="ListItem" onClick={onClick.bind(null, id)}>
        <div>
          <img className="ListItemImage" src={imageUrl} />
        </div>
        <div className="ListItemDetails">
          <h1>{title}</h1>
          {organization}
        </div>
        <div>
          <button className="ListItemButton" type="button">Learn more</button>
        </div>
      </div>
    );
  }
}
