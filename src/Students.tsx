import { DataStore } from "@aws-amplify/datastore";
import React, { useEffect } from "react";
import { User } from "./models";
import Input from "@mui/material/Input";
import { Button, InputAdornment, TextField } from "@mui/material";
import { UserType } from "./models";

const Students = () => {
  const [Students, setStudents] = React.useState<User[]>([]);

  useEffect(() => {
    DataStore.query(User, (c) => c.userType("eq", UserType.STUDENT)).then(
      (res) => {
        setStudents(res);
      }
    );

    const subscription = DataStore.observe(User).subscribe((msg) => {
      DataStore.query(User, (c) => c.userType("eq", UserType.STUDENT)).then(
        (res) => {
          setStudents(res);
        }
      );
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div>
      <h2>生徒一覧</h2>
      {Students.map((User) => {
        return <p>{User.name}</p>;
      })}
    </div>
  );
};

export default Students;
