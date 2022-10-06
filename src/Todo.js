import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components';
import ProgressBar from 'react-bootstrap/ProgressBar';


const TodoDiv = styled.div`
    margin: 1rem;
`

const DeleteBtn = styled.button`
    background-color: red;
    color: white;
    border: none;
    padding: 5px 9px;
    border-radius: 50%;
    cursor: pointer;
    float: right;
`


function Todo() {
    const id = useRef(4)
    const [todo, setTodo] = useState('');
    const dispatch  = useDispatch()
    const state = useSelector((state)=>state)

    const onChange = (e)=>{
        setTodo(e.target.value)
    }

    const onSummit =() =>{
        dispatch({type:'SUMMIT', todo:todo, id:id})
        setTodo('')
        id.current +=1
    }

    console.log(state)

  return (
    <div>
        <h1>할 일 목록</h1>
        <div>완료된 TODO : { state.filter(item => item.finish === true).length }</div>
        <div>해야할 TODO : { state.filter(item => item.finish === false).length }</div>
        <br />
        <ProgressBar animated now={(state.filter(item => item.finish === true).length/state.length)*100} />
        <hr/>
        {state.map((item)=>{
            const id = item.id
            return (
                    <TodoDiv>
                        { item.finish ?
                        <sapn  onClick={()=>{dispatch({type:'FINISH', id:id})}} style={{textDecoration:'line-through', color:'#4d4d4d', cursor:'pointer'}}>{item.title}</sapn>
                        :<sapn style={{cursor:'pointer'}} onClick={()=>{dispatch({type:'FINISH', id:id})}}>{item.title}</sapn>
                        }
                        <DeleteBtn 
                            style={{float:'right'}} id={item.id} onMouseDown={()=>{dispatch({type:'DELETE', id:id})}}>X
                        </DeleteBtn>
                    </TodoDiv>
            )   
        })}
        <div style={{textAlign:'center'}}>
            <input  onChange={onChange} value={todo}></input>
            <button onClick={onSummit}>등록</button>
        </div>
    </div>
  );
}

export default Todo;