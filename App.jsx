import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import './App.css';


// Importa le immagini dalla cartella assets
import img1 from './assets/img1.jpeg';
import img2 from './assets/img2.jpeg';
import img3 from './assets/img3.jpeg';
import img4 from './assets/img4.jpeg';
import img5 from './assets/img5.jpeg';
import img6 from './assets/img6.jpeg';
import img7 from './assets/img7.jpeg';
import img8 from './assets/img8.jpeg';
import img9 from './assets/img9.jpeg';
import img10 from './assets/img10.jpeg';

const players = [
  { id: 1, name: 'Giocatore 1', image: img1 },
  { id: 2, name: 'Giocatore 2', image: img2 },
  { id: 3, name: 'Giocatore 3', image: img3 },
  { id: 4, name: 'Giocatore 4', image: img4 },
  { id: 5, name: 'Giocatore 5', image: img5 },
  { id: 6, name: 'Giocatore 6', image: img6 },
  { id: 7, name: 'Giocatore 7', image: img7 },
  { id: 8, name: 'Giocatore 8', image: img8 },
  { id: 9, name: 'Giocatore 9', image: img9 },
  { id: 10, name: 'Giocatore 10', image: img10 }
];

// Pagina principale con i quadrati
const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClick = (id) => {
    navigate(`/player/${id}`);
  };

  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <header className="header">
        <nav className="navbar">
          <a href="#logout">Logout</a>
          <a href="#regolamento">Regolamento</a>
          <input
            type="text"
            placeholder="Cerca giocatore..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-bar"
          />
        </nav>
      </header>

      <main className="content">
        <div className="squares-container">
          {filteredPlayers.map((player) => (
            <div key={player.id} className="square" onClick={() => handleClick(player.id)}>
              <img src={player.image} alt={player.name} className="square-image" />
              <p className="player-name">{player.name}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

// Pagina del singolo giocatore
const PlayerPage = () => {
  const { id } = useParams();
  const player = players.find((p) => p.id === parseInt(id));
  const [text, setText] = useState('');

  if (!player) {
    return <div>Giocatore non trovato!</div>;
  }

  return (
    <div className="player-page">
      <h1>{player.name}</h1>
      <img src={player.image} alt={player.name} className="player-image" />
      <p>Inserisci informazioni su {player.name}:</p>
      <input
        type="text"
        placeholder="questo giocatore viene da..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="player-input"
      />
      <p>{text && `Questo giocatore viene da ${text}`}</p>
    </div>
  );
};

// App principale con il Router
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/player/:id" element={<PlayerPage />} />
      </Routes>
    </Router>
  );
};

export default App;
