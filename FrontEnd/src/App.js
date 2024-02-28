import './App.css';
import AutocompleteHint from './components/autocomplete';
// import TSNtable from './components/TSNtable';
// import BOMtable from './components/BOMtable'
import { Button, ButtonGroup, ToggleButtonGroup, ToggleButton, Grid, Box} from '@mui/material';
import React,{useState, useEffect} from 'react';
import { DataGrid } from '@mui/x-data-grid';

  
function App() {
  const [currWIP, handleWIPselect] = React.useState()
  //Handle WIP selector change
  const handleChange = (event, newWIP) => {
    handleWIPselect(newWIP)
  }
  
  const [data, setData] = useState([])
  const [TSNdata, setTSNdata] = useState([])


  useEffect(()=>{
    fetch('http://localhost:8081/wips')
    .then(res => res.json())
    .then(data => setData(data))
    .catch(err => console.log(err))
  },[])

  useEffect(()=>{
    fetch('http://localhost:8081/tsn')
    .then(res => res.json())
    .then(TSNdata => setTSNdata(TSNdata))
    .catch(err => console.log(err))
  },[])
  
  const TSNcolumns = [
    { field: 'PRD_SERIAL_NUMBER', headerName: 'TSN', width: 200 },
    { field: 'MES_SRNO_STATUS', headerName: 'TSN Status', width: 200 },
    { field: 'VOC_INSPECTION_STATUS', headerName: 'VOC', width: 200 },
  ];

  const BOMcolumns = [
    { field: 'COMPONENT_ITEM_NUMBER', headerName: 'Item #', flex: 0.5 },
    { field: 'COMPONENT_DESCRIPTION', headerName: 'Item Desc', flex: 0.5 },
  ];

  const BOMrows = [
    { COMPONENT_ITEM_NUMBER: 3519163, COMPONENT_DESCRIPTION: 'SCREW.DRIVE'},
  ];

  return (
      <div className="App">
        <div className="SearchBar">  
          <AutocompleteHint></AutocompleteHint> 
        </div>          
        <Grid container direction="row" justifyContent="flex-start"spacing={2}>
          <Grid item xs={2}>
            <div>
              <ToggleButtonGroup 
              exclusive
              onChange={handleChange}
              className="WIP-list" 
              orientation="vertical" 
              aria-label="Vertical button group" 
              variant="contained"
              >
                {data.map((d) =>(
                  <ToggleButton style={{
                    backgroundColor: currWIP === d.WIP_JOB_NUMBER ? '#2c387e' : undefined,color: currWIP === d.WIP_JOB_NUMBER ? 'white' : undefined
                    }} key={d.WIP_JOB_NUMBER} value={d.WIP_JOB_NUMBER} className="WIP-selector-button">
                    {d.WIP_JOB_NUMBER}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </div>
          </Grid>
          <Grid item xs={10}>
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
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={8}>
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
