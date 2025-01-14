import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { database } from '../../firebase'
import { CircularProgress } from '@mui/material';
import Navbar from '../../Components/Navbar/Navbar'
import Typography from '@mui/material/Typography';
// import Avatar from '@mui/material/Avatar';
// import Like from './like'
// import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';
import Like2 from '../../Components/like2/Like2';
import AddComment from '../../Components/AddComment/AddComment';
import Comments from '../../Components/Comments/Comments'
import './Profile.css'

function Profile() {
    const { id } = useParams()
    const [userData, setUserdata] = useState(null)
    const [posts, setPosts] = useState(null)
    const [open, setOpen] = useState(null);

    const handleClickOpen = (id) => {
        setOpen(id);
    };

    const handleClose = () => {
        setOpen(null);
    };
    useEffect(() => {
        database.users.doc(id).onSnapshot((snap) => {
            setUserdata(snap.data())
        })
    }, [id])

    const handleClick = (e) => {
        e.preventDefault();
        e.target.muted = !e.target.muted
    }

    useEffect(() => {
        let parr = []
        const unsub = database.posts.orderBy('createdAt', 'desc').onSnapshot((querySnapshot) => {
            parr = []
            querySnapshot.forEach((doc) => {
                let data = { ...doc.data(), postId: doc.id }
                if (data.userId === id) {
                    parr.push(data)
                }

            })
            setPosts(parr)
        })
        return unsub
    },)

    // useEffect(()=>{
    //     if(userData!=null){
    //         async function fData(){
    //             let parr = [];
    //             for(let i=0;i<userData?.postIds?.length;i++){
    //                 let postData = await database.posts.doc(userData.postIds[i]).get()
    //                 parr.push({...postData.data(),postId:postData.id})
    //             } 
    //             setPosts(parr)
    //         }
    //         fData();
    //     }
    // },[userData])

    return (
        <>
            {
                posts == null || userData == null ? <CircularProgress /> :
                    <>
                        <Navbar userData={userData} />
                        <div className="spacer"></div>
                        <div className="container">
                            <div className="upper-part">
                                <div className="profile-img">
                                    <img alt='' src={userData.profileUrl} />
                                </div>
                                <div className="info">
                                    <Typography variant="h5">
                                        Email : {userData.email}
                                    </Typography>
                                    <Typography variant="h6">
                                        Posts : {userData?.postIds?.length > 0 ? userData?.postIds?.length : 0}
                                    </Typography>
                                </div>
                            </div>
                            <hr style={{ marginTop: '2rem', marginBottom: '2rem' }} />
                            <div className="profile-videos">
                                {
                                    posts.map((post, index) => (
                                        <React.Fragment key={index}>
                                            <div className="videos">
                                                <video muted="muted" onClick={() => handleClickOpen(post.pId)}>
                                                    <source src={post.pUrl} />
                                                </video>
                                                <Dialog
                                                    open={open === post.pId}
                                                    onClose={handleClose}
                                                    aria-labelledby="alert-dialog-title"
                                                    aria-describedby="alert-dialog-description"
                                                    fullWidth={true}
                                                    maxWidth='md'
                                                >
                                                    <div className="modal-container">
                                                        <div className="video-modal">
                                                            <video autoPlay={true} muted="muted" onClick={handleClick} controls>
                                                                <source src={post.pUrl} />
                                                            </video>
                                                        </div>
                                                        <div className="comment-modal">
                                                            <Card className="card1" style={{ padding: '1rem', overflow: 'scroll', scrollbarWidth: 'none' }}>
                                                                <Comments postData={post} />
                                                            </Card>
                                                            <Card variant="outlined" className="card2">
                                                                <Typography style={{ padding: '0.4rem' }}>{post.likes.length === 0 ? 'Liked by nobody' : `Liked by ${post.likes.length} users`}</Typography>
                                                                <div style={{ display: 'flex' }}>
                                                                    <Like2 postData={post} userData={userData} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
                                                                    <AddComment style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} userData={userData} postData={post} />
                                                                </div>
                                                            </Card>
                                                        </div>
                                                    </div>
                                                </Dialog>
                                            </div>
                                        </React.Fragment>
                                    ))
                                }
                            </div>
                        </div>
                    </>
            }
        </>
    )
}

export default Profile