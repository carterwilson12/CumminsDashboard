import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(id, name1, name2, name3, name4, name5) {
  return {id, name1, name2, name3, name4, name5 };
}

export default function DenseTable({sample2 = []}) {

  var i = 0;
    const rows = Array.from({ length: sample2.length }, (_, index) => {
        var selection = sample2[i];
        i++;
  return createData(index, ...selection);

});

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
