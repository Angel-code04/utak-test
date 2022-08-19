import { Container, Card, Modal, Form, Button } from 'react-bootstrap'
import { useState, useEffect } from 'react'

export default function Profile(){

    const [firstName1, setFirstName1] = useState("");
    const [lastName1, setLastName1] = useState("");
    const [userName1, setUserName1] = useState("");
    const [password1, setPassword1] = useState("");
    const [mobileNo1, setMobileNo1] = useState("");

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [isActive, setIsActive] = useState(false);

    const [userMenu, setUserMenu] = useState([]);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const user = () => {
        fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setFirstName1(data.firstName);
            setLastName1(data.lastName);
            setPassword1(data.password);
            setMobileNo1(data.mobileNo);
        })
    };

    const menu = () => {
        fetch(`${process.env.REACT_APP_API_URL}/users/details`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.items.length === 0){
                setUserMenu(["You don't have anything in your menu yet"]);
            }
            else{
                setUserMenu(data.items.map((item) => {
                    return(
                        
                        <Container key={item.id} className='col-lg-4'>
                        <Card className='mt-3 mb-4 bg-primary text-white menuContainer'>
                            {/* <Card.Header as="h4">{}</Card.Header> */}
                            <Card.Body>
                                <Container>
                                    <h5>Name <span className='ms-1 span-text'>{item.name}</span></h5>
                                    <h5>Category <span className='ms-1 span-text'>{item.category}</span></h5>
                                    <h5>Price: <span className='ms-1 span-text'>{item.price}</span></h5>
                                    {/* <h5>size: <span className='ms-1 span-text'>{item.size}</span></h5> */}
                                    <h5>Stocks: <span className='ms-1 span-text'>{item.stocks}</span></h5>
                                    <h5>Cost: <span className='ms-1 span-text'>{item.cost}</span></h5>
                                </Container>
                              <div className='d-flex'>
                                <Button className='ms-auto' variant="light" onClick={() => handleShow()}>Update</Button>
                              </div>
                            </Card.Body>
                        </Card>
                    </Container>
                    )
                }))
            }
        })
    }

    useEffect(() => {
        user()
        menu()
    }, []);



    useEffect(() => {
        if(firstName !== "" && lastName !== "" && password !== "" && mobileNo !== ""){
            setIsActive(true);
        }

    }, [firstName, lastName, password, mobileNo])

    const update = () => {
        handleShow()
        
    }


    return (
        <>
            <Container>
                {/* <Container className='my-5 col-lg-2 col-md-3 col-sm-4'>
                    <img className='' width='100%' height='100%' src="https://www.freeiconspng.com/thumbs/profile-icon-png/am-a-19-year-old-multimedia-artist-student-from-manila--21.png" />
                </Container> */}
            </Container>
            <Container className='col-lg-10 mt-5'>
                <Card className=' userDetails mt-3 mb-4 menuContainer'>
                    <Card.Header as="h4">Profile details</Card.Header>
                    <Card.Body>
                        <Container>
                            <h5>First Name: <span className='ms-1 span-text'>{firstName1}</span></h5>
                            <h5>Last Name: <span className='ms-1 span-text'>{lastName1}</span></h5>
                            <h5>Mobile No. : <span className='ms-1 span-text'>{mobileNo1}</span></h5>
                        </Container>
                    </Card.Body>
                </Card>
            </Container>

            <Container>
            
            </Container>
            <Container className="text-center">
            <h1 className="menu">Menu</h1>
            {userMenu}
            </Container>

            <Modal dialogClassName='my-modal' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit Menu</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                <Form onSubmit = {(e) => update(e)} className="my-2">


                    <div className='d-grid gap-2 secondary'>
                    {
                        isActive
                        ?
                        <Button variant='dark' type="submit" id="loginBtn" size='lg'>
                        Edit
                        </Button>
                        :
                        <Button variant='dark' type="submit" id="loginBtn" size='lg' disabled>
                        Edit
                        </Button>
                    }



                    </div>
                </Form>


                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}