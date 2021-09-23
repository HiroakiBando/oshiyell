import { makeStyles } from "@mui/styles";
import { Button, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { User, UserType } from "./models";
import React from "react";
import { DataStore } from "@aws-amplify/datastore";

const styles = {
  cardAction: {
    display: "block",
    textAlign: "initial",
  },
};

const useStyles = makeStyles(() => {
  return {
    cardAction: {
      display: "block",
      textAlign: "initial",
    },
  };
});

type Props = {
  userId : string,
  onSuccess : (user:User)=>void
};

function UserForm(props: Props) {
  const [userType, setUserType] = React.useState<UserType>();
  const [userName, setUserName] = React.useState<string>();
  return (
    <div>
      <ToggleButtonGroup
        color="primary"
        value={userType}
        exclusive
        onChange={(event, newUserType) => {
          setUserType(newUserType);
        }}
      >
        <ToggleButton value={UserType.TEACHER}>先生</ToggleButton>
        <ToggleButton value={UserType.STUDENT}>生徒</ToggleButton>
      </ToggleButtonGroup>
      <TextField label="名前" variant="outlined" onChange={(event)=>{
        setUserName(event.target.value)
      }
      }/>
      <Button variant="contained" onClick={(event) => {
          DataStore.save(
            new User({
              name: userName,
              userType: userType,
              owner: props.userId
            })
          ).then((res)=>{
            props.onSuccess(res)
          });
        }}>作成</Button>
    </div>
  );
}

export default UserForm;
