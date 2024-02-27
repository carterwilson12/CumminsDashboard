import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import React from 'react';
import {indigo} from '@mui/material/colors'



export default function WIPselector({ wip_ids = [] }) { // Destructure wip_ids and provide a default value
  const [currWIP, handleWIPselect] = React.useState()
  
  const handleChange = (event, newWIP) => {
    handleWIPselect(newWIP)
  }

  console.log(wip_ids);

  // Ensure wip_ids is an array before using map
  return (
        
        <div>
          
          <ToggleButtonGroup 
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
          </ToggleButtonGroup>
        </div>
  );
}
