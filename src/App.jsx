import './App.css'
import { React, useState, useEffect } from 'react';
import { supabase } from './client';
import Card from "./Components/Card";

function App() {
  const [posts, setPosts] = useState(null);
  const [filteredPosts, setFilteredPosts] = useState(null);
  const [order, setOrder] = useState("created_at");
  const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        const fetchData = async () => {
          // console.log("order: ", order);
            const {data} = await supabase
            .from('Forum-Posts')
            .select()
            .order(order, {ascending: false})

            setPosts(data);
        }

        fetchData();
    }, [order]);

    const searchItems = (searchValue) => {
      setSearchInput(searchValue);
      console.log("search val: " + searchValue);
      console.log(posts);

      const filteredData = posts.filter((item) => 
        item.title.toLowerCase().includes(searchValue.toLowerCase())
      )

      setFilteredPosts(filteredData);     
    };

    return(
      <div className="App main-page">
          <div className="filter-row">
            <div className="order-btns-cont">
              Order by:
              <button className="order-btn" type="submit" onClick={() => setOrder("created_at")}>Newest</button>
              <button className="order-btn" type="submit" onClick={() => setOrder("upvotes")}>Popular</button>
            </div>
            <form className="search-form d-flex" role="search">
              <input className="form-control search-bar m-2" type="search" placeholder="Search for post" aria-label="Search" onChange={(e) => searchItems(e.target.value)}></input>
              {/* <button className="btn btn-outline-success" type="submit">Search</button> */}
            </form>
          </div>
          <div className="card-container w-100">
          {
            posts && posts.length > 0 ?
              searchInput.length > 0 ? 
                filteredPosts.map((posts,index) => 
                  <Card id={posts.id} created_at={posts.created_at} title={posts.title} content={posts.content} image_url={posts.image_url} upvotes={posts.upvotes} key={index}/>
                ) 
              : 
                posts.map((posts,index) => 
                  <Card id={posts.id} created_at={posts.created_at} title={posts.title} content={posts.content} image_url={posts.image_url} upvotes={posts.upvotes} key={index}/>
                ) 
            : 
            <div className="loading-cont">
              {/* <img className="loading-icon icon" src="/src/assets/loading_gif.gif"></img>  */}
              <h3 className="fw-bold">No posts yet. Click "Create New Post" to start the conversation!</h3>
            </div>
          } 
          </div>
          
      </div>
    )
}

export default App
