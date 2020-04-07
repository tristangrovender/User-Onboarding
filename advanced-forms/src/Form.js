import React from "react";

export default function Form() {
    return (
        <div>
            <form>
                <label htmlFor="name">
                    name:
                    <input
                        id="name"
                        type="text"
                        name="name"
                        // value={}
                        // onChange={}
                    />
                </label>
                <br />
                <label htmlFor="email">
                    email:
                    <input
                        id="email"
                        type="text"
                        name="email"
                        // value={}
                        // onChange={}
                    />
                </label>
                <br />
                <label htmlFor="password">
                    password:
                    <input
                        id="password"
                        type="text"
                        name="password"
                        // value={}
                        // onChange={}
                    />
                </label>
                <br />
                <label htmlFor="terms" className="terms">
                    <input
                        type="checkbox"
                        name="terms"
                        // checked={}
                        // onChange={}
                    />
                    Terms and Conditions
                </label>
                <br />
                <button>Submit</button>
            </form>
        </div>
    );
}
