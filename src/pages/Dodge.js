import logo from './logo.svg';
import './App.css';
import SearchBar from './components/SearchBar'

function Dodge() {
  return (
    <div class="App">
      <div class="header">Dodge Fitness Center</div>
      <div class="subheader">Equipment</div>
      <SearchBar/>
    </div>
  );
}

export default Dodge;