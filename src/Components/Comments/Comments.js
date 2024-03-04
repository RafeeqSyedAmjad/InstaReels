import React, { useState, useEffect } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar';
import { database } from '../../firebase'

function Comments({ postData }) {
    const [comments, setComments] = useState(null)
    useEffect(() => {
        async function fetchData() {
            let arr = []
            for (let i = 0; i < postData.comments.length; i++) {
                let data = await database.comments.doc(postData.comments[i]).get()
                arr.push(data.data())
            }
            setComments(arr)
        }
        fetchData();
    }, [postData])
    return (
        <div>
            {
                comments == null ? <CircularProgress /> :
                    <>
                        {
                            comments.map((comment, index) => (
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Avatar src={comment.uProfileImage} />
                                    <p>&nbsp;&nbsp;<span style={{ fontWeight: 'bold' }}>{comment.uName}</span>&nbsp;&nbsp; {comment.text}</p>
                                </div>
                            ))
                        }
                    </>
            }
        </div>
    )
}

export default Comments