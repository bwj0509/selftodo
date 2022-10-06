import './App.css';
import styled from 'styled-components';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Todo from './Todo';


const initialState = [
    {
      id:1,
      title:'공부하기',
      finish:false
    },
    {
      id:2,
      title:'청소하기',
      finish:true
    },
    {
      id:3,
      title:'친구 만나기',
      finish:false
    }
  ]


function reducer(state=initialState, action){
  switch(action.type){
    case 'TEST':
      console.log('test완료')
      return state
    case 'SUMMIT':
      const todo = action.todo
      const id = action.id.current
      return [...state, {id:id, title:todo, finish:false }]
    case 'DELETE':
      console.log(action.id)
      return [...state.filter((item)=>(item.id !== action.id))]
    case 'FINISH':
      console.log('test')
      return [...state.map(item => ( action.id===item.id ? {...item, finish:true} : item ))]

    default:
      return state
  }
}


const store = createStore(reducer)

const MainDiv = styled.div`
  background-color: #e8e8e8;
  margin: auto;
  width: 70%;
  height: 50%;
  padding: 2rem;
  border-radius: 3rem;
`


function App() {


  return (
    <Provider store={store}>
      <MainDiv>
        <Todo />
      </MainDiv>
    </Provider>
  );
}

export default App;
