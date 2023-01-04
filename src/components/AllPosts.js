import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPost } from '../api';

export const deletePost = async (props) => {
    const token = props.token;
    const postId = props.post._id;
    const posts = props.posts;
    const setPosts = props.setPosts;
    const response = await fetch(`https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/posts/${postId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    const data = await response.json();
    if (data) {
        const newPosts = posts.filter(post => post._id !== postId);
        setPosts(newPosts)
    }
}

const Posts = (props) => {
    const posts = props.posts
    const isLoggedIn = props.isLoggedIn;
    const token = props.token;
    const setPosts = props.setPosts
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const [willDeliver, setWillDeliver] = useState(false);
    const [searchPhrase, setSearchPhrase] = useState('');
    let postSearchFilter = posts.filter(post =>
        post.title.toLowerCase().includes(searchPhrase.toLowerCase()) ||
        post.description.toLowerCase().includes(searchPhrase.toLowerCase()) ||
        post.author.username.toLowerCase().includes(searchPhrase.toLowerCase()) ||
        post.location.toLowerCase().includes(searchPhrase.toLowerCase())
    );
    return (
        <div>
            <h2>Posts</h2>
            <div id='search-posts'>
                <h3>Search Posts</h3>
                <input value={searchPhrase} onChange={ev => setSearchPhrase(ev.target.value)} />
            </div>
            {isLoggedIn ?
                <div id='create-post'>
                    <h3>Create a Post</h3>
                    <form id='post-form' onSubmit={() => createPost({ token, title, description, price, willDeliver })}>
                        <input placeholder='Title' value={title} onChange={ev => setTitle(ev.target.value)} />
                        <input placeholder='Description' value={description} onChange={ev => setDescription(ev.target.value)} />
                        <input placeholder='Price' value={price} onChange={ev => setPrice(ev.target.value)} />
                        <input placeholder='Location' value={location} onChange={ev => setLocation(ev.target.value)} />
                        Will Deliver? <input type="checkbox" id="myCheck1" value={willDeliver} onChange={() => setWillDeliver(!willDeliver)} />
                        <button>Submit Post</button>
                    </form>
                </div> :
                null
            }
            <ul>
                {
                    postSearchFilter.map(post => {
                        return (
                            <li key={post._id} className={post.isAuthor ? 'singlePost myPost' : 'singlePost'}>
                                <Link to={`/posts/${post._id}`}>{post.title}</Link>
                                <ul>
                                    <li>
                                        Price: {post.price}
                                    </li>
                                    <li>
                                        Location: {post.location}
                                    </li>
                                    <li>
                                        Posted by {post.author.username}
                                    </li>
                                    {post.isAuthor ? <button onClick={() => deletePost({ setPosts, posts, post, token })}>Delete</button> : null}
                                </ul>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    );
}

export default Posts;