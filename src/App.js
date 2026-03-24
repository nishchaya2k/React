import logo from './logo.svg';
import './App.css';
import Virtualization from './components/virtualization/Virtualization.jsx';
import InfiniteScroll from './components/infiniteScroll/InfiniteScroll.jsx';
import Hook_useEffect from './components/ReactHooks/Hook_useEffect.js';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Optimization1 from './components/Optimization/Optimization1/Optimization1.jsx';
import CreatePortal from './components/CreatePortal/CreatePortal.jsx';

function App() {

  const list = Array.from({ length: '1000' }, (_, index) => index + 1)

  return (
    <div className="App">
      {/* <Optimization1 /> */}
      <CreatePortal />
    </div>
  );
}

export default App;
