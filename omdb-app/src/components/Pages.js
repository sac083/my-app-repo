import React from 'react'

function Pages({totalPosts, postsPerPage,setcurrentPage}) { let pageNumbers = [];
    for (let i = 1; i <=Math.ceil(totalPosts/postsPerPage); i++) {
      pageNumbers.push(i)
      
    }
    return (
      <div className='pagination'>
        {
          pageNumbers.map((page, index)=>{
            return <button className='pagination-buttons' key={index} onClick={()=>{setcurrentPage(page)}} >{page}</button>
          })
        }
      </div>
    )
}

export default Pages