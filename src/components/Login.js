import React , {useEffect, useState}from "react";
import {useHistory} from 'react-router-dom';
import axios from 'axios';


const Login = () => {

  const [values, setValues] = useState({
    username:'',
    password: '',

  })


  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [error, setError] = useState('')
  ;
  //replace with error state

  const {push} = useHistory();

  const handleChange = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.values
    })
  }

  const handleSubmit = e => {

    e.preventDefault()
    axios.post('http://localhost:5000/api/login', values)
    .then(res => {
      localStorage.setItem('token', res.data.payload)
      push('/bubbles')
    })
    .catch(err => setError('Username or Password not valid'))

  }
  
  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <div data-testid="loginForm" className="login-form">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="username"
            value={values.username}
            onChange={handleChange}
            data-testid="username"
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            value={values.password}
            onChange={handleChange}
            data-testid="password"
          />
          <button>Log In</button>
        </form>
      </div>

      <p data-testid="errorMessage" className="error">{error}</p>
    </div>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state necessary for form functioning.
//4. If either the username or password is not entered, display the following words with the p tag provided: Username or Password not valid.
//5. If the username / password is equal to "Lambda" / "School", save that token to localStorage and redirect to a BubblePage route.
//6. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE id="username" and id="password"
//7. MAKE SURE YOUR SUBMIT BUTTON INCLUDES id="submit"
//8. MAKE SURE YOUR ERROR p tag contains the id="error"