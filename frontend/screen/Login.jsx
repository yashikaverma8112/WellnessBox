import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
export const Login = () => {
  const [credentials, setCredentials] = useState ({email:"",password:""})
  const navigate = useNavigate();
  const handleSubmit =async(e)=>{
      e.preventDefault();
      const response =  await fetch("http://localhost:5000/api/loginuser",{
          method : 'POST',
          headers:{
              'Content-Type' :'application/json'
          },
          body:JSON.stringify({email:credentials.email, password:credentials.password})
          
      });
     const json = await response.json();
     console.log(json);
     if(!json.success){
       alert("Enter Valid Credentials");
       alert(json.msg);
      }
    else if(json.success){

      alert("User Login Successful")
      localStorage.setItem("userEmail",credentials.email);
      localStorage.setItem("authToken",json.authToken);
      navigate('/')
    }
}
const onChange=(e)=>{
  setCredentials({...credentials,[e.target.name]:e.target.value})
}
  return (
    <>
    <div>
      <Navbar />
    </div>
    <div className='bg-light d-flex flex-column text-white align-items-center justify-content-center min-vh-100'>
    
      <h5 className='text-center text-secondary fst-italic'>---Step into a Healthier You: Login to WellnessBox🏋️---</h5>
      <br></br>
         <div className="container bg-success p-4 rounded w-50 h-70 align-items-center justify-content-center">
        
        <form onSubmit={handleSubmit} className='mx-auto w-50'>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email'  value={credentials.email}  onChange={onChange}/>
     
      </div>
      <div className="mb-3">
        <label htmlFor='exampleInputPassword1' className="form-label">Password</label>
        <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password}  onChange={onChange}/>
      </div>

    
      <button type="submit" className="m-3 btn btn-primary">Login</button>
    
    <Link to='/createUser' className='m-3 btn btn-danger'>Not Have an Account</Link>
    
    </form>
    
    </div>
    </div>
    <div>
      <Footer />
    </div>
    </>
  )
}
