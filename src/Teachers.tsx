import { DataStore } from "@aws-amplify/datastore";
import React, { useEffect } from "react";
import { User } from "./models";
import Input from "@mui/material/Input";
import { Button, InputAdornment, TextField } from "@mui/material";
import { UserType } from "./models";

const Teachers = () => {
  const [teachers, setTeachers] = React.useState<User[]>([]);

  useEffect(() => {
    DataStore.query(User, (c) => c.userType("eq", UserType.TEACHER)).then(
      (res) => {
        setTeachers(res);
      }
    );

    const subscription = DataStore.observe(User).subscribe((msg) => {
      DataStore.query(User, (c) => c.userType("eq", UserType.TEACHER)).then(
        (res) => {
          setTeachers(res);
        }
      );
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div>
      <h2>先生一覧</h2>
      {teachers.map((User) => {
        return <p>{User.name}</p>;
      })}
    </div>
  );
};

export default Teachers;
