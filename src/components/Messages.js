import React from 'react';

export const Messages = ({ user }) => {
    return (
        <div>
            <h2>Messages Received</h2>
            <ul>
                {
                    user.messages ? user.messages.filter(message => message.fromUser._id !== user._id).map(message => {
                        return (
                            <li key={message._id}>
                                {message.content}
                                <ul>
                                    <li>
                                        Message from post: "{message.post.title}"
                                    </li>
                                    <li>
                                        From user: {message.fromUser.username}
                                    </li>
                                </ul>
                            </li>
                        )
                    }) : null
                }
            </ul>
            <h2>Messages Sent</h2>
            <ul>
                {
                    user.messages ? user.messages.filter(message => message.fromUser._id === user._id).map(message => {
                        return (
                            <li key={message._id}>
                                {message.content}
                                <ul>
                                    <li>
                                        Message from post: "{message.post.title}"
                                    </li>
                                </ul>
                            </li>
                        )
                    }) : null
                }
            </ul>
        </div >
    )
}

const sendMessage = async (props) => {
    const post = props.post;
    const token = props.token;
    const messageText = props.messageText
    try {
        const response = await fetch(`https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/posts/${post._id}/messages`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                message: {
                    content: `${messageText}`
                },
            }),
        });
        const result = await response.json();
    } catch {
        (console.error);
    }
}

export default sendMessage;