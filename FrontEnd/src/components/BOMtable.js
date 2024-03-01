import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

/* As of now this component is not used from import to App.js 
   but is being used as reference for the UI */

const columns = [
  { field: 'id', headerName: 'Item #', width: 200 },
  { field: 'item_desc', headerName: 'Item Desc', width: 200 },
];

const rows = [
  { id: 3519163, item_desc: 'SCREW.DRIVE'},
];

export default function DataTable() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
}
