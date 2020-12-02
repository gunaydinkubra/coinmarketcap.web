import { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap'
import './Login.css';
import RequestType from './../../model/RequestType'
import { ApiURL } from '../../constants/ApiURL';
import { Redirect } from 'react-router';

export default function Login() {

    const [form, setForm] = useState(
        {
            username: '',
            password: ''
        });
    const [loginDetails, setLoginDetails] = useState();
    const [isLoginSuccess, setIsLoginSuccess] = useState(true);
    const [isDashboardOpen, setIsDashboardOpen] = useState(false);
    const [loginMessage, setLoginMessage] = useState('');
    const [signUpDetails, setSignUpDetails] = useState();
    const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);
    const [signUpMessage, setSignUpMessage] = useState('');

    useEffect(() => {
        if (loginDetails != undefined) {
            if (!loginDetails.isLogin) {
                setIsLoginSuccess(false);
                setLoginMessage(loginDetails.message);
            }
            else {
                document.cookie = "token=" + loginDetails?.token + ";expires=" + loginDetails?.tokenExpireDate;
                setIsDashboardOpen(true);
            }
        }
    }, [loginDetails]);

    useEffect(() => {
        if (signUpDetails != undefined) {
            setIsSignUpSuccess(true);
            setSignUpMessage(signUpDetails.message);
        }
    }, [signUpDetails]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value

        })
    }

    const handleSignIn = () => {
        try {

            const res = {
                method: RequestType.POST,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            };
            fetch(ApiURL.Query.GetLogin, res)
                .then(response => response.json())
                .then(data => setLoginDetails(data))
        } catch (error) {
            console.log(error);
        }
    }

    const handleSignUp = () => {
        try {
            const res = {
                method: RequestType.POST,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            };
            fetch(ApiURL.Query.GetUser, res)
                .then(response => response.json())
                .then(data => setSignUpDetails(data))
            setIsLoginSuccess(true);
            //setIsSignUpSuccess(true);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <section>
            <div>
                {!isSignUpSuccess ? <></>:
                    <Alert key={1} variant="info">{signUpMessage}</Alert> 
                }
               
                {isLoginSuccess ? <></> :
                    <Alert key={2} variant="danger">
                        {loginMessage}
                    </Alert>
                }
                {isDashboardOpen ? <div><Redirect to="/dashboard" /> </div> : null}
            </div>
            <div className="login-area">
                <Form>
                    <Form.Group>
                        <Form.Label>Kullanıcı Adı</Form.Label>
                        <Form.Control
                            name="username"
                            type="text"
                            placeholder="Kullanıcı Adını Giriniz"
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Şifre</Form.Label>
                        <Form.Control
                            name="password"
                            type="password"
                            placeholder="Şifre"
                            onChange={handleChange} />
                    </Form.Group>
                    <Button variant="primary" className="login-button" onClick={handleSignIn} > Giriş</Button>
                    <Button variant="success" className="signup-button" onClick={handleSignUp}> Kaydol</Button>
                </Form>
            </div>
        </section>
    );
}