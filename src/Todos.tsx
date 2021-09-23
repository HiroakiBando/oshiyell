import { DataStore } from '@aws-amplify/datastore';
import React, { useEffect } from 'react';
import { Todo } from './models';

const Todos = () => {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [title, setTitle] = React.useState<string>("");

  useEffect(()=>{
    DataStore.query(Todo).then((res)=>{
      setTodos(res)
    });

    const subscription = DataStore.observe(Todo).subscribe(msg => {
      DataStore.query(Todo).then((res)=>{
        setTodos(res)
      });
    });

    return ()=>{subscription.unsubscribe()}

  },[])



  return <div>
    <input onChange={(event)=>{
      setTitle(event.target.value)
    }}/>
    <button onClick={(event)=>{
      DataStore.save(
        new Todo({
          name: title
        })
      );
    }}>
      sakusei
    </button>
    <div>
      {title}
    </div>
    {todos.map((todo)=>{
    return <p>{todo.name}</p>
  })}</div>  
};

export default Todos