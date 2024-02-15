import logo from './logo.svg';
import './App.css';
import ListGroup from 'react-bootstrap/ListGroup';

function App() {
  const alertClicked = () => {
    alert('You clicked the third ListGroupItem');
  };
  return (  // whaddup
    <div className="App">
        <div className="WIP-selector">  
          <ListGroup defaultActiveKey="#link1">
            <ListGroup.Item action href="#link1">
              Link 1
            </ListGroup.Item>
            <ListGroup.Item action href="#link2" disabled>
              Link 2
            </ListGroup.Item>
            <ListGroup.Item action onClick={alertClicked}>
              This one is a button
            </ListGroup.Item>
          </ListGroup>
        </div>
    </div>
  );
}

export default App;
