import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";

// form schema goes here

export default function Form() {
    // slice of state for from inputs
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        password: "",
        terms: ""
    });

    // onChange function
    const inputChange = e => {
        e.persist();
        const newFormData = {
            ...formState,
            [e.target.name]:
                e.target.type === "checkbox" ? e.target.checked : e.target.value
        };
        // validateChange(e);
        setFormState(newFormData);
    };

    return (
        <div>
            <form>
                <label htmlFor="name">
                    name:
                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={formState.name}
                        onChange={inputChange}
                    />
                </label>
                <br />
                <label htmlFor="email">
                    email:
                    <input
                        id="email"
                        type="text"
                        name="email"
                        value={formState.email}
                        onChange={inputChange}
                    />
                </label>
                <br />
                <label htmlFor="password">
                    password:
                    <input
                        id="password"
                        type="text"
                        name="password"
                        value={formState.password}
                        onChange={inputChange}
                    />
                </label>
                <br />
                <label htmlFor="terms" className="terms">
                    <input
                        type="checkbox"
                        name="terms"
                        checked={formState.terms}
                        onChange={inputChange}
                    />
                    Terms and Conditions
                </label>
                <br />
                <button>Submit</button>
            </form>
        </div>
    );
}
