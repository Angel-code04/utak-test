import { useContext, useEffect, useState } from 'react';
import UserContext from '../UserContext';
import { Container, Form, Button, InputGroup } from 'react-bootstrap'
import Swal from 'sweetalert2';


export default function Home(){

    const {user} = useContext(UserContext);

    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [small, setSmall] = useState(false);
    const [medium, setMedium] = useState(false);
    const [large, setLarge] = useState(false);
    const [price, setPrice] = useState(0);
    const [stocks, setStocks] = useState(0);
    const [cost, setCost] = useState(0);


    const [priceSmall, setPriceSmall] = useState(0);
    const [priceMedium, setPriceMedium] = useState(0);
    const [priceLarge, setPriceLarge] = useState(0);

    const [isActive, setIsActive] = useState(false);

    const createMenu = (e) => {
      e.preventDefault()

      fetch(`${process.env.REACT_APP_API_URL}/users/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body:  JSON.stringify({
          name: name,
          category: category,
          price: price,
          cost: cost,
          stocks: stocks
        })
      })
      .then(res => res.json())
      .then(data => {
        if(data){
          setName("");
          setCategory("");
          setPrice(0);
          setPriceSmall(0);
          setPriceMedium(0);
          setPriceLarge(0);
          setSmall(false);
          setMedium(false);
          setLarge(false);

          fetch(`${process.env.REACT_APP_API_URL}/users/items`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
          .then(res => res.json())
          .then(data => {
            fetch(`${process.env.REACT_APP_API_URL}/users/size/${data._id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
              },
              body:  JSON.stringify({
                small: small,
                priceSmall: priceSmall,
                medium: medium,
                priceMedium: priceMedium,
                large: large,
                priceLarge: priceLarge
              })
            })
            .then(res => res.json())
            .then(data => data)
          })
        }
      })
    }

    const smallCheck = () => {
      if(small){
        setSmall(false);
      }
      else{
        setSmall(true)
      }
    }

    const mediumCheck = () => {
      if(medium){
        setMedium(false);
      }
      else{
        setMedium(true)
      }
    }

    const largeCheck = () => {
      if(large){
        setLarge(false);
      }
      else{
        setLarge(true)
      }
    }

    useEffect(() => {
      if(name !== "" && category !== "" && cost !== 0 && stocks !== 0){
        setIsActive(true);
      }
      else{
        setIsActive(false)
      }
    }, [name, category, stocks, cost])

    return(
        <>
        <h1 className="m-5 menu">Create your menu</h1>
        <Container fluid className="d-flex justify-content-center align-items-center">
          
            <Form onSubmit = {(e) => createMenu(e)}  className="col-8 menuContainer p-5 mb-5">

                <Form.Group className="mb-3 menu" controlId="name">
                  <Form.Label className="mb-3">Name of your item</Form.Label>
                  <Form.Control type="text" placeholder="ex: Fries" value={name} onChange={(e) => {setName(e.target.value)}} />
                  <Form.Text className="text-muted">
                    Enter one item only.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3 menu" controlId="category">
                  <Form.Label className="mb-3">Course meal</Form.Label>
                  <Form.Select onChange={(e) => setCategory(e.target.value)} aria-label="Default select example" value={category}>
                    <option>-Select-</option>
                    <option value="appetizer">Appetizer</option>
                    <option value="soup">Soup</option>
                    <option value="salad">Salad</option>
                    <option value="mainCourse">Main course</option>
                    <option value="dessert">Dessert</option>
                  </Form.Select>
                </Form.Group>

                {
                  (category === "appetizer")
                  ?
                  <>
                  
                  <Form.Group>
                  <Form.Label>Select your sizes</Form.Label>
                    {['checkbox'].map((type) => (
                      <div key={`inline-${type}`} className="mb-3 menu" >
                        <Form.Check
                          inline
                          label="Small"
                          name="small"
                          type={type}
                          id={`inline-${type}-small`}
                          value={small}
                          onClick={() => smallCheck()}

                        />
                        <Form.Check
                          inline
                          label="Medium"
                          name="medium"
                          type={type}
                          id={`inline-${type}-medium`}
                          value={medium}
                          onClick={() => mediumCheck()}
                        />
                        <Form.Check
                          inline
                          label="Large"
                          name="large"
                          type={type}
                          id={`inline-${type}-large`}
                          value={large}
                          onClick={() => largeCheck()}
                        />
                      </div>

                      
                    ))}
                  </Form.Group>


                  <Form.Label className="menu">Prices for sizes</Form.Label>
                  <Container className="d-flex">
                  
                    {
                      (small)
                      ?
                      <Form.Group className="col-lg-4 mb-3 mx-1" controlId="price">
                        <Form.Label>Price for Small</Form.Label>
                        <InputGroup className="mb-3">
                          <InputGroup.Text id="price">Php</InputGroup.Text>
                          <Form.Control
                            aria-label="price"
                            aria-describedby="price" type="number" value={priceSmall} onChange={(e) => {setPriceSmall(e.target.value)}}
                          />
                        </InputGroup>
                      </Form.Group>
                      :
                      <>
                      </>
                    }

                  {
                    (medium)
                    ?
                    <Form.Group className="col-lg-4 mb-3 mx-1" controlId="price">
                      <Form.Label>Price for Medium</Form.Label>
                      <InputGroup className="mb-3">
                        <InputGroup.Text id="price">Php</InputGroup.Text>
                        <Form.Control
                          aria-label="price"
                          aria-describedby="price" type="number" value={priceMedium} onChange={(e) => {setPriceMedium(e.target.value)} }
                        />
                      </InputGroup>   
                    </Form.Group>
                    : 
                    <></>
                  }

                  {
                    (large)
                    ?
                    <Form.Group className="col-lg-4 mb-3 mx-1" controlId="price">
                      <Form.Label>Price for Large</Form.Label>
                      <InputGroup className="mb-3">
                        <InputGroup.Text id="price">Php</InputGroup.Text>
                        <Form.Control
                          aria-label="price"
                          aria-describedby="price" type="number"
                          value={priceLarge} onChange={(e) => {setPriceLarge(e.target.value)}}
                        />
                      </InputGroup>
                  </Form.Group>
                  :
                  <></>

                
                  }
                  </Container>
                
                  </>

                  :
                  <>
                    <Form.Group className="mb-3" controlId="price">
                    <Form.Label>Price</Form.Label>
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="price">Php</InputGroup.Text>
                      <Form.Control
                        aria-label="price"
                        aria-describedby="price" type="number"
                        onChange={(e) => {setPrice(e.target.value)}}
                      />
                    </InputGroup>
                      
                  </Form.Group>
                  </>
                }

                <Form.Group className="mb-3" controlId="stocks">
                    <Form.Label>Stocks</Form.Label>
                    <InputGroup className="mb-3">
                      <Form.Control
                        aria-label="stocks"
                        aria-describedby="stocks" type="number" onChange={(e) => {setStocks(e.target.value)}}
                      />
                    </InputGroup>
                      
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="cost">
                    <Form.Label>Cost</Form.Label>
                    <InputGroup className="mb-3">
                      <Form.Control
                        aria-label="cost"
                        aria-describedby="cost" type="number" onChange={(e) => {setCost(e.target.value)}}
                      />
                    </InputGroup>
                      
                  </Form.Group>

                {
                  (isActive)
                ?
                  <Button variant="primary" type="submit">
                  Create
                  </Button>
                :
                  <Button variant="primary" type="submit" disabled>
                    Create
                  </Button>
                }
            </Form>
        </Container>
        </>
    )

    // return(
    //     (user.isAdmin)
    //     ?
    //         <Banner />
    //     :
    //     <>
    //         <Banner />
    //         <Container>
                
    //         {saleItems}
    //         </Container>

    //     </>
    // )
}