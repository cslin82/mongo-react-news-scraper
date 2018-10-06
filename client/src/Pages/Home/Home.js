import React, { Component } from 'react';
import ArticleView from '../../components/ArticleView';

const Home = props => {
  return (
    <div>
      <ul>
        {props.articles.map(i => (
          <ArticleView key={i._id} article={i} />
        ))}
      </ul>
    </div>
  );
};

export default Home;
