import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import image from '../assets/download.png';

const Home = () => {

    const [show, setShow] = useState(false);

    const [email, setEmail] = useState("");


    const sendEmail = async (e) => {
      e.preventDefault();
    
      try {
        // const res = await fetch("http://localhost:8004/register", {
          const res = await fetch("https://send-email-using-mern.vercel.app/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email
          })
        });

        console.log(res);
        const data = await res.json();
        console.log(data);
    
        if (data.status === 401 || !data) {
          console.log("error");
        } else {
          setShow(true);
          setEmail("");
          console.log("Email sent");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    

    return (
        <>
            {
                show ? <Alert variant="primary" onClose={() => setShow(false)} dismissible>
                    Your Email Succesfully Send
                </Alert> : ""
            }
            <div className="container mt-2">
                <div className='d-flex justify-content-center'>
                    <h2>Send Email With React & NodeJs</h2>
                    <img src={image} alt="gmail img" className='mx-3' style={{ width: "50px" }} />
                </div>
                <div className="d-flex justify-content-center">
                    <Form className='mt-2 col-lg-6'>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Enter Your Email</Form.Label>
                            <Form.Control type="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={sendEmail}>
                            Send
                        </Button>
                    </Form>
                </div>

            </div>

        </>
    )
}

export default Home