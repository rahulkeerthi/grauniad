/* eslint-disable max-len */
import React, { Component } from 'react';
import ArticleItem from './ArticleItem';

class Articles extends Component {
  constructor() {
    super();
    this.state = {
      articles: [
        {
          id: 'id1',
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
        },
        {
          id: 'id2',
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
        },
        {
          id: 'id3',
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
        },
      ],
    };
  }

  render() {
    const { articles } = this.state;
    return (
      <div style={articleStyle}>
        {articles.map((article) => (
          <ArticleItem key={article.id} article={article} />
        ))}
      </div>
    );
  }
}

const articleStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '1rem',
};

export default Articles;
