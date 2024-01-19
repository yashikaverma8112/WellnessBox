import React, { useEffect, useState } from 'react'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { Card } from '../components/Card'
// import Carousel from '../components/Carousel'

export const Home = () => {
    const [search, setSearch] = useState('');
    const [cat,setCat] = useState([]);
    const [item,setItem] = useState([]);
    
    const loadData = async ()=>{
        let response = await fetch("http://localhost:5000/api/boxData",{
            method:"POST",
            headers:{
                'Content-Type' :'application/json'
            },
        });
        response = await response.json();
        setItem(response[0]);
        setCat(response[1]);
    }
    useEffect(()=>{
        loadData();
    },[])
    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div>
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit : "contain !important"}}>
                <div className="carousel-inner" id ="carousel">
                    <div className="carousel-caption" style={{zIndex:"10"}} >

                            <h2 className='text-dark'>Discover Your Essentials here !</h2><br></br>
                        <div className="d-flex justify-content-center mb-5">
                            <input className="form-control me-2 border border-success" type="search" placeholder="Search for item" aria-label="Search"  value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
                            {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
                        </div>
                    </div>
                    <div className="carousel-item active" >
                        <img src="https://source.unsplash.com/random/900×700/?store" className="d-block w-100 opacity-50" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900×700/?skincare" className="d-block w-100 opacity-50" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900×700/?snacks" className="d-block w-100 opacity-50" alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            </div>
            <div className='container'>
            {
                cat !=='' 
                ? cat.map((data)=>{
                        return (
                            <div className='row mb-3'>
                            <div key={data._id} className='fs-3 m-3 text-secondary'>{data.CategoryName}</div>
                            <hr/>

                            {
                            item !=="" ? item.filter((i)=>i.CategoryName===data.CategoryName && (i.name.toLowerCase().includes(search.toLocaleLowerCase())))
                            .map(filterItem =>{
                               
                                return(
                                    <div className='col-12 col-md-6 col-lg-3 m-3' key={filterItem._id}>
                                        <Card Box_items ={filterItem} options={filterItem.options[0]} >
                                       
                                        </Card></div>
                                )
                            })
                            :
                            
                            <div>No such data found</div>
                        }
                                </div>

                        )
                })
                : ""
            }
              
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}
