import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import React from 'react';




export default function WIPselector({ wip_id }) { // Destructure wip_ids and provide a default value
  console.log(wip_id);

  // Ensure wip_ids is an array before using map
  return (
        <ToggleButtonGroup>
          <ToggleButton value={wip_id} className="WIP-selector-button">
            {wip_id}
          </ToggleButton>
        </ToggleButtonGroup>
  );
}
