import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name1, name2, name3, name4, name5) {
  return { name1, name2, name3, name4, name5 };
}

const rows = [
  createData('part 1', 'part 2', 'part 3', 'part 4', 'part 5'),
  createData('part'),
  createData('part'),
  createData('part'),
  createData('part'),
];

export default function DenseTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">
                {row.name1}
              </TableCell>
              <TableCell align="left">{row.name2}</TableCell>
              <TableCell align="left">{row.name3}</TableCell>
              <TableCell align="left">{row.name4}</TableCell>
              <TableCell align="left">{row.name5}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
