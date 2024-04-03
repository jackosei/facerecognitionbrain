import React from "react";
import './SignIn.css'

const SignIn = ({ onRouteChange }) => {
    return (
        <main className="pa4 black-80 center">
            <form className="measure white">
                <fieldset
                    id="sign_up"
                    className="ba b--transparent ph0 mh0"
                >
                    <legend className="f2 fw6 ph0 mh0">
                        Sign In
                    </legend>
                    <div className="mt3">
                        <label
                            className="db fw6 lh-copy f6"
                            for="email-address"
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
                            for="password"
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
                        value="Sign in"
                        onClick={() => onRouteChange('home')}
                    />
                </div>
                <div className="lh-copy mt3">
                    <a
                        href="#0"
                        className="f6 link dim white db"
                    >
                        Create Account
                    </a>
                </div>
            </form>
        </main>
    )
}

export default SignIn
