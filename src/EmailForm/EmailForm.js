import React, { Component } from 'react';
import axios from 'axios';

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
                <h2>Send an Email</h2>
                <form id="emailForm" className="emailForm" onSubmit={this.submitForm} method="POST">
                    <div>
                        <label>your name: </label>
                        <input type="text" placeholder="your name" id="name" />
                    </div>
                    <div>
                        <label>your email address: </label>
                        <input type="text" placeholder="yourname@example.com" id="sendEmail" />
                    </div>
                    <div>
                        <label>recipient email address: </label>
                        <input type="text" placeholder="theirname@example.com" id="recEmail" />
                    </div>
                    <div>
                        <label>subject line: </label>
                        <input type="text" placeholder="what's up?" id="subject" />
                    </div>
                    <div>
                        <label>message: </label>
                        <textarea placeholder="message" rows="5" id="message" /><br />
                    </div>
                    <button type="submit">Send</button>
                </form>
            </div>
        )
    }
}

export default EmailForm;