import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
const Signup = () => {
    const [credentials, setCredentials] = useState ({name:"",email:"",password:"",geolocation:""})
    const handleSubmit =async(e)=>{
        e.preventDefault();
        const response =  await fetch("http://localhost:5000/api/createUser",{
            method : 'POST',
            headers:{
                'Content-Type' :'application/json'
            },
            body:JSON.stringify({name:credentials.name, email:credentials.email, password:credentials.password, location:credentials.geolocation})
            
        });
       const json = await response.json();
       console.log(json);
       if(!json.success){
         alert(json.msg);

        }
        else{
          alert("User Added Successful")

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
    <div className='container-fluid bg-light d-flex flex-column text-white align-items-center justify-content-center vh-100 fs-5' style={{ marginTop: '70px' }}>
    <h5 className='text-center fst-italic text-secondary'>---Empower Your Life: Sign Up for a Healthier Tomorrow💪--- </h5>
    <br></br>
    <div className="container  bg-success  p-4 rounded w-50  align-items-center justify-content-center">
    <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor='name' className="form-label">Name</label>
    <input type="text" className="form-control"  name='name' value={credentials.name} onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email'  value={credentials.email}  onChange={onChange}/>
    <div id="emailHelp" className="form-text text-white">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor='exampleInputPassword1' className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password}  onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="address" className="form-label">Address</label>
    <input type="text" className="form-control" name='geolocation' value={credentials.geolocation} onChange={onChange}/>
  </div>

  <button type="submit" className="m-3 btn btn-primary">SignUp</button>
<Link to='/login' className='m-3 btn btn-danger'>Already Have an Account</Link>
</form>

</div>
    </div>
<Footer />
    
      </>
  )
}

export default Signup