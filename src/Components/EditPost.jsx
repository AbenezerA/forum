import { React, useState, useEffect } from 'react';
import { supabase } from '../client.js';
import { useParams } from 'react-router-dom';

const EditPost = () => {
    const {id} = useParams();

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
    const [secretKeyInput, setSecretKeyInput] = useState("");

    const [oldPost, setOldPost] = useState(
        {
            title: "",
            content: "",
            image_url: ""
        }
    )

    useEffect(() => {
        const fetchData = async () => {
            const {data} = await supabase
            .from('Forum-Posts')
            .select()
            .order('created_at', {ascending: false})

            setOldPost(data.filter(item => item.id == id)[0]);
            setNewPost(data.filter(item => item.id == id)[0]);
        }

        fetchData();
    }, []);

    const editPost = async (event) => {
        event.preventDefault();

        console.log("newPost: ", newPost);

        if (secretKeyInput != oldPost.secret_key) {
            alert("Incorrect secret key!")
        } else {
            await supabase
            .from('Forum-Posts')
            .update({title: newPost.title, content: newPost.content, image_url: newPost.image_url})
            .eq('id', id);

            const {data} = await supabase
            .from('Forum-Posts')
            .select()
            .order('created_at', {ascending: false})

            setOldPost(data.filter(item => item.id == id)[0]);

            window.location = "/post/" + id;
        }

    }

    return(
        <div className="main-page">
            <h1 className="mb-4">Edit Post</h1>
            <form className="create-form">
                <div className="mb-3 form-div">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input className="form-control form-control-create" type="text" id="title" name="title" defaultValue={oldPost.title} onChange={(event) => setNewPost({title: event.target.value, content: newPost.content, image_url: newPost.image_url})} />
                </div>

                <div className="mb-3 form-div">
                    <label htmlFor="content" className="form-label">Content</label>
                    <textarea className="form-control form-control-create" rows="5" cols="50" id="content" defaultValue={oldPost.content} onChange={(event) => setNewPost({title: newPost.title, content: event.target.value, image_url: newPost.image_url})} />
                </div>

                <div className="mb-3 form-div">
                    <label htmlFor="image_url" className="form-label">Image URL</label>
                    <input className="form-control form-control-create" type="text" id="image_url" name="image_url" defaultValue={oldPost.image_url} onChange={(event) => setNewPost({title: newPost.title, content: newPost.content, image_url: event.target.value})} />
                </div>

                <div className="mb-3 form-div">
                    <label htmlFor="secret_key" className="form-label">Enter the secret key associated with this post</label>
                    <input className="form-control form-control-create" type="text" id="secret_key" name="secret_key" onChange={(event) => setSecretKeyInput(event.target.value)} />
                </div>

                <input className="edit-btn" type="submit" value="Edit Post" onClick={editPost} />
            </form>
        </div>
    )
}

export default EditPost;