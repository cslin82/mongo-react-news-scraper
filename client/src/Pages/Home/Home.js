import React, { Component } from 'react';

const Home = props => {
  return (
    <div>
      Home
      <ul>
        {/* {JSON.stringify(props.articles, '', 2)} */}
        {props.articles.map(i => (
          <li key={i._id}>
            <a href={i.url}>{i.title}</a>
            {i.saved && ' saved'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
