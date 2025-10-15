import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import CreateExercisePage from './pages/CreateExercisePage.jsx';
import EditExercisePage from './pages/EditExercisePage.jsx';
import Navigation from './components/Navigation.jsx';
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <header>
          <h1>Exercise Tracker</h1>
          <p>Full Stack MERN App Demonstration</p>
          <Navigation />
        </header>

        <main style={{ padding: '1rem' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreateExercisePage />} />
            <Route path="/edit/:id" element={<EditExercisePage />} />
          </Routes>
        </main>

        <footer>
          &copy; 2025 Olivia Choi
        </footer>
      </div>  
    </BrowserRouter>
  );
}

export default App;
