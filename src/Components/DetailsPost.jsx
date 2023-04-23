import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client';
import { Link } from 'react-router-dom'
import delete_icon from '../assets/delete_icon.png'

const DetailsPost = () => {
    const {id} = useParams();

    const [thisPost, setThisPost] = useState(
        {
            created_at: "",
            title: "",
            content: "",
            image_url: "",
            upvotes: 0,
            secret_key: "",
            comments: []

        }
    );
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const {data} = await supabase
            .from('Forum-Posts')
            .select()
            .order('created_at', {ascending: false})

            setThisPost(data.filter(item => item.id == id)[0]);
        }

        fetchData();
    }, []);

    const upvotePost = async (event) => {
        event.preventDefault();

        await supabase
        .from('Forum-Posts')
        .update({ upvotes: thisPost.upvotes+1})
        .eq('id', id);

        const {data} = await supabase
        .from('Forum-Posts')
        .select()
        .order('created_at', {ascending: false})

        setThisPost(data.filter(item => item.id == id)[0]);

    }

    const deletePost = async (event) => {
        event.preventDefault();

        const secretPrompt = prompt("Enter the secret key of this post to delete it: ");

        if (secretPrompt != thisPost.secret_key) {
            alert("Incorrect secret key!")
        } else {

            await supabase
            .from('Forum-Posts')
            .delete()
            .eq('id', id);

            alert("Successfully deleted!");
            window.location = "/";
        }

    }

    const addComment = async () => {
        // console.log(newComment);
        
        await supabase
        .from('Forum-Posts')
        .update({comments: [ ...thisPost.comments, newComment]})
        .eq('id', id);

        const {data} = await supabase
        .from('Forum-Posts')
        .select()
        .order('created_at', {ascending: false})

        setThisPost(data.filter(item => item.id == id)[0]);
    }

    const deleteComment = async (comment) => {

        await supabase
        .from('Forum-Posts')
        .update({ comments: thisPost.comments.filter(item => item != comment)})
        .eq('id', id);

        const {data} = await supabase
        .from('Forum-Posts')
        .select()
        .order('created_at', {ascending: false})

        setThisPost(data.filter(item => item.id == id)[0]);
    }

    return(
        <div className="main-page">
            <div className="card-container">
                <div className="card mb-4">
                    <div className="card-header">Posted on {thisPost.created_at.slice(0, 10) + " " + thisPost.created_at.slice(11,16) + " UTC"} </div>
                    <div className="card-body">                
                        <h4>{thisPost.title}</h4>                    
                    </div>
                    <hr className="border border-1 m-0 opacity-50"></hr>
                    <div className="card-body">                
                        <p className="fw-normal">{thisPost.content}</p> 
                        { thisPost.image_url && thisPost.image_url.length > 0 ? 
                        <img className="img-content img-thumbnail" src={thisPost.image_url}></img> : null}                   
                    </div>
                    <div className="card-text fs-30 card-lower">
                        <div className="card-lower-sub">
                            <img alt="upvote post button" src="/src/assets/upvote_icon.png" className="icon" onClick={upvotePost}></img>
                            &nbsp;&nbsp;{thisPost.upvotes} Upvotes
                        </div>
                        <div className="card-lower-sub">
                            <Link to={"/edit/" + id}> 
                                <img alt="edit post button" src="/src/assets/edit_icon.png" className="icon"></img>
                            </Link>
                            &nbsp;&nbsp;
                            <img alt="delete post button" src="/src/assets/delete_icon.png" className="icon" onClick={deletePost}></img>
                        </div>                    
                    </div>

                    <div className="comments-cont">
                    {
                        thisPost.comments.length > 0 ?  
                            thisPost.comments.map((comment, index) => 
                                // <Comment postID={thisPost.id} content={comment} key={index}/>
                                <div className="card-text comment-box" key={index}>
                                    - {comment}
                                    <img alt="delete comment button" src={delete_icon} className="icon" onClick={() => deleteComment(comment)}></img>
                                </div>
                            )                
                        : 
                        <div className="card-text">
                            No comments for this post.
                        </div>
                    }     
                    </div>
                    <div className="comments-row">
                        <input className="form-control m-2" placeholder="Leave a comment" aria-label="Comment" onChange={(e) => setNewComment(e.target.value)}></input>
                        <button className="edit-btn" type="submit" onClick={addComment}>Submit</button>
                    </div>
                </div>
            </div>        
        </div>
    )
}

export default DetailsPost