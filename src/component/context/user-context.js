import React,{createContext} from 'react';
const UserContext = createContext({username:'', setUsername: () => { }});
export default UserContext;