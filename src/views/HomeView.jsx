import React from 'react';
import Hero from '../components/Hero';
import CardList from '../components/CardList';
import Counter from '../components/Counter';

const HomeView = () => {
  return (
    <div className="home-view">
      <Hero />
      <CardList />
      <Counter />
    </div>
  );
};

export default HomeView;
