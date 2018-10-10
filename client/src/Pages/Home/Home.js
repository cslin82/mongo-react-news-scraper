import React from 'react';
import ArticleView from '../../components/ArticleView';

const Home = props => {
  const saved = props.saved;
  let articlesDisp;

  if (saved) {
    articlesDisp = props.articles.filter(article => article.saved);
  } else {
    articlesDisp = props.articles;
  }
  return (
    <div>
      {articlesDisp.map(i => (
        <ArticleView key={i._id} article={i} saved={saved} />
      ))}
    </div>
  );
};

export default Home;
