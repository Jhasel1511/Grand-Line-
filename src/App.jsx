import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CardList from './components/CardList';
import Counter from './components/Counter';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Header />
      <main>
        <Hero />
        <CardList />
        <Counter />
      </main>
      <Footer />
    </div>
  );
}

export default App;
