import React, { Component } from 'react';
import axios from 'axios';
import './EmailForm.css';
import {Button, TextField} from '@material-ui/core';

class EmailForm extends Component {

    resetForm = () => {
        document.getElementById('emailForm').reset();
    }

    submitForm = (e) => {
        //prevent page refresh
        e.preventDefault();
        console.log('button clicked!');
        //prepare data to send
        let dataToSend = {
            name: document.getElementById('name').value,
            sendEmail: document.getElementById('sendEmail').value,
            recEmail: document.getElementById('recEmail').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        }
        //axios request, send data to server
        axios.post('/send', dataToSend)
        .then(response => {
            if (response.data.msg === 'success') {
                alert('Message Sent!');
                this.resetForm();
            } else if (response.data.msg === 'fail') {
                alert('Message failed to send :(');
            }
        }).catch(error => {
            console.log(error);
        })
    } //end submitForm

    render() {
        return  (
            <div>
                <form id="emailForm" className="emailForm" onSubmit={this.submitForm} method="POST">
                    <div className="form-group-center">
                        <h3>Email Sender</h3>
                    </div>
                    <div className="form-group">
                        <TextField id="name" label="your name" />
                        <TextField id="sendEmail" label="your email address" />
                    </div>
                    <div className="form-group">
                        <TextField id="recEmail" label="recipient email address" />
                        <TextField id="subject" label="subject line" />
                    </div>
                    <div className="form-group">
                        <TextField multiline id="message" label="message" /><br />
                    </div>
                    <div className="form-group-center">
                        <Button variant="contained" color="primary" className="form-button" type="submit">Send</Button>
                    </div>
                </form>
            </div>
        )
    }
}

export default EmailForm;