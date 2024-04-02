import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

/* As of now this component is not used from import to App.js 
   but is being used as reference for the UI */

const columns = [
  { field: 'id', headerName: 'Open', width: 150 },
  { field: 'rejected', headerName: 'Rejected (03)', width: 150},
  { field: 'close', headerName: 'Close (04)', width: 150},
];

const rows = [
  { id: 0, rejected: 8, close: 90 },
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
