import { useEffect, useState, useContext } from 'react';
import UserContext from '../UserContext';
import {  Nav, Button, Container, Form } from 'react-bootstrap';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Login(){

    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isActive, setIsActive] = useState(false);



    function login(e){

        e.preventDefault();

        fetch(`${process.env.REACT_APP_API_URL}/users/checkEmail`, {
			method: "POST",
			headers:{
				"Content-Type":"application/json"
			},
			body: JSON.stringify({
				email: email
			})
		})
		.then(res => res.json())
		.then(data => {

			if(data === false){
                setEmail("");
				Swal.fire({
					title: "Email doesn't exist.",
					icon: "error",
					text: "Kindly register first"
				})
			}
			else{
				fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                })
                .then(res => res.json())
                .then(data => {
                    if(typeof data.access !== "undefined"){
        
                    localStorage.setItem("token", data.access);
                    retrieveUserDetails (data.access);
        
                    Swal.fire({
                        title: 'Login Successful',
                        icon: 'success',
                        text: 'Welcome back!'
                        });
                    }
        
                    else{
                        setPassword("");
                        Swal.fire({
                            title: 'Login failed',
                            icon: 'error',
                            text: 'Your password is incorrect.'
                            });
                    }
                })
            }
        })
    }


    const retrieveUserDetails = (token) => {

        fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {


            setUser({
                id: data._id,
                isAdmin: data.isAdmin
            })
        })
        
    }


    useEffect(() => {
        if(email !== "" && password !== ""){
            setIsActive(true);
        }

        else{
            setIsActive(false);
        }
    }, [email, password])


    return(

        (user.id !== null)
        ?

            <Navigate to="/" />
        :
        <>
            <h1 className="mb-3 mt-4 text-center">Login</h1>
            <Container fluid className='col-lg-5 col-md-5 mb-0 mt-3 p-4 register-background'>
                <Form onSubmit = {(e) => login(e)} className="my-2">
                    <Form.Group className="mb-2" controlId="email">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                    </Form.Group>

                    <div className='d-grid gap-2 secondary'>
                    {
                        isActive
                        ?
                        <Button variant='dark' type="submit" id="loginBtn" size='lg'>
                        Log in
                        </Button>
                        :
                        <Button variant='dark' type="submit" id="loginBtn" size='lg' disabled>
                        Log in
                        </Button>
                    }



                    </div>
                </Form>
            </Container>

            <div className='mb-3'>
                <p className="d-flex align-items-center justify-content-center">Don't have an account yet? <Nav.Link as={Link} to='/register' className='d-inline-block text-success px-1'>Click here </Nav.Link>to register.</p>
            </div>
        </>
    )
};