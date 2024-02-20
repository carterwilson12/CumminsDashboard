import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';

function createData(id, tsn, status, placeholder1, placeholder2, placeholder3) {
    return { id, tsn, status, placeholder1, placeholder2, placeholder3 };
}



const columns = [
  {
    width: 200,
    label: 'TSN',
    dataKey: 'tsn',
  },
  {
    width: 120,
    label: 'Status\u00A0(g)',
    dataKey: 'status',
    numeric: true,
  },
  {
    width: 120,
    label: 'Placeholder1\u00A0(g)',
    dataKey: 'placeholder1',
    numeric: true,
  },
  {
    width: 120,
    label: 'Placeholder2\u00A0(g)',
    dataKey: 'placeholder2',
    numeric: true,
  },
  {
    width: 120,
    label: 'Placeholder3\u00A0(g)',
    dataKey: 'placeholder3',
    numeric: true,
  },
];

export default function ReactVirtualizedTable({sample = []}) {

    var i = 0;
    const rows = Array.from({ length: sample.length }, (_, index) => {
        var selection = sample[i];
        i++;
  return createData(index, ...selection);

});

const VirtuosoTableComponents = {
    Scroller: React.forwardRef((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
      <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
    ),
    TableHead,
    TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
    TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
  };

  function fixedHeaderContent() {
    return (
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            variant="head"
            align={column.numeric || false ? 'right' : 'left'}
            style={{ width: column.width }}
            sx={{
              backgroundColor: 'background.paper',
            }}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    );
  }
  
  function rowContent(_index, row) {
    return (
      <React.Fragment>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            align={column.numeric || false ? 'right' : 'left'}
          >
            {row[column.dataKey]}
          </TableCell>
        ))}
      </React.Fragment>
    );
  }

  return (
    <Paper style={{ height: 400, width: '100%' }}>
      <TableVirtuoso
        data={rows}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
}