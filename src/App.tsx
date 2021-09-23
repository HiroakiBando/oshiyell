import React from "react";

import Amplify, { DataStore } from "aws-amplify";
import {
  AmplifyAuthenticator,
  AmplifySignUp,
  AmplifySignOut,
} from "@aws-amplify/ui-react";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
import awsconfig from "./aws-exports";
import Todos from "./Todos";
import UserForm from "./UserForm";
import { User } from "./models";
import Teachers from "./Teachers";
import Students from "./Students";

Amplify.configure(awsconfig);

const App = () => {
  const [authState, setAuthState] = React.useState<AuthState>();
  const [user, setUser] = React.useState<any>();
  const [appUser, setAppUser] = React.useState<User>();

  React.useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, []);

  React.useEffect(() => {
    if (user && user.attributes) {
      DataStore.query(User, (c) => c.owner("eq", user.attributes.sub)).then(
        (res) => {
          if (res.length >= 1) {
            setAppUser(res[0]);
          }
        }
      );
    }
  }, [user]);

  if (authState === AuthState.SignedIn && user) {
    if (appUser) {
      return (
        <div>
          <Teachers />
          <Students />
          <AmplifySignOut />
        </div>
      );
    } else {
      return (
        <div>
          <UserForm userId={user.attributes?.sub} onSuccess={(user)=>{
            setAppUser(user)
          }}/>
          <AmplifySignOut />
        </div>
      );
    }
  } else {
    return (
      <AmplifyAuthenticator>
        <AmplifySignUp
          slot="sign-up"
          formFields={[
            { type: "username" },
            { type: "password" },
            { type: "email" },
          ]}
        />
      </AmplifyAuthenticator>
    );
  }
};

export default App;
