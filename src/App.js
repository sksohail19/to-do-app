import './App.css';
import Navbar from "./components/Navbar";
import AddItem from "./pages/AddItem";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import EditList from "./pages/EditList";
import ListProvider from './context/ListProvider';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <ListProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/addItem" element={<AddItem />} />
            <Route path="/login" element={<Login />} />
            <Route path="/update/:id" element={<EditList />} />
            <Route path="/register" element={<Signup />} />
          </Routes>
        </Router>
      </ListProvider>
    </>
  );
}

export default App;
