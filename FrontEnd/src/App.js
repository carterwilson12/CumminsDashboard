import './App.css';
import WIPselector from './components/WIP-selector';
import AutocompleteHint from './components/autocomplete';
import TSNtable from './components/TSNtable';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import React, {useEffect, useState} from 'react';

function App() {

  const [data, setData] = useState([])

  useEffect(()=>{
    fetch('http://localhost:8081/devices')
    .then(res => res.json())
    .then(data => setData(data))
    .catch(err => console.log(err))
  },[])

  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <div className="wipselector">
            <AutocompleteHint></AutocompleteHint>
            {data.map((d,i) =>(
              <WIPselector wip_id={d.WIP_JOB_NUMBER}></WIPselector>
            ))}
            
          </div>           
        </Grid>
        <Grid item xs={10}>
          <div className="SearchBar">  
            <TSNtable></TSNtable>
          </div>      
        </Grid>
      </Grid>
    </Box>      
    </div>
    
  );
}

export default App;
