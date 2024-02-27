import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';

<<<<<<< HEAD:FrontEnd/src/components/TSNtable.js
const sample = [
  ['73213', 0.4, 0, 0, 0],
  ['73214', 0.1, 0, 0, 0],
  ['73215', 0.1, 0, 0, 0],
  ['73216', 0.1, 0, 0, 0],
  ['73217', 0.1, 0, 0, 0],
];

function createData(id, tsn, status, placeholder1, placeholder2, placeholder3) {
    return { id, tsn, status, placeholder1, placeholder2, placeholder3 };
=======
function createData(id, tsn, status, voc ) {
    return { id, tsn, status, voc };
>>>>>>> master:src/components/TSNtable.js
}

const columns = [
  {
    width: 50,
    label: 'TSN',
    dataKey: 'tsn',
  },
  {
    width: 120,
    label: 'Status',
    dataKey: 'status',
  },
  {
    width: 120,
    label: 'VOC',
    dataKey: 'voc',
  },
];

<<<<<<< HEAD:FrontEnd/src/components/TSNtable.js
var i = 0;
const rows = Array.from({ length: sample.length }, (_, index) => {
    var selection = sample[i];
    i++;
  return createData(index, ...selection);
=======
export default function ReactVirtualizedTable({sample = []}) {

    var i = 0;
    const rows = Array.from({ length: sample.length }, (_, index) => {
        var selection = sample[i];
        i++;
  return createData(index, ...selection);

>>>>>>> master:src/components/TSNtable.js
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