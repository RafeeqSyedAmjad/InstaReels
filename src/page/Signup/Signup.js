import * as React from 'react';
import { useState, useContext } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './Signup.css';
import Instagram from '../../Assets/ENREEL.png'
import { createUseStyles } from 'react-jss';
// import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import { database, storage } from '../../firebase';
import toast from 'react-hot-toast';

export default function Signup() {
    const useStyles = createUseStyles({
        text1: {
            color: 'gray',
            textAlign: "center"
        },
        card2: {
            height: '6vh',
            marginTop: '2%'
        }
    });
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { signup } = useContext(AuthContext);

    const handleClick = async () => {
        if (file == null) {
            toast.error("Please upload profile image first");
            return;
        }
        try {
            setLoading(true);
            const userObj = await signup(email, password);
            const uid = userObj.user.uid;
            const uploadTask = storage.ref(`/users/${uid}/ProfileImage`).put(file);
            uploadTask.on('state_changed', fn1, fn2, fn3);
            function fn1(snapshot) {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload is ${progress} done.`);
            }
            function fn2(error) {
                setLoading(false);
                toast.error(error);
            }
            function fn3() {
                uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                    database.users.doc(uid).set({
                        email: email,
                        userId: uid,
                        fullname: name,
                        profileUrl: url,
                        createdAt: database.getTimeStamp()
                    }).then(() => {
                        setLoading(false);
                        toast.success('Successfully signed up!');
                        navigate("/", { replace: true });
                    }).catch((error) => {
                        setLoading(false);
                        toast.error(error.message);
                    });
                });
            }
        } catch (err) {
            setLoading(false);
            toast.error(err.message);
        }
    }

    return (
        <div className="signupWrapper">
            <div className="signupCard">
                <Card variant='outlined'>
                    <div className="insta-logo">
                        <img src={Instagram} alt="" />
                    </div>
                    <CardContent>
                        <Typography className={classes.text1} variant="subtitle1">
                            Sign up to see videos from your friends... GoodLuck!!
                        </Typography>
                        <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin="dense" size="small" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth={true} margin="dense" size="small" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <TextField id="outlined-basic" label="Full Name" variant="outlined" fullWidth={true} margin="dense" size="small" value={name} onChange={(e) => setName(e.target.value)} />
                        <Button color="secondary" fullWidth={true} variant="outlined" margin="dense" startIcon={<FileUploadIcon />} component="label">
                            Upload Profile Image
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={(e) => {
                                    setFile(e.target.files[0]);
                                    toast.success('Image uploaded successfully');
                                }}
                            />
                        </Button>
                    </CardContent>
                    <CardActions>
                        <Button color="primary" fullWidth={true} variant="contained" disabled={loading} onClick={handleClick}>
                            Sign up
                        </Button>
                    </CardActions>
                    <CardContent>
                        <Typography className={classes.text1} variant="subtitle1">
                            By signing up, you agree to our Terms, Conditions and Cookies policy.
                        </Typography>
                    </CardContent>
                </Card>
                <Card variant="outlined" className={classes.card2}>
                    <CardContent>
                        <Typography className={classes.text1} variant="subtitle1">
                            Having an account ? <Link to="/login" style={{ textDecoration: 'none' }}>Login</Link>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
