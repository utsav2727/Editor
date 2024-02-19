import { Route, BrowserRouter as Router, Routes  } from 'react-router-dom';
import './App.css';
import Editor from './components/Editor';
import Preview from './components/Preview';

function App() {
  return (
    <div className='font-poppins'>
      <Router>
        <Routes>
          <Route path="/" element={<Editor />} />
          <Route path="/preview" element={<Preview />} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
