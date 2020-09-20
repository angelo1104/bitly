import React, {useEffect, useState} from "react";import "./Dashboard.css"import {auth} from "../../firebase";import {useStateValue} from "../../StateProvider";import {useHistory} from "react-router-dom";import AppBar from "../AppBar/AppBar";function Dashboard(props) {    const history = useHistory()    const [originalURL,setOriginalURL] = useState('')    const [shortenedURL,setShortenedURL] = useState('')    const [message,setMessage] = useState(null)    //eslint-disable-next-line    const [{user},dispatch] = useStateValue()    const createShortenURL = (e)=>{        e.preventDefault()        console.log(shortenedURL,originalURL)    }    useEffect( ()=>{        auth.onAuthStateChanged(authUser=>{            console.log('THE USER IS >>>',authUser)            if (authUser){                dispatch({                    type:"SET_USER",                    user: authUser                })            }else {                history.replace('/register')                dispatch({                    type:"SET_USER",                    user:null                })            }        })        //eslint-disable-next-line    },[])    return(        <div className="dashboard">            <AppBar login={false}/>            <div className="stats">                <div className="stat">                    <div className="total-clicks">                        <h2>0</h2>                        <h3>                            Total Clicks                        </h3>                    </div>                    <div className="create-form">                        <form onSubmit={createShortenURL}>                            <label htmlFor="#shortened-url" className="domain">bit.ly/</label>                            <input value={shortenedURL} onChange={e => setShortenedURL(e.target.value)} type="text" id="shortened-url" placeholder="BACKWARD URL"/>                            <textarea value={originalURL} onChange={e => setOriginalURL(e.target.value)} className="block url-input" placeholder="PASTE LONG URL"/>                            <button onClick={createShortenURL} className="create-button">CREATE</button>                            {message && <p>{message}</p>}                        </form>                    </div>                </div>            </div>        </div>    )}export default Dashboard;