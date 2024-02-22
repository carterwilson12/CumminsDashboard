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
  //Function that given the currently selected WIP will return corresponding TSN Data
  function getTSNData(currWIP){
    if(currWIP === "LS12231232"){
      return [
        ['732', 0.4, 1],
        ['7321', 0.1, 0],
        ['73215', 0.1, 0],
        ['73216', 0.1, 0],
        ['88888', 0.1, 0],
      ];
    }else{
      return [
        ['73213', 0.4, 1],
        ['73214', 0.1, 0],
        ['73215', 0.1, 0],
        ['73216', 0.1, 0],
        ['73217', 0.1, 0],
      ];
    }
    
  }


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
  const [currWIP, handleWIPselect] = React.useState()
  //Handle WIP selector change
  const handleChange = (event, newWIP) => {
    handleWIPselect(newWIP)
  }
  //TSN data
  const sample = getTSNData(currWIP);
  

  
  return (
    <div className="App">

        <div className="SearchBar">  
          <AutocompleteHint></AutocompleteHint>
          
        </div>
        <Grid container direction="row" justifyContent="flex-start"spacing={2}>
          <Grid item xs={2}><ToggleButtonGroup 
          exclusive
          onChange={handleChange}
          className="WIP-list" 
          orientation="vertical" 
          aria-label="Vertical button group" 
          variant="contained"
          >
          {Array.isArray(wip_ids) && wip_ids.map((wip_id, index) => ( // Check if wip_ids is an array
              <ToggleButton style={{
                  backgroundColor: currWIP === wip_id ? '#2c387e' : undefined,color: currWIP === wip_id ? 'white' : undefined
                }}key={index} value={wip_id} className="WIP-selector-button">
              {wip_id}
              </ToggleButton>
          ))}
          </ToggleButtonGroup></Grid>
          <Grid item xs={8}><TSNtable sample={sample}
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
