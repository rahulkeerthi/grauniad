/* eslint-disable max-len */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';

class ArticleItem extends Component {
  constructor() {
    super();
    this.state = {
      id: 'id',
      pillar_name: 'Sport',
      section_name: 'Football',
      publication_date: '2020-06-12T10:59:20Z',
      title: 'Premier League restart preview No 10: Liverpool',
      linkUrl:
        'https://www.theguardian.com/football/2020/jun/12/premier-league-restart-preview-no-liverpool',
      imageUrl:
        'https://media.guim.co.uk/f6d7471208bc09d0c658394661e176e025aba268/0_154_3142_1885/500.jpg',
      bodyPreview:
        'Jürgen Klopp’s side need only two wins to seal the title but beating Manchester City’s 100-point record is an unspoken target',
    };
  }

  render() {
    const { imageUrl, title, linkUrl, bodyPreview } = this.state;
    return (
      <div className="card text-center">
        <img src={imageUrl} alt="" className="img" style={{ width: '240px' }} />
        <h3 className="">{title}</h3>
        <p>{bodyPreview}</p>
        <a href={linkUrl} className="btn btn-dark btn-sm my-1">
          Read More
        </a>
      </div>
    );
  }
}

export default ArticleItem;
