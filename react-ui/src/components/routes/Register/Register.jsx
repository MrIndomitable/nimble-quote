import React from 'react';
// import axios from 'axios';
// import {parse} from 'query-string';
// import {
//   BrowserRouter as Router,
//   Route,
//   Link,
//   Redirect,
//   withRouter
// } from 'react-router-dom';
// import './register.css';

export class Register extends React.Component {
    // state = {
    //   auth: false
    // };
    render() {

        return (

            <div className="container" >
                <div className="wrapper register-wrapper">
                    <div className="row">
                        <form action="" method="post" name="Register_Form" className="form-register">
                                    <h3 className="form-register-heading">Please Register</h3>

                            <fieldset>

                                <div className="form-group">
                                    <label className="col-md-4 control-label" for="firstname">First Name</label>
                                    <div className="col-md-5">
                                        <input id="firstname" name="firstname" type="text" placeholder="Your first name" className="form-control input-md" required="" />

                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-md-4 control-label" for="lastname">Last Name</label>
                                    <div className="col-md-5">
                                        <input id="firstname" name="lastname" type="text" placeholder="Your last name" className="form-control input-md" required="" />

                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-md-4 control-label" for="username">Username</label>
                                    <div className="col-md-5">
                                        <input id="username" name="username" type="text" placeholder="Your username" className="form-control input-md" required="" />

                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-md-4 control-label" for="email">Email</label>
                                    <div className="col-md-5">
                                        <input id="email" name="email" type="text" placeholder="Your email here" className="form-control input-md" required="" />
                                        <span className="help-block">xxxxxxxxx @xxxxx.xxx</span>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-md-4 control-label" for="password">Password </label>
                                    <div className="col-md-5">
                                        <input id="password" name="password" type="password" placeholder="Password" className="form-control input-md" required="" />

                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-md-4 control-label" for="confirm-password">Confirm Password </label>
                                    <div className="col-md-5">
                                        <input id="confirm-password" name="confirm-password" type="password" placeholder="Confirm Password" className="form-control input-md" required="" />

                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-md-4 control-label" for="confirmation"></label>
                                    <div className="col-md-4">
                                        <button id="confirmation" name="confirmation" className="btn btn-primary">Submit</button>
                                    </div>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
                );
                };

                };