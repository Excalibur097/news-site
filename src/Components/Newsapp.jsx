import { useState, useEffect } from "react";
import Cards from "./Cards";

const Newsapp = ()=>{
  const API_KEY = "1b8414cec999433e9407766604a329e3";
  const [isOpen, setIsopen] = useState(false);
  const [newsData, setNewsdata] = useState(null);
  const [searchTerm, setSearchterm] = useState('nigeria');
  const [submitTogle, setSubmittoggle] = useState(0);
  const [dataLoading, setDataloading] = useState(true);
  
  useEffect(() =>{
    fetch(`http://newsapi.org/v2/everything?q=${searchTerm}&apikey=${API_KEY}`)
      .then(res =>{
        if(!res.ok){
          throw Error('Could not fetch the data');
        }
        return res.json();
      })
      .then(data =>{
        setNewsdata(data['articles']);
        setDataloading(false);
      }).catch(err =>{
        setDataloading(true);
      })

  }, [submitTogle])

  const handleSearch = (e)=>{
    e.preventDefault();
    setSubmittoggle(submitTogle +1)
  }

  const userInput = (event)=>{
    setSearchterm(event.target.value);
    console.log(event.target.value);
    setSubmittoggle(submitTogle +1);
  }

  return(
    <div>
      <nav>
        <div>
          <h1>Daily News</h1>
        </div>
        <ul>
          <a href="">All News</a>
          <a href="">Trending</a>
        </ul>
        <form className={`search-bar ${isOpen && 'open'}`} onSubmit={handleSearch}>
          <input type="text" placeholder="Search News" onChange={(e) => setSearchterm(e.target.value)} />
          <button type="submit">Search</button>
        </form>
        <div className="toggle" onClick={()=> setIsopen(!isOpen)}>
          <img src="hbg.svg" alt="" />
        </div>
      </nav>

      <div className="category-btn">
        <button onClick={userInput} value='sports'>Sports</button>
        <button onClick={userInput} value='politics'>Politics</button>
        <button onClick={userInput} value='entertainment'>Entertainment</button>
        <button onClick={userInput} value='health'>Health</button>
        <button onClick={userInput} value='fitness'>Fitness</button>
      </div>

      <div className="check-loading">
        {
          dataLoading &&
          <p>Loading news...</p>
        }
      </div>
      <div>
        {
          newsData &&
          <Cards data = {newsData}/>
        }
      </div>
    </div>
  )
}

export default Newsapp;