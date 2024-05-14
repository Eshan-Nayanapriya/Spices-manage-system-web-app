import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import Nav from '../Nav/Nav'

function Inform() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_j1s5iy4', 
      'template_4zljjin', 
      form.current, {
        publicKey: '9Tblzqu-QQnsHkxIO',
      })
      .then(
        (result) => {
          console.log(result.text);
          alert("Message Send Success!")
        },
        (error) => {
          console.log(error.text);
          alert("Message Send Faile!")
        },
      );
  };

  return (
   
    <div>
         <Nav/>
      <h1>Contact Supply Manager </h1>

      <form ref={form} onSubmit={sendEmail}>
      <label>Name</label><br></br>
      <input type="text" name="user_name" /><br></br>
      <label>Email</label><br></br>
      <input type="email" name="user_email" /><br></br>
      <label>Message</label><br></br>
      <textarea name="message" /><br></br>
      <input type="submit" value="Send" />
    </form>
    </div>
  )
}

export default Inform
