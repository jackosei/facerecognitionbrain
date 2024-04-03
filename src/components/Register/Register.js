import React from "react";

const Register = ({ onRouteChange }) => {
    return (
        <main className="pa4 black-80 center">
            <div className="measure white">
                <fieldset
                    id="sign_up"
                    className="ba b--transparent ph0 mh0"
                >
                    <legend className="f2 fw6 ph0 mh0">
                        Create Account
                    </legend>
                    <div className="mt3">
                        <label
                            className="db fw6 lh-copy f6"
                            htmlFor="full-name"
                        >
                            First Name
                        </label>
                        <input
                            className="pa2 input-reset ba bg-transparent hover-bg-white white hover-black w-100"
                            type="text"
                            name="full-name"
                            id="full-name"
                        />
                    </div>
                    <div className="mt3">
                        <label
                            className="db fw6 lh-copy f6"
                            htmlFor="email-address"
                        >
                            Email
                        </label>
                        <input
                            className="pa2 input-reset ba bg-transparent hover-bg-white white hover-black w-100"
                            type="email"
                            name="email-address"
                            id="email-address"
                        />
                    </div>
                    <div className="mv3">
                        <label
                            className="db fw6 lh-copy f6"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            className="b pa2 input-reset ba bg-transparent white hover-bg-white hover-black w-100"
                            type="password"
                            name="password"
                            id="password"
                        />
                    </div>
                </fieldset>
                <div className="">
                    <input
                        className="b ph3 pv2 input-reset ba white b--white bg-transparent grow pointer f6 dib"
                        type="submit"
                        value="Create Account"
                        onClick={() => onRouteChange('home')}
                    />
                </div>
                <div className="lh-copy mt3">
                    <p
                        className="f6 link dim white db pointer"
                        onClick={() => onRouteChange('signin')}
                    >
                        Sign In
                    </p>
                </div>
            </div>
        </main>
    )
}

export default Register
