import './App.css';
import AutocompleteHint from './components/autocomplete';
import { Button, ButtonGroup, ToggleButtonGroup, ToggleButton} from '@mui/material';
import React from 'react';
const mystyle = {
  color: "white",
  backgroundColor: "DodgerBlue",
  
};
const wip_ids = ["LS12231232",
  "MS1732231362",
  "MS1732213213",
  "MS1732132123",
  "MS1732332323",]

  
function App() {
  const [wip_id, setWIP] = React.useState<String | null>('');
  const handleWIPselect = (event, newWIP) => {
    setWIP(newWIP);
  };
  return (  // whaddup
    <div className="App">
        <div className="SearchBar">  
          <AutocompleteHint></AutocompleteHint>
        </div>
        
      <ToggleButtonGroup value={wip_id}
      exclusive
      onChange={handleWIPselect}
      className="WIP-list" orientation="vertical" aria-label="Vertical button group" variant="contained">
        {Object.entries(wip_ids).map(wip_id=>{
          console.log(wip_id)
          return(
            <ToggleButton value={wip_id}className="WIP-selector-button">{wip_id}</ToggleButton>
          )
        })}
      </ToggleButtonGroup>
      
    </div>
    
  );
}

export default App;
