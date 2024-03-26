import './App.css';
import { ToggleButtonGroup, ToggleButton, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button} from '@mui/material';
import React,{useState, useEffect} from 'react';
import { DataGrid } from '@mui/x-data-grid';  
function App() {
  const [currWIP, handleWIPselect] = React.useState();
  const [searchInput, setSearchInput] = useState('');
  
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [TSNdataID, setTSNdataID] = useState([]);
  const [BOMdata, setBOMData] = useState([]);
  const [WIPData, setWIPData] = useState([]);


  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
    filterWIPs(event.target.value);
  };
  
  const downloadCSV = () => {
    console.log(TSNdataID)
    const TSNdata = TSNdataID.map((t) =>({ id: t.PRD_SERIAL_NUMBER, MES_SRNO_STATUS: t.MES_SRNO_STATUS, VOC_INSPECTION_STATUS: t.VOC_INSPECTION_STATUS}))
      console.log(TSNdata)
    const csvData = convertArrayOfObjectsToCSV(TSNdata);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  //Handle WIP selector change
  const handleChange = (event, newWIP) => {
    handleWIPselect(newWIP)
  }
  const convertArrayOfObjectsToCSV = (data) => {
    const csv = data.map(row => Object.values(row).join(','));
    return ['TSN, MES_SRNO_STATUS, VOC'].concat(csv).join('\n');
  };
  //
  const filterWIPs = (input) => {
    const filteredWIPs = data.filter((d) =>
      d.WIP_JOB_NUMBER.toString().includes(input)
    );
    setFilteredData(filteredWIPs);
  };
  

// data gathering from MES dummy data to WIP selector
  useEffect(()=>{
    fetch('http://localhost:8081/wips')
    .then(res => res.json())
    .then(data => {setData(data); setFilteredData(data);})
    .catch(err => console.log(err))
  },[])

// data gathering from MES dummy data to WIP scope
  const WIP = (value) =>{
    fetch(`http://localhost:8081/wip/${value}`)
    .then(res => res.json())
    .then(WIPData => setWIPData(WIPData))
    .catch(err => console.log(err))
  }

// data gathering from MES dummy data to TSN table
  const TSN = (value) =>{
    fetch(`http://localhost:8081/tsn/${value}`)
    .then(res => res.json())
    .then(TSNdataID => setTSNdataID(TSNdataID))
    .catch(err => console.log(err))
}

// data gathering from MES dummy data to BOM table
const BOM = (value) =>{
  fetch(`http://localhost:8081/bom/${value}`)
  .then(res => res.json())
  .then(BOMdata => setBOMData(BOMdata))
  .catch(err => console.log(err))
}

  // TSN display item columns; shouldn't change
  const TSNcolumns = [
    { field: 'id', headerName: 'TSN', width: 200 },
    { field: 'MES_SRNO_STATUS', headerName: 'TSN Status', width: 200 },
    { field: 'VOC_INSPECTION_STATUS', headerName: 'VOC', width: 200 },
  ];

  // BOM display item columns; shouldn't change
  const BOMcolumns = [
    { field: 'id', headerName: 'Item #', flex: 0.5 },
    { field: 'COMPONENT_DESCRIPTION', headerName: 'Item Desc', flex: 0.5 },
  ];


  /* Set up of UI:
  Top left is where the Search Bar component lives
  Underneath is the WIP selector grid, that stretches to the bottom of the screen
  Then placed in the middle is the WIP scope grid, leaving an empty space underneath
  After that, there is the TSN table placed to the right side of screen
  Lastly the BOM table is in a grid in the bottom right, under the TSN table */
  return (
      <div className="App">
                 
        <Grid container direction="row" justifyContent="flex-start"spacing={2}>
          <Grid item xs={2}>
          <div className="SearchBar">
         <input
          type="text"
          placeholder='Search for a WIP'
          id="searchinput"
          name="searchinput"
          value={searchInput}
          onChange={handleSearchInputChange}
        ></input>
        
        
      </div> 
          <div className='WIPSelectorLabel'>WIP Selector</div>
            <div>
              <ToggleButtonGroup 
              exclusive
              onChange={handleChange}
              className="WIP-list" 
              orientation="vertical" 
              aria-label="Vertical button group" 
              variant="contained"
              >
                {filteredData.map((d) =>(
                  <ToggleButton style={{
                    backgroundColor: currWIP === d.WIP_JOB_NUMBER ? '#2c387e' : undefined,color: currWIP === d.WIP_JOB_NUMBER ? 'white' : undefined
                    }} key={d.WIP_JOB_NUMBER} value={d.WIP_JOB_NUMBER} className="WIP-selector-button" onClick={e => TSN(d.WIP_JOB_NUMBER, BOM(d.WIP_JOB_NUMBER),WIP(d.WIP_JOB_NUMBER))}>
                    WIP: {d.WIP_JOB_NUMBER} <br/>QTY: {d.WIP_JOB_QTY}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </div>
          </Grid>
          {/* WIP Status component goes inside this grid item*/}
          <Grid item xs={5}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 200 }} aria-label="spanning table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" colSpan={3}>
                      WIP Scope
                    </TableCell>
                  </TableRow>
                  {WIPData.map((b) =>(
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold', m: 1 }}>Model # <br/> {b.MODEL_NUMBER}</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', m: 1 }}>ID21 <br/>{b.ID21_ITEM_NUMBER}</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', m: 1 }}>WIP Type<br/>{b.WIP_TYPE}</TableCell>
                    </TableRow>
                    ))}
                </TableHead>
                <TableHead>
                {WIPData.map((b) =>(
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold', m: 1 }}>Turbo Type<br/>{b.TURBO_TYPE}</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', m: 1 }}>Assembly Line<br/>{b.ASSEMBLY_LINE}</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', m: 1 }}>Customer<br/>{b.CUSTOMER_SHORT_NAME}</TableCell>
                    </TableRow>
                    ))}
                </TableHead>
                <TableHead>
                {WIPData.map((b) =>(
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold', m: 1 }}>SCH Ship <br/>{b.SCH_SHIP_DATE}</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', m: 1 }}>Job Start<br/>{b.JOB_START_DATE}</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', m: 1 }}>Last Update<br/>{b.LAST_UPDATE_DATE}</TableCell>
                  </TableRow>
                  ))}
                </TableHead>
              </Table>
            </TableContainer>
          </Grid>



          <Grid item xs={5}>
            <div className='TSNTableLabel'>TSN Table</div>
            
            <div style={{ height: 400, width: '100%' }} className="TSNtable">
              <DataGrid
                rows={TSNdataID.map((t) =>({ id: t.PRD_SERIAL_NUMBER, wip: t.WIP_JOB_NUMBER, id21: t.ID21_ITEM_NUMBER,
                  MES_SRNO_STATUS: t.MES_SRNO_STATUS, VOC_INSPECTION_STATUS: t.VOC_INSPECTION_STATUS}))}
                columns={TSNcolumns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 25 },
                  }, 
                }}
                pageSizeOptions={[25, 50, 75, 100]}
              />
            </div>
            <Button onClick={downloadCSV}>Export to excel</Button>
            <div className='BOMTableLabel'>BOM Table</div>
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={BOMdata.map((b) =>({ id: b.COMPONENT_ITEM_NUMBER, COMPONENT_DESCRIPTION: b.COMPONENT_DESCRIPTION}))}
                columns={BOMcolumns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 25 },
                  },
                }}
                pageSizeOptions={[25, 50]}
              />
            </div>
          </Grid>
        </Grid>
      </div>
  );
}

export default App;
