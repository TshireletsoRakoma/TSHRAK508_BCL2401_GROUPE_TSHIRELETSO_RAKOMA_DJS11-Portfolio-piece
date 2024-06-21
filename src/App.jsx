
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Yourfav from './components/YourFav';
import About from './components/About';
import Contact from './components/Contact';
import Show from './components/Show';
import Footer from './components/Footer';
import Login from './components/Login';
import PrivateRoute from './contexts/PrivateRoute';
import { CategoryProvider } from './components/context/CatergoryContext';
import { FavoritesProvider } from './contexts/FavouriteContext';
import { AuthProvider } from './contexts/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <CategoryProvider>
        <FavoritesProvider>
          <Router>
            <div>
              <Header />
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <Home />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/yourfav"
                  element={
                    <PrivateRoute>
                      <Yourfav />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/about"
                  element={
                    <PrivateRoute>
                      <About />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/contact"
                  element={
                    <PrivateRoute>
                      <Contact />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/show/:showId"
                  element={
                    <PrivateRoute>
                      <Show />
                    </PrivateRoute>
                  }
                />
              </Routes>
              <Footer />
            </div>
          </Router>
        </FavoritesProvider>
      </CategoryProvider>
    </AuthProvider>
  );
};

export default App;
