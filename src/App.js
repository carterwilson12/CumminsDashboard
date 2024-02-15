import './App.css';
import WIPselector from './components/WIP-selector';
import AutocompleteHint from './components/autocomplete';
import { Button, ButtonGroup, ToggleButtonGroup, ToggleButton} from '@mui/material';
import React from 'react';
const wip_ids = ["LS12231232",
  "MS1732231362",
  "MS1732213213",
  "MS1732132124",
  "MS1732332325",]

  
function App() {
  
  
  return (  // whaddup
    <div className="App">
        <div className="SearchBar">  
          <AutocompleteHint ></AutocompleteHint>
        </div>
        
        <WIPselector wip_ids={wip_ids}></WIPselector>
      
    </div>
    
  );
}

export default App;
