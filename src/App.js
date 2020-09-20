import React, {useEffect} from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import {auth} from "./firebase";
import {useStateValue} from "./StateProvider";

function App() {
    //eslint-disable-next-line
    const [{user},dispatch] = useStateValue()

    useEffect(()=>{
        auth.onAuthStateChanged(authUser=>{
            console.log('THE USER IS >>>',authUser)

            if (authUser){
                dispatch({
                    type:"SET_USER",
                    user: authUser
                })
            }else {
                dispatch({
                    type:"SET_USER",
                    user:{}
                })
            }
        })
        //eslint-disable-next-line
    },[])

  return (
      <Router>
        <div className="App">
          <Switch>
              <Route path={'/login'}>
                  <Login login={true}/>
              </Route>
              <Route path={'/register'}>
                  <Login login={false}/>
              </Route>
            <Route path={'/'}>
                <Home/>
            </Route>
          </Switch>
        </div>
      </Router>
  );
}

export default App;
