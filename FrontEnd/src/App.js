import './App.css';
import { Typography, Stack, Switch, FormControlLabel, FormGroup, Input, InputLabel, FormControl, Button, ToggleButtonGroup, ToggleButton, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';
import React,{useState, useEffect} from 'react';
<<<<<<< Updated upstream
import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
  
=======
import { DataGrid } from '@mui/x-data-grid';  
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

>>>>>>> Stashed changes
function App() {
  const [currWIP, handleWIPselect] = useState();
  const [searchInput, setSearchInput] = useState('');
  
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [TSNdataID, setTSNdataID] = useState([]);
  const [TSN_REJdata, setTSN_REJdata] = useState([]);
  const [BOMdata, setBOMData] = useState([]);
  const [WIPData, setWIPData] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
    filterWIPs(event.target.value);
  };


  //Handle WIP selector change
  const handleChange = (event, newWIP) => {
    handleWIPselect(newWIP)
  }

  //
  const filterWIPs = (input) => {
    const filteredWIPs = data.filter((d) =>
      d.WIP_JOB_NUMBER.toString().includes(input)
    );
    setFilteredData(filteredWIPs);
  };
  
  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
    '&:active': {
      '& .MuiSwitch-thumb': {
        width: 15,
      },
      '& .MuiSwitch-switchBase.Mui-checked': {
        transform: 'translateX(9px)',
      },
    },
    '& .MuiSwitch-switchBase': {
      padding: 2,
      '&.Mui-checked': {
        transform: 'translateX(12px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'green' ? '#177ddc' : '#1890ff',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
      width: 12,
      height: 12,
      borderRadius: 6,
      transition: theme.transitions.create(['width'], {
        duration: 200,
      }),
    },
    '& .MuiSwitch-track': {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor:
        theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
      boxSizing: 'border-box',
    },
  }));
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

const tsn_rej = TSNdataID.filter(item => item.MES_SRNO_STATUS === '03');
const tsn_rej_count = tsn_rej.length;

const tsn_close = TSNdataID.filter(item => item.MES_SRNO_STATUS === '04');
const tsn_close_count = tsn_close.length;
const tsn_other = TSNdataID.filter(item => item.MES_SRNO_STATUS !== '04');
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
  Then placed in the middle is the WIP scope grid, leaving an empty space underneath
  After that, there is the TSN table placed to the right side of screen
  Lastly the BOM table is in a grid in the bottom right, under the TSN table */
  return (
      <div className="App">
                 
        <Grid container direction="row" justifyContent="flex-start"spacing={2}>
          <Grid item xs={2}>
<<<<<<< Updated upstream
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
=======
            <div>
              <FormControl>
                <InputLabel htmlFor="my-input">Enter a WIP or TSN #</InputLabel>
                <Input id="my-input" aria-describedby="my-helper-text" />
              </FormControl>

              <FormGroup>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography>WIP</Typography>
                  <AntSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }} />
                  <Typography>TSN</Typography>
                </Stack>
              </FormGroup>

              <Button
                variant="outlined" color="success"
                value={Input}
                onClick={handleSearchInputChange}
              >
                Search
              </Button>
            </div> 
            <div className='WIPSelectorLabel'>
                WIP Selector
            </div>
>>>>>>> Stashed changes
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
                    {d.WIP_JOB_NUMBER} - QTY: {d.WIP_JOB_QTY}
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
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold', m: 1 }}>Model #</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', m: 1 }}>ID21</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', m: 1 }}>WIP Type</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
<<<<<<< Updated upstream
=======
                    <TableRow>
                      <TableCell>{tsn_rej_count}</TableCell>
                      <TableCell>{tsn_close_count}</TableCell>
                      <TableCell>{tsn_other_count}</TableCell>
                    </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          
          <div className='WIPscope'>WIP Scope</div>
            <TableContainer component={Paper}>
              <Table sx={{ height: 400, minWidth: 200 }} aria-label="spanning table">
                <TableBody>
>>>>>>> Stashed changes
                {WIPData.map((b) =>(
                    <TableRow>
                      <TableCell>{b.MODEL_NUMBER}</TableCell>
                      <TableCell>{b.ID21_ITEM_NUMBER}</TableCell>
                      <TableCell>{b.WIP_TYPE}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold', m: 1 }}>Turbo Type</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', m: 1 }}>Assembly Line</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', m: 1 }}>Customer</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {WIPData.map((b) =>(
                    <TableRow>
                      <TableCell>{b.TURBO_TYPE}</TableCell>
                      <TableCell>{b.ASSEMBLY_LINE}</TableCell>
                      <TableCell>{b.CUSTOMER_SHORT_NAME}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold', m: 1 }}>SCH Ship</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', m: 1 }}>Job Start</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', m: 1 }}>Last Update</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {WIPData.map((b) =>(
                    <TableRow>
                      <TableCell>{b.SCH_SHIP_DATE}</TableCell>
                      <TableCell>{b.JOB_START_DATE}</TableCell>
                      <TableCell>{b.LAST_UPDATE_DATE}</TableCell>
                    </TableRow>
                    ))}

                </TableBody>
              </Table>
            </TableContainer>
          </Grid>



          <Grid item xs={5}>
            <div className='TSNTableLabel'>TSN Table</div>
<<<<<<< Updated upstream
            <div style={{ height: 400, width: '100%' }} className="TSNtable">
=======
            
            <div style={{ height: 400, width: '100%' }}>
>>>>>>> Stashed changes
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
