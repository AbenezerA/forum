import { React, useState } from 'react';
import { supabase } from '../client.js';

const CreatePost = () => {
    const [newPost, setNewPost] = useState(
        {
            title: "",
            content: "",
            image_url: "",
            upvotes: 0,
            secret_key: "",
            comments: []
        }
    )

    const createPost = async (event) => {
        event.preventDefault();

        console.log("newPost: ", newPost);

        await supabase
        .from('Forum-Posts')
        .insert({title: newPost.title, content: newPost.content, image_url: newPost.image_url, upvotes: newPost.upvotes, secret_key: newPost.secret_key, comments: newPost.comments})
        .select();

        window.location = "/";
    }

    return(
        <div className="main-page">
            <h1 className="mb-4">Create a new Post</h1>
            <form className="create-form">
                <div className="mb-3 form-div">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input className="form-control form-control-create" type="text" id="title" name="title" onChange={(event) => setNewPost({title: event.target.value, content: newPost.content, image_url: newPost.image_url, upvotes: newPost.upvotes, secret_key: newPost.secret_key, comments: newPost.comments})} />
                </div>

                <div className="mb-3 form-div">
                    <label htmlFor="content" className="form-label">Content</label>
                    <textarea className="form-control form-control-create" rows="5" cols="50" id="content" onChange={(event) => setNewPost({title: newPost.title, content: event.target.value, image_url: newPost.image_url, upvotes: newPost.upvotes, secret_key: newPost.secret_key, comments: newPost.comments})} />
                </div>

                <div className="mb-3 form-div">
                    <label htmlFor="image_url" className="form-label">Image URL</label>
                    <input className="form-control form-control-create" type="text" id="image_url" name="image_url" onChange={(event) => setNewPost({title: newPost.title, content: newPost.content, image_url: event.target.value, upvotes: newPost.upvotes, secret_key: newPost.secret_key, comments: newPost.comments})} />
                </div>

                <div className="mb-3 form-div">
                    <label htmlFor="secret_key" className="form-label">Secret Key (for editing privileges) </label>
                    <input className="form-control form-control-create" type="text" id="secret_key" name="secret_key" onChange={(event) => setNewPost({title: newPost.title, content: newPost.content, image_url: newPost.image_url, upvotes: newPost.upvotes, secret_key: event.target.value, comments: newPost.comments})} />
                </div>

                <input className="edit-btn" type="submit" value="Create Post" onClick={createPost} />
            </form>
        </div>
    )
}

export default CreatePost;