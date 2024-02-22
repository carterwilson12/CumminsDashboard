import './App.css';
import WIPselector from './components/WIP-selector';

import AutocompleteHint from './components/autocomplete';
import TSNtable from './components/TSNtable';
import BOMtable from './components/BOMtable'
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


  /* TSN table data */
  const sample = [
    ['73213', 0.4, 1],
    ['73214', 0.1, 0],
    ['73215', 0.1, 0],
    ['73216', 0.1, 0],
    ['73217', 0.1, 0],
  ];

  /* BOM table data */
  const sample2 = [
    ['part 1', 'part 2', 'part 3', 'part 4', 'part 5'],
    ['part'],
    ['part'],
    ['part'],
    ['part'],
  ];

  
function App() {

  return (
    <div className="App">

        <div className="SearchBar">  
          <AutocompleteHint></AutocompleteHint>
          
        </div>
        <Grid container direction="row" justifyContent="flex-start" spacing={2}>
          <Grid item xs={2}><WIPselector wip_ids={wip_ids}/></Grid>
          <Grid item xs={10}><TSNtable sample={sample}
        sx={{
          width: 1000,
          height: 500,
          borderRadius: 1,
          bgcolor: '#000000',
          
        }}
      /></Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={10}><BOMtable sample2={sample2}></BOMtable></Grid>
        </Grid>
        
      
    </div>
    
  );
}

export default App;
