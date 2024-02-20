import './App.css';
import WIPselector from './components/WIP-selector';

import AutocompleteHint from './components/autocomplete';
import TSNtable from './components/TSNtable';
import { Button, ButtonGroup, ToggleButtonGroup, ToggleButton, Grid, Box} from '@mui/material';


import React from 'react';
const wip_ids = ["LS12231232",
  "MS1732231362",
  "MS1732213213",
  "MS1732132124",
  "MS17323323253333333333333",
  "LS12231232",
  "MS1732231362",
  "MS1732213213",
  "MS1732132124",
  "MS17323323253333333333333",
  "LS12231232",
  "MS1732231362",
  "MS1732213213",
  "MS1732132124",
  "MS17323323253333333333333",
  "LS12231232",
  "MS1732231362",
  "MS1732213213",
  "MS1732132124",
  "MS17323323253333333333333",]

  const sample = [
    ['73213', 0.4, 0, 0, 0],
    ['73214', 0.1, 0, 0, 0],
    ['73215', 0.1, 0, 0, 0],
    ['73216', 0.1, 0, 0, 0],
    ['73217', 0.1, 0, 0, 0],
  ];

  
function App() {

  return (
    <div className="App">

        <div className="SearchBar">  
          <AutocompleteHint></AutocompleteHint>
          
        </div>
        <Grid container direction="row" justifyContent="flex-start"spacing={2}>
          <Grid item xs={2}><WIPselector wip_ids={wip_ids}></WIPselector></Grid>
          <Grid item xs={8}><TSNtable sample={sample}
        sx={{
          width: 1000,
          height: 500,
          borderRadius: 1,
          bgcolor: '#000000',
          
        }}
      /></Grid>
        </Grid>
        
      
    </div>
    
  );
}

export default App;
