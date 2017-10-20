import React from 'react';
import './register.css';

export class Register extends React.Component {

    render() {

        return (

            <div className="container" >
                <div className="wrapper register-wrapper">
                    <div className="row">
                        <form action="" method="post" name="Register_Form" className="form-register">
                            <h3 className="form-register-heading">Please Register</h3>


                                <div className="form-group">
                                    <label className="col-md-4 control-label" htmlFor="firstname">First Name</label>
                                    <div className="col-md-5">
                                        <input id="firstname" name="firstname" type="text" placeholder="Your first name" className="form-control input-md" required="" />

                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-md-4 control-label" htmlFor="lastname">Last Name</label>
                                    <div className="col-md-5">
                                        <input id="firstname" name="lastname" type="text" placeholder="Your last name" className="form-control input-md" required="" />

                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-md-4 control-label" htmlFor="username">Username</label>
                                    <div className="col-md-5">
                                        <input id="username" name="username" type="text" placeholder="Your username" className="form-control input-md" required="" />

                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-md-4 control-label" htmlFor="email">Email</label>
                                    <div className="col-md-5">
                                        <input id="email" name="email" type="text" placeholder="Your email here" className="form-control input-md" required="" />
                                        <span className="help-block">xxxxxxxxx @xxxxx.xxx</span>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-md-4 control-label" htmlFor="password">Password </label>
                                    <div className="col-md-5">
                                        <input id="password" name="password" type="password" placeholder="Password" className="form-control input-md" required="" />

                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-md-4 control-label" htmlFor="confirm-password">Confirm Password </label>
                                    <div className="col-md-5">
                                        <input id="confirm-password" name="confirm-password" type="password" placeholder="Confirm Password" className="form-control input-md" required="" />

                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-md-4 control-label" htmlFor="confirmation"></label>
                                    <div className="col-md-4">
                                        <button id="confirmation" name="confirmation" className="btn btn-primary">Submit</button>
                                    </div>
                                </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    };

};