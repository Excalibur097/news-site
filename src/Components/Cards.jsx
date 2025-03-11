import { useState } from "react";

const Cards = (props)=>{
  const data =Array.from(props.data);
  const [currentPage, setCurrentpage] = useState(1);
  const [itemsPerpage, setItemsperpage] = useState(20);
  const lastItemIndex = currentPage * itemsPerpage;
  const firstItemIndex = lastItemIndex - itemsPerpage;
  const thisPageItems = data.slice(firstItemIndex, lastItemIndex);

  const pages = [];
  for(let i=1; i < data.length/itemsPerpage; i++){
    pages.push(i);
  }
  const readMore = (url)=>{
    window.open(url)
    console.log(url)
  }



  return(
    <div className="card-container">
      { data &&
        thisPageItems.map((curItem, index)=>{
          if(curItem.title != '[Removed]'){
            return(
              <div className="card">
                <img src={curItem.urlToImage} alt="" />
                <div className="card-content">
                  <a onClick={()=> readMore(curItem.url)}>{curItem.title}</a>
                  <p>{curItem.description}</p>
                  <button onClick={()=>readMore(curItem.url)}>Read more</button>
                </div>
              </div>
            )
          }
         
        })
      }

      <div className="page-buttons">
        {
          pages.map((page, index)=>{
            return(
              <button onClick={()=>setCurrentpage(page)} key={index}>
                {page}
              </button>
            )
          })
        }
      </div>
    </div>
  )
}

export default Cards;