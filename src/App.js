import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Navbar from './components/navbar';
import './App.css';

class App extends Component {
  
  constructor(){
    super();

    this.state = {
      users: [],
      searchFilter:''
    }
  }
  
  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res)=>{
        return res.json()
      }).then((users)=>{
        this.setState({users: users})
      });
  }
  
  render(){

    const {users, searchFilter} = this.state
    const filteredResults = users.filter((user)=>user.name.toLowerCase().includes(searchFilter.toLowerCase()));
   
    let {showCancel}=this.state;
    return (
      <React.Fragment>
        <Navbar  
          changeHandle={(e)=>{
            e.target.value?showCancel=true:showCancel=false
            this.setState({searchFilter: e.target.value, showCancel});
          }}
          searchString={searchFilter}
          showcancelbutton={showCancel}
          handleCancelClick={()=> this.setState({searchFilter: '', showCancel:false})}
          />
        <Container maxWidth="sm">
          <div className="App">
          {
            filteredResults.map((user)=>{
              return (
                <Paper key={user.name} style={{padding: "2px", margin: 15}}>
                  <h1 >{user.name}</h1>
                </Paper>
              )
            })
          }
        </div>
        </Container>
      </React.Fragment>
    );
  }
}

export default App;
