import { useState, useEffect, useContext } from "react";
import UserContext from "../UserContext";
import { Navigate, useNavigate } from "react-router-dom";
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Swal from "sweetalert2";
import { Button, Form, Container } from "react-bootstrap";


export default function Register(){

	const {user} = useContext(UserContext);
	const navigate = useNavigate();

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [mobileNo, setMobileNo] = useState("");
	const [password1, setPassword1] = useState("");
	const [password2, setPassword2] = useState("");

	function registerUser(e){

		e.preventDefault();

        fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                mobileNo: mobileNo,
                password: password1
            })
        })
        .then(res => res.json())
        .then(data => {


            if(data){

                setFirstName("");
                setLastName("");
                setMobileNo("");
                setEmail("");
                setPassword1("");
                setPassword2("");

                Swal.fire({
                    title: "Registration successful",
                    icon: "success",
                    text: "Welcome to Utak.io!"
                })
                navigate("/");
            }
            else{
                setEmail("");
                Swal.fire({
                    title: "Something went wrong",
                    icon: "error",
                    text: "Please try again."
                })
            }
        })	

	}

	const [isActive, setIsActive] = useState(false);

	useEffect(()=>{
		if((firstName !== "" && lastName !== "" && email !== "" && mobileNo.length === 11 && password1 !== "" && password2 !== "") && (password1 === password2)){
			setIsActive(true);
		}
		else{
			setIsActive(false);
		}
	},[firstName, lastName, email, mobileNo, password1, password2])


	return(
		(user.id !== null)
		?
			<Navigate to="/home" />
		:
		<>
			<Container  fluid className='col-lg-8 col-md-6'>
				<h1 className="mb-3 mt-4 text-center">Register</h1>		
				<Form onSubmit = {(e) => registerUser(e)} className='my-3 p-4 register-background'>

					<Form.Group className="mb-2" controlId="firstName">
					  <Form.Label>First Name</Form.Label>
					  <Form.Control type="text" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)}/>
					</Form.Group>

					<Form.Group className="mb-2" controlId="lastName">
					  <Form.Label>Last Name</Form.Label>
					  <Form.Control type="text" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)}/>
					</Form.Group>

					<Form.Group className="mb-2" controlId="mobileNo">
					  <Form.Label>Mobile Number</Form.Label>
					  <Form.Control type="number" placeholder="Mobile Number" value={mobileNo} onChange={e => setMobileNo(e.target.value)}/>
					</Form.Group>

				      <Form.Group className="mb-2" controlId="userEmail">
				        <Form.Label>Email address</Form.Label>
				        <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)}/>
				        <Form.Text className="text-muted">
				          We'll never share your email with anyone else.
				        </Form.Text>
				      </Form.Group>

				      <Form.Group className="mb-2" controlId="password1">
				        <Form.Label>Password</Form.Label>
				        <Form.Control type="password" placeholder="Password" value={password1} onChange={e => setPassword1(e.target.value)}/>
				      </Form.Group>

				      <Form.Group className="mb-1" controlId="password2">
				        <Form.Label>Verify Password</Form.Label>
				        <Form.Control type="password" placeholder="Verify Password" value={password2} onChange={e => setPassword2(e.target.value)}/>
				      </Form.Group>

		    	  <div className="d-grid gap-2 mt-4">
				  {
		    	  	isActive
		    	  	?
		    	  		<Button className="btn-dark btn-lg d-grid gap-2" type="submit" id="submitBtn">
		    	  		  Register
		    	  		</Button>
		    	  	:
		    	  		<Button className="btn-dark btn-lg" type="submit" id="submitBtn" disabled>
		    	  		  Register
		    	  		</Button>
		    	  }
				  <p className="d-flex align-items-center justify-content-center mt-1">Already have an account? <Nav.Link as={Link} to='/login' className='d-inline-block text-success px-1'>Click here </Nav.Link>to log in.</p>

				  </div>
		    	</Form>
			</Container>
		</>
	)
}