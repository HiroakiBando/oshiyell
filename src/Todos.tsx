import { DataStore } from "@aws-amplify/datastore";
import React, { useEffect } from "react";
import { Todo } from "./models";
import Input from "@mui/material/Input";
import { Button, InputAdornment, TextField } from "@mui/material";

const Todos = () => {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [title, setTitle] = React.useState<string>("");

  useEffect(() => {
    DataStore.query(Todo).then((res) => {
      setTodos(res);
    });

    const subscription = DataStore.observe(Todo).subscribe((msg) => {
      DataStore.query(Todo).then((res) => {
        setTodos(res);
      });
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div>
      <TextField
        label="With normal TextField"
        id="outlined-start-adornment"
        sx={{ m: 1, width: "auto" }}
        InputProps={{
          startAdornment: <InputAdornment position="start">kg</InputAdornment>,
        }}
        onChange={(event) => {
          setTitle(event.target.value);
        }}
      />

      <Button variant="contained" onClick={(event) => {
          DataStore.save(
            new Todo({
              name: title,
            })
          );
        }}>作成</Button>
    
      <div>{title}</div>
      {todos.map((todo) => {
        return <p>{todo.name}</p>;
      })}
    </div>
  );
};

export default Todos;
