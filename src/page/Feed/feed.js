import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import { database } from '../../firebase'
import UploadFile from '../../Components/UploadFile/UploadFile'
import Post from '../../Components/Post/Post'
import Navbar from '../../Components/Navbar/Navbar'

function Feed() {
  const { user } = useContext(AuthContext)
  const [userData, setUserData] = useState('')
  useEffect(() => {
    const unsub = database.users.doc(user.uid).onSnapshot((snapshot) => {
      setUserData(snapshot.data())
    })
    return () => { unsub() }
  }, [user])
  return (
    <>
      <Navbar userData={userData} />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        {/* <div className="comp" style={{width:'50%'}}>
                <h1>Welcome to feed</h1>
                <button onClick={logout}>Log out</button>
            </div> */}
        <UploadFile user={userData} />
        <Post userData={userData} />
      </div>
    </>
  )
}

export default Feed