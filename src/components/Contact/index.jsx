import React from 'react'
import styled from 'styled-components'
import { useRef } from 'react';
import emailjs from '@emailjs/browser'
import { Snackbar } from '@mui/material';




const Container = styled.div`

display: flex;
flex-direction: column;
justify-content: center;
position: relative;
z-index: 1;
align-items: center;
@media (max-width: 960px) {
    padding: 0px;
}
`

const Wrapper = styled.div`
position: relative;
display: flex;
justify-content: space-between;
align-items: center;
flex-direction: column;
width: 100%;
max-width: 1350px;
padding: 0px 0px 80px 0px;
gap: 12px;
@media (max-width: 960px) {
    flex-direction: column;
}
`

const Title = styled.div`
font-size: 42px;
text-align: center;
font-weight: 600;
margin-top: 70px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
      margin-top: 12px;
      font-size: 32px;
  }
`;

const Desc = styled.div`
    font-size: 18px;
    text-align: center;
    max-width: 600px;
    color: ${({ theme }) => theme.text_secondary};
    @media (max-width: 768px) {
        margin-top: 12px;
        font-size: 16px;
    }
`;


const ContactForm = styled.form`
  width: 95%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.card};
  padding: 32px;
  border-radius: 16px;
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  margin-top: 28px;
  gap: 12px;
`

const ContactTitle = styled.div`
  font-size: 24px;
  margin-bottom: 6px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`

const ContactInput = styled.input`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`

const ContactInputMessage = styled.textarea`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`

const ContactButton = styled.input`
  width: 100%;
  text-decoration: none;
  text-align: center;
  background: hsla(271, 100%, 50%, 1);
  background: linear-gradient(225deg, hsla(271, 100%, 50%, 1) 0%, hsla(294, 100%, 50%, 1) 100%);
  background: -moz-linear-gradient(225deg, hsla(271, 100%, 50%, 1) 0%, hsla(294, 100%, 50%, 1) 100%);
  background: -webkit-linear-gradient(225deg, hsla(271, 100%, 50%, 1) 0%, hsla(294, 100%, 50%, 1) 100%);
  padding: 13px 16px;
  margin-top: 2px;
  border-radius: 12px;
  border: none;
  color: ${({ theme }) => theme.text_primary};
  font-size: 18px;
  font-weight: 600;
`;
const ContactInfo = styled.div`
  text-align: center;
  p {
    margin: 8px 0;
    font-size: 16px;
    color: ${({ theme }) => theme.text_secondary};
  }
`;
const ContactLinkedInButton = styled.button`
margin: 8px 0;
font-size: 16px;
color: white;  // Text color
text-decoration: none;  // Remove underline
cursor: pointer;
background-color: #2587be;  // Button background color
border: none;
padding: 10px 20px;  // Adjust padding as needed
font-family: inherit;
cursor: pointer;
border-radius: 8px;  // Optional: Add border-radius for rounded corners

  &:hover {
    color: ${({ theme }) => theme.primary};  // Change color on hover if needed
  }
`;



const Contact = () => {
  

  const SERVICE = import.meta.env.VITE_APP_SERVICE;
  const TEMPLATE = import.meta.env.VITE_APP_TEMPLATE;
  const KEY = import.meta.env.VITE_APP_KEY;
  
  //hooks
  const [open, setOpen] = React.useState(false);
  const form = useRef();
  const linkedInId = "https://www.linkedin.com/in/harshan-k-a605a8261?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BuopyyY44QOmuQ%2FTya%2FrdaQ%3D%3D";
  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs.sendForm(SERVICE, TEMPLATE, form.current, KEY)
      .then((result) => {
        setOpen(true);
        form.current.reset();
      }, (error) => {
        console.log(error.text);
      });
  }

  



  return (
    <Container id="contact">
      <Wrapper>
        <Title>Contact</Title>
        <Desc>Feel free to reach out to me for any questions or opportunities!</Desc>
        <ContactInfo>
          <p>Email: harshan20102000@gmail.com</p>
          <p>Contact: +91 8438381601</p>
        </ContactInfo>
        
        <ContactLinkedInButton onClick={() => window.open(linkedInId, "_blank")} rel="noopener noreferrer">
          LinkedIn
        </ContactLinkedInButton>
        <ContactForm ref={form} onSubmit={handleSubmit}>
          <ContactTitle>Email Me 🚀</ContactTitle>
          <ContactInput placeholder="Your Email" name="from_email" />
          <ContactInput placeholder="Your Name" name="from_name" />
          <ContactInput placeholder="Subject" name="subject" />
          <ContactInputMessage placeholder="Message" rows="4" name="message" />
          <ContactButton type="submit" value="Send" />
        </ContactForm>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={()=>setOpen(false)}
          message="Email sent successfully!"
          severity="success"
        />
      </Wrapper>
    </Container>
  )
}

export default Contact