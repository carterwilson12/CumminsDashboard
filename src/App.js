import './App.css';
import WIPselector from './components/WIP-selector';
import AutocompleteHint from './components/autocomplete';
import TSNtable from './components/TSNtable';
import { Button, ButtonGroup, ToggleButtonGroup, ToggleButton} from '@mui/material';
import React from 'react';
const wip_ids = ["LS12231232",
  "MS1732231362",
  "MS1732213213",
  "MS1732132124",
  "MS1732332325",]

  
function App() {

  return (
    <div className="App">
        <div className="SearchBar">  
          <AutocompleteHint></AutocompleteHint>
          <TSNtable></TSNtable>
        </div>
        
        <WIPselector wip_ids={wip_ids}></WIPselector>
      
    </div>
    
  );
}

export default App;
