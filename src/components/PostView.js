import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import sendMessage from './Messages';
import { deletePost } from './AllPosts';



const Post = (props) => {
    const setPosts = props.setPosts
    const token = props.token;
    const posts = props.posts;
    const id = useParams().id;
    const post = posts.find(post => post._id === id);
    const [messageText, setMessageText] = useState('');
    const isLoggedIn = props.isLoggedIn;
    const [changePost, setChangePost] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const [willDeliver, setWillDeliver] = useState(false);

    const editPost = async (props) => {
        const postId = props.post._id;
        console.log(postId)
        await fetch(`http://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/posts/${postId}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                post: {
                    title,
                    description,
                    price,
                    willDeliver,
                    location
                },
            })
        }).then(response => response.json())
            .then(result => {
                window.location.reload();
            })
            .catch(console.error);
    }

    if (!post) {
        return null;
    }
    return (
        <div>
            <div id='post-view-box'>
                <h3><Link to='/posts'>{post.title}</Link></h3>
                <p>
                    {post.description}
                </p>
                <p>
                    Price: {post.price}
                </p>
                <p>
                    Location: {post.location}
                </p>
                <p>
                    Will Deliver: {post.willDeliver ? 'Yes' : 'No'}
                </p>
                <div>
                    {post.isAuthor ? <button onClick={() => {
                        setChangePost(!changePost);
                    }}>Edit</button> : null}
                    {post.isAuthor ? <button onClick={() => deletePost({ setPosts, posts, post, token })}>Delete</button> : null}
                </div>
                {!post.isAuthor && isLoggedIn ?
                    <form>
                        <input placeholder='Write your message here' value={messageText} onChange={ev => setMessageText(ev.target.value)} />
                        <button onClick={() => {
                            sendMessage({ token, posts, post, messageText })
                            setMessageText('');
                        }}>Send Message</button>
                    </form> : null}
            </div>
            <section>
                <h3>Messages:</h3>
                {
                    post.messages ? post.messages.map(message => (
                        <div key={message._id} className='message-box'>
                            <h3>From: {message.fromUser.username} <span className='message-box-time'>at {message.createdAt}</span></h3>
                            <p>{message.content}</p>
                        </div>
                    )) : null
                }
            </section>
            {changePost ?
                <>
                    <h3>Edit Post</h3>
                    <form id='post-form' onSubmit={() => editPost({ post })}>
                        <input placeholder='Title' value={title} onChange={ev => setTitle(ev.target.value)} />
                        <input placeholder='Description' value={description} onChange={ev => setDescription(ev.target.value)} />
                        <input placeholder='Price' value={price} onChange={ev => setPrice(ev.target.value)} />
                        <input placeholder='Location' value={location} onChange={ev => setLocation(ev.target.value)} />
                        Will Deliver? <input type="checkbox" id="myCheck1" value={willDeliver} onChange={() => setWillDeliver(!willDeliver)} />
                        <button>Apply Changes</button>
                    </form>
                </> : null}
        </div >
    );
}

export default Post;