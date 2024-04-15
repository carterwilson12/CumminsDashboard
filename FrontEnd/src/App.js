import './App.css';
import { MenuItem, Select, List, ListItem, ListItemText, TextField , Switch, FormControlLabel, FormGroup, Input, InputLabel, FormControl, Button, ToggleButtonGroup, ToggleButton, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';
import React,{useState, useEffect} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import DownloadIcon from '@mui/icons-material/Download';

function App() {
  const [TSNdataID, setTSNdataID] = useState([]);
  const [TSN_REJdata, setTSN_REJdata] = useState([]);
  const [BOMdata, setBOMData] = useState([]);
  const [WIPData, setWIPData] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [lineOption, setlineOption] = useState(''); 
  const [dateOption, setdateOption] = useState(''); 
  const [currWIP, handleWIPselect] = useState();
  const [results, setResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('');



  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "50%",
    height: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const handleClassName = (params) => {
    if(params.row.MES_SRNO_STATUS === "03")
    {
      return `status-${params.row.MES_SRNO_STATUS}`
    }
    else{
      return "status-none"
    }
  };

  const handleRowClick = (params) => {
    if(params.row.MES_SRNO_STATUS === "03"){
      handleOpen()
      TSN_REJ(params.row.PRD_SERIAL_NUMBER)
      console.log(params.row.PRD_SERIAL_NUMBER)
      }
  };


  // const handleSearchInputChange = (event) => {
  //   setSearchInput(event.target.value);
  //   filterWIPs(event.target.value);
  // };
  
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
  
  const handleSearch = () => {

    const queryParams = new URLSearchParams({
      query: searchQuery,
      type: searchType,
      line: lineOption,
      date: dateOption,

    }).toString();
  
    fetch(`http://localhost:8081/search?${queryParams}`)
    .then(res => res.json())
    .then(results => setResults(results))
    .catch(err => console.log(err))
  };

  const ResultsList = ({ results }) => {
    console.log(results)
    if (results.length === 0) {
      return <Typography variant="subtitle1">No Results Found.</Typography>;
    }
    else if(results[0] === 'blank'){
      return <Typography variant="subtitle1">Insuffcient Search Criteria.<br/>You must select a Query.</Typography>;
    }
  }
  const WIPS = (value) =>{
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

const tsn_rej = TSNdataID.filter(item => item.MES_SRNO_STATUS === '03');
const tsn_rej_count = tsn_rej.length;

const tsn_close = TSNdataID.filter(item => item.MES_SRNO_STATUS === '04');
const tsn_close_count = tsn_close.length;

const tsn_other = TSNdataID.filter(item => item.MES_SRNO_STATUS !== '04' && item.MES_SRNO_STATUS !== '03');
const tsn_other_count = tsn_other.length;

// data gathering from MES dummy data to TSN Compenent Rejected table
const TSN_REJ = (value) =>{
  fetch(`http://localhost:8081/tsn_rej/${value}`)
  .then(res => res.json())
  .then(TSN_REJdata => setTSN_REJdata(TSN_REJdata))
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
  Then placed in the middle is the Quantity Breadown Table & WIP Scope grid
  And lastly the TSN Table & BOM Table grid to the right */
  return (
      <div className="App">
        <Grid container direction="row" justifyContent="flex-start"spacing={2}>
          <Grid item xs={2}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Search"
                variant="outlined"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                fullWidth />
              <FormControl fullWidth>
                <InputLabel id="query-type-select-label">Query</InputLabel>
                <Select
                  labelId="query-type-select-label"
                  id="query-type-select"
                  value={searchType}
                  label="query-type"
                  onChange={(e) => setSearchType(e.target.value)}>
                  <MenuItem value="wip">WIP</MenuItem>
                  <MenuItem value="tsn">TSN</MenuItem>
                  <MenuItem value="ID21">ID21</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="line-select-label">Line</InputLabel>
                <Select
                  labelId="line-select-label"
                  id="line-select"
                  value={lineOption}
                  label="line"
                  onChange={(e) => setlineOption(e.target.value)}>
                  <MenuItem value=""><em>None</em></MenuItem>
                  <MenuItem value="ALPHA LINE">Alpha</MenuItem>
                  <MenuItem value="BETA LINE">Beta</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="date-select-label">Since</InputLabel>
                <Select
                  labelId="date-select-label"
                  id="date-select"
                  value={dateOption}
                  label="date"
                  onChange={(e) => setdateOption(e.target.value)}>
                  <MenuItem value=""><em>None</em></MenuItem>
                  <MenuItem value="24hrs">24 Hrs </MenuItem>
                  <MenuItem value="7days">7 Days</MenuItem>
                  <MenuItem value="15days">15 Days</MenuItem>
                  <MenuItem value="30days">30 Days</MenuItem>
                </Select>
              </FormControl>
              <Button variant="contained" onClick={handleSearch}>Search</Button>
              <br/>
              <ResultsList results={results} />
            </Box>
            <div>
              {console.log(results)}
              <ToggleButtonGroup 
              exclusive
              onChange={handleChange}
              className="WIP-list" 
              orientation="vertical" 
              aria-label="Vertical button group">
                {results.map((d) =>(
                  d === "blank" ? '' :
                  <ToggleButton style={{
                    backgroundColor: currWIP === d.WIP_JOB_NUMBER ? '#2c387e':"white", 
                    color: currWIP === d.WIP_JOB_NUMBER ? 'white' : undefined
                    }} 
                    key={d.WIP_JOB_NUMBER} value={d.WIP_JOB_NUMBER} 
                    className="WIP-selector-button" 
                    onClick={e => TSN(d.WIP_JOB_NUMBER, BOM(d.WIP_JOB_NUMBER), WIPS(d.WIP_JOB_NUMBER))}
                    >
                    WIP: {d.WIP_JOB_NUMBER} <br/>ID21: {d.ID21_ITEM_NUMBER}<br/>QTY: {d.WIP_JOB_QTY}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </div>
          </Grid>
          <Grid item xs={5}>
            <TableContainer component={Paper}>
              <Table sx={{ height: 100, minWidth: 200 }} aria-label="spanning table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left" colSpan={3} style={{fontSize:20}}>
                    Quantity Breakdown
                    </TableCell>
                  </TableRow>
                  <TableRow>
                  <TableCell style={{backgroundColor: '#df1f1f', height: '5px'}} sx={{ fontWeight: 'bold', m: 1 }}></TableCell>
                    <TableCell style={{backgroundColor: '#0ab919', height: '5px' }} sx={{ fontWeight: 'bold', m: 1 }}></TableCell>
                    <TableCell style={{backgroundColor: '#ebc90a', height: '5px' }} sx={{ fontWeight: 'bold', m: 1 }}></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                      <TableCell><b>Rejected (03)</b> <br></br>{tsn_rej_count}</TableCell>
                      <TableCell><b>Closed (04)</b><br></br>{tsn_close_count}</TableCell>
                      <TableCell><b>Open (other)</b><br></br>{tsn_other_count}</TableCell>
                    </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <div style={{height: 205}}></div>
            <TableContainer component={Paper}>
              <Table sx={{ height: 415, minWidth: 200 }} aria-label="spanning table">
              <TableHead>
                  <TableRow>
                    <TableCell align="left" colSpan={3} style={{fontSize:20}}>
                      WIP Scope
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {WIPData.map((b) =>(
                    <TableRow>
                      <TableCell><span style={{ fontWeight: 'bold', m: 1 }}>Model #</span> <br/> {b.MODEL_NUMBER}</TableCell>
                      <TableCell><span style={{ fontWeight: 'bold', m: 1 }}>ID21</span> <br/>{b.ID21_ITEM_NUMBER}</TableCell>
                      <TableCell><span style={{ fontWeight: 'bold', m: 1 }}>WIP Type</span><br/>{b.WIP_TYPE}</TableCell>
                    </TableRow>
                    ))}
                {WIPData.map((b) =>(
                    <TableRow>
                      <TableCell><span style={{ fontWeight: 'bold', m: 1 }}>Turbo Type</span><br/>{b.TURBO_TYPE}</TableCell>
                      <TableCell><span style={{ fontWeight: 'bold', m: 1 }}>Assembly Line</span><br/>{b.ASSEMBLY_LINE}</TableCell>
                      <TableCell><span style={{ fontWeight: 'bold', m: 1 }}>Customer</span><br/>{b.CUSTOMER_SHORT_NAME}</TableCell>
                    </TableRow>
                    ))}
                {WIPData.map((b) =>(
                  <TableRow>
                    <TableCell><span style={{ fontWeight: 'bold', m: 1 }}>SCH Ship</span> <br/>{b.SCH_SHIP_DATE}</TableCell>
                    <TableCell><span style={{ fontWeight: 'bold', m: 1 }}>Job Start</span><br/>{b.JOB_START_DATE}</TableCell>
                    <TableCell><span style={{ fontWeight: 'bold', m: 1 }}>Last Update</span><br/>{b.LAST_UPDATE_DATE}</TableCell>
                  </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={5}>
          
          
          <TableContainer component={Paper}>
          <TableCell style={{fontSize: 20, display: 'flex', justifyContent: 'space-between'}}>
            <span style={{alignSelf: 'center'}}>TSN Table</span>
            <Button variant='contained' onClick={downloadCSV} endIcon={<DownloadIcon />}>
              Download Excel file
            </Button>
          </TableCell>
            </TableContainer>
            <div style={{ height: 355, width: '100%' }}>
              <DataGrid
                sx={{
                  '& .status-03': {
                    backgroundColor: "red",
                    color: "white",
                    transition: ".2s ease",
                    '&:hover': {
                      backgroundColor: "#8B0000",
                      color: "white",
                      cursor: "pointer"
                    },
                    '&.Mui-selected': {
                      backgroundColor: "#8B0000",
                      color: "white",
                      cursor: "pointer",
                      transition: ".2s ease",
                      '&:hover': {
                        backgroundColor: "#8B0000",
                        color: "white",
                      },
                    },
                  },
                  '& .status-none': {
                    backgroundColor: "white",
                    transition: ".2s ease",
                    '&:hover': {
                      backgroundColor: "white",
                    },
                    '&.Mui-selected': {
                      backgroundColor: "white",
                      transition: ".2s ease",
                      '&:hover': {
                        backgroundColor: "white",
                      },
                    },
                  },
                }}
                getRowClassName={handleClassName}
                rows={TSNdataID.map((t) =>({ id: t.PRD_SERIAL_NUMBER, wip: t.WIP_JOB_NUMBER, id21: t.ID21_ITEM_NUMBER,
                  MES_SRNO_STATUS: t.MES_SRNO_STATUS, VOC_INSPECTION_STATUS: t.VOC_INSPECTION_STATUS}))}
                columns={TSNcolumns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 25 },
                  }, 
                }}
                pageSizeOptions={[25, 50, 75, 100]}
                onRowClick= {handleRowClick}
                disableSelectionOnClick={true}
              />
              <div>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <DataGrid
                      rows={TSN_REJdata.map((tr) =>({ id: tr.COMPONENT_ITEM_NUMBER, COMPONENT_DESCRIPTION: tr.COMPONENT_DESCRIPTION}))}
                      columns={BOMcolumns}
                      initialState={{
                        pagination: {
                          paginationModel: { page: 0, pageSize: 25 },
                        },
                      }}
                      pageSizeOptions={[25, 50]}
                    />
                  </Box>
                </Modal>
              </div>
            </div>
           
            <TableContainer component={Paper}>
              <TableCell align="left" colSpan={3} style={{fontSize:20}}>
                BOM Table
              </TableCell>
            </TableContainer>
            <div style={{ height: 355, width: '100%' }}>
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

