import './App.css';
import AutocompleteHint from './components/autocomplete';
// import TSNtable from './components/TSNtable';
// import BOMtable from './components/BOMtable'
import { Button, ButtonGroup, ToggleButtonGroup, ToggleButton, Grid, Box} from '@mui/material';
import React,{useState, useEffect} from 'react';
import { DataGrid } from '@mui/x-data-grid';

  
function App() {
  const [currWIP, handleWIPselect] = React.useState();
  const [searchInput, setSearchInput] = useState('');
  
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [TSNdata, setTSNdata] = useState([]);


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
  

// Assuimg: data gathering from MES dummy data to WIP selector
  useEffect(()=>{
    fetch('http://localhost:8081/wips')
    .then(res => res.json())
    .then(data => {setData(data); setFilteredData(data);})
    .catch(err => console.log(err))
  },[])

// Assuming: data gathering from MES dummy data to TSN table
  useEffect(()=>{
    fetch('http://localhost:8081/tsn')
    .then(res => res.json())
    .then(TSNdata => setTSNdata(TSNdata))
    .catch(err => console.log(err))
  },[])
  
  // TSN display item columns; shouldn't change
  const TSNcolumns = [
    { field: 'PRD_SERIAL_NUMBER', headerName: 'TSN', width: 200 },
    { field: 'MES_SRNO_STATUS', headerName: 'TSN Status', width: 200 },
    { field: 'VOC_INSPECTION_STATUS', headerName: 'VOC', width: 200 },
  ];

  // BOM display item columns; shouldn't change
  const BOMcolumns = [
    { field: 'COMPONENT_ITEM_NUMBER', headerName: 'Item #', flex: 0.5 },
    { field: 'COMPONENT_DESCRIPTION', headerName: 'Item Desc', flex: 0.5 },
  ];

  // BOM item data input
  const BOMrows = [
    { COMPONENT_ITEM_NUMBER: 3519163, COMPONENT_DESCRIPTION: 'SCREW.DRIVE'},
  ];


  /* Set up of UI:
  Top left is where the Search Bar component lives
  Next is a 2 x 2 grid pattern, holding first the WIP selector underneath the Search Bar
  Then inside the next grid is the TSN table
  After that, there is an empty grid to format the next grid evenly
  Lastly the BOM table holds the last grid*/
  return (
      <div className="App">
         <div className="SearchBar">
          
        
        
      </div>         
        <Grid container direction="row" justifyContent="flex-start"spacing={2}>
          <Grid item xs={2}>
          <input
          type="text"
          placeholder='Search for a WIP'
          id="searchinput"
          name="searchinput"
          value={searchInput}
          onChange={handleSearchInputChange}
        ></input>
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
                    }} key={d.WIP_JOB_NUMBER} value={d.WIP_JOB_NUMBER} className="WIP-selector-button">
                    {d.WIP_JOB_NUMBER}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </div>
          </Grid>
          {/* WIP Status component goes inside this grid item*/}
          <Grid item xs={5}>

            
          </Grid>



          <Grid item xs={5}>
            <div className='TSNTableLabel'>TSN Table</div>
            <div style={{ height: 400, width: '100%' }} className="TSNtable">
              <DataGrid
                rows={TSNdata.map((t) =>({ id: t.PRD_SERIAL_NUMBER, PRD_SERIAL_NUMBER: t.PRD_SERIAL_NUMBER,
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
            <div className='BOMTableLabel'>BOM Table</div>
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={BOMrows}
                getRowId={(row) => row.COMPONENT_ITEM_NUMBER}
                columns={BOMcolumns} // change this to BOM table data 
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
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
