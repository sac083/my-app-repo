import React, { useEffect, useState } from 'react'
import Pages from './Pages';

function Omdb(props) {
    const [data, setData] = useState([]);
    const [val, setVal] = useState("Movies");
    const [currentPage, setcurrentPage] = useState(1)
    const [postsPerPage, setpostsPerPage] = useState(5)

    useEffect(()=>{
        apiomdb();
    }, []);
    let apiomdb = (()=>{
        fetch(`https://www.omdbapi.com/?s=${val}&apikey=803fed57`)
        .then(data => data.json()).then((data)=>{
          setData(data.Search);
        });
    });

    function textField(event)
    {
      setVal(event.target.value)
    }

    function submitMethod()
    {
      apiomdb();
    }

  let lastPostIndex = currentPage*postsPerPage;
  let firstPostIndex = lastPostIndex-postsPerPage;
  let currentPosts = data.slice(firstPostIndex,lastPostIndex);

    let card1 = ()=>{ return (<div className='cardflex'>{currentPosts.map((element) =>
    {
      return (<div className='card-div' key={element.imdbID}>
        <h5>{element.Title}</h5><img className='imagu' src={element.Poster} alt="" />
        <b><p>Type: {element.Type}</p></b>
        <b><p>Year: {element.Year}</p></b>
      </div>)
    })}
    </div>
    )};

    <hr/>
   
  return (
   <div className='main-container'>
    <div className='nav-bar'>
<span><h1>OMDB</h1></span>
    <section className='input-section'>
      <input id='input1' type="text" placeholder='Movies'  onChange={textField}/>
    <button className='input-button' type='submit' onClick={submitMethod} ><b>Search</b></button>
    </section>
    </div>
    <div>{card1()}</div>
    <Pages totalPosts = {data.length} postsPerPage={postsPerPage} setcurrentPage={setcurrentPage} />
    </div>
  )
}

export default Omdb