import { useState ,useEffect} from 'react';

import logo from './logo.svg';
import CardList from './Components/Card-list/card-list.component';
import SearchBox from './Components/search-box/search-box.component'
import './App.css';

const App=() =>{
  const [searchField,setSearchField] =useState(''); //[value ,setValue]
  const [monsters,setMonsters]=useState([]);
  const [filteredMonsters,setFilterMonsters]=useState(monsters);

  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((users) => setMonsters(users));
    
  },[])
  useEffect(()=>{
    const newFilteredMonsters=monsters.filter((monster)=>{
      return monster.name.toLocaleLowerCase().includes(searchField);
    })
    setFilterMonsters(newFilteredMonsters);
  },[monsters,searchField]);
  
  const onSearchChange =(event) =>{

      const searchFieldString=event.target.value.toLocaleLowerCase();
      setSearchField(searchFieldString);
      const filteredMonsters= monsters.filter((monster)=>{
        return monster.name.toLocaleLowerCase().includes(searchFieldString);  
  });
          
  }
  
  
   return (
     <div className='App'>
       <h1 className='app-title'>Monster Rolodex</h1>

       <SearchBox
          className='monsters-search-box'
          onChangeHandler={onSearchChange}
          placeholder='Search Monsters'
        /> 
        <CardList monsters={filteredMonsters} /> 
     </div>
   )
}



// class App extends Component {
  
//   constructor(){
//     super();
//     this.state={
//       monsters:[],
//       searchField:''
      
//     }
    
//   }
//   componentDidMount(){
    
//     fetch('https://jsonplaceholder.typicode.com/users')
//     .then((response) => response.json())
//     .then((users) => this.setState(()=>{
//       return {monsters:users}
//     }
//     ))
//   }
//   onSearchChange=(event) =>{
    
//     const searchField=event.target.value.toLocaleLowerCase();
   
//     this.setState(
//       ()=>{
//      return {searchField};
//     })
//   }
//   render(){

    
//     const {monsters,searchField}=this.state;
//     const {onSearchChange}=this;

//     const filteredMonsters= monsters.filter((monster)=>{
//       return monster.name.toLocaleLowerCase().includes(this.state.searchField);  
//    });
//     return (      
//       <div className="App">
//           <h1 className='app-title'>Monsters Rolodex</h1>
//         <SearchBox onChangeHandler={onSearchChange} placeholder='search monsters' className='monsters-search-box'/>
//         <CardList monsters={filteredMonsters} />
//       </div>
//     );
//   }
  
// }

export default App;
