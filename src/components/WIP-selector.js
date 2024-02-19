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
    
        <ToggleButtonGroup 
        exclusive
        onChange={handleChange}
        className="WIP-list" 
        orientation="vertical" 
        aria-label="Vertical button group" 
        variant="scrollable"
        >
        {Array.isArray(wip_ids) && wip_ids.map((wip_id, index) => ( // Check if wip_ids is an array
            <ToggleButton style={{
                backgroundColor: currWIP === wip_id ? 'green' : undefined,
                // Leave undefined to use default background color for unselected buttons
              }}key={index} value={wip_id} className="WIP-selector-button">
            {wip_id}
            </ToggleButton>
        ))}
        </ToggleButtonGroup>
  );
}
