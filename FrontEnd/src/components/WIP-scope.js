import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// function priceRow(qty, unit) {
//   return qty * unit;
// }

// function createRow(desc, qty, unit) {
//   const price = priceRow(qty, unit);
//   return { desc, qty, unit };
// }

// function subtotal(items) {
//   return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
// }

// const rows = [
//   createRow('HE300VG', 5327342, 0),
// ];

/* Code above is not in use but if needed there is a createRow function */

export default function SpanningTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 200 }} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              WIP Scope
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Model #</TableCell>
            <TableCell>ID21</TableCell>
            <TableCell>WIP Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow>
              <TableCell>HE300VG</TableCell>
              <TableCell>5327342</TableCell>
              <TableCell>0</TableCell>
            </TableRow>
        </TableBody>
        <TableHead>
          <TableRow>
            <TableCell>Turbo Type</TableCell>
            <TableCell>Assembly Line</TableCell>
            <TableCell>Customer</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow>
              <TableCell>TURBO ID21</TableCell>
              <TableCell>BETA LINE</TableCell>
              <TableCell>CDC</TableCell>
            </TableRow>
        </TableBody>
        <TableHead>
          <TableRow>
            <TableCell>SCH Ship</TableCell>
            <TableCell>Job Start</TableCell>
            <TableCell>Last Update</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow>
              <TableCell>19-Aug-19</TableCell>
              <TableCell>19-Aug-19</TableCell>
              <TableCell>19-Aug-19</TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
