import * as React from 'react';
import { useContext, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './Login.css';
import Instagram from '../Assets/ENREEL.png'
import { createUseStyles } from 'react-jss';
import Alert from '@mui/material/Alert';
// import { border } from '@mui/system';
import TextField from '@mui/material/TextField';
// import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Link, useNavigate } from 'react-router-dom';
// import { ClassNames } from '@emotion/react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import bg from '../Assets/insta.png'
import img1 from '../Assets/img1.jpg';
import img2 from '../Assets/img2.jpg';
import img3 from '../Assets/img3.jpg';
import img5 from '../Assets/img5.jpg';
import { AuthContext } from '../Context/AuthContext';

export default function Login() {
    // const store = useContext(AuthContext)
    // console.log(store)
    const useStyles = createUseStyles({
        text1: {
            color: 'grey',
            textAlign: 'center'
        },
        text2: {
            textAlign: 'center'
        },
        card2: {
            height: '6vh',
            marginTop: '2%'
        }
    });
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleClick = async () => {
        try {
            setError('');
            setLoading(true)
            let res = await login(email, password);
            console.log(res)
            setLoading(false);
            navigate("/", { replace: true })
        } catch (err) {
            setError(err.message);
            setTimeout(() => {
                setError('')
            }, 2000);
            setLoading(false);
        }
    }

    return (
        <div className="loginWrapper">
            <div className="imgcar" style={{ backgroundImage: 'url(' + bg + ')', backgroundSize: 'cover' }}>
                <div className="carousel-wrapper">
                    <Carousel autoPlay infiniteLoop showArrows={false} showIndicators={false} showStatus={false} showThumbs={false}>
                        <div>
                            <img src={img1} alt="" />
                        </div>
                        <div>
                            <img src={img2} alt="" />
                        </div>
                        <div>
                            <img src={img3} alt="" />
                        </div>
                        <div>
                            <img src={img5} alt="" />
                        </div>
                    </Carousel>
                </div>
            </div>
            <div className="loginCard">
                <Card variant="outlined">
                    <div className="insta-logo">
                        <img src={Instagram} alt="" />
                    </div>
                    <CardContent>
                        {error !== '' && <Alert severity="error">{error}</Alert>}
                        <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin="dense" size="small" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth={true} margin="dense" size="small" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </CardContent>
                    <CardActions>
                        <Button color="primary" fullWidth={true} variant="contained" onClick={handleClick} disabled={loading}>
                            Log in
                        </Button>
                    </CardActions>
                </Card>
                <Card variant="outlined" className={classes.card2}>
                    <CardContent>
                        <Typography className={classes.text1} variant="subtitle1">
                            Don't have an account ? <Link to="/signup" style={{ textDecoration: 'none' }}>Signup</Link>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}