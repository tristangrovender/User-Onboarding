import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";

// form schema goes here
// mess around with min/max requirements later
const formSchema = yup.object().shape({
    name: yup.string().required("Name is a required field"),
    email: yup
        .string()
        .email()
        .required("Email is a required field"),
    password: yup.string().required("Password is required"),
    terms: yup.boolean().oneOf([true], "Please agree to the terms of use")
});

export default function Form() {
    // slice of state for from inputs
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        password: "",
        terms: ""
    });

    // state for our errors
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        terms: ""
    });

    // Each time the form value state is updated, check to see if it is valid
    // per our schema. This will allow us to enable/disable the submit button.
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const [user, setUser] = useState([]);

    // When formState changes
    useEffect(() => {
        formSchema.isValid(formState).then(valid => {
            setButtonDisabled(!valid);
        });
    }, [formState]);

    // validateChange
    const validateChange = e => {
        // .reach let's us reach into a nested schema
        yup.reach(formSchema, e.target.name)
            .validate(e.target.value)
            .then(valid => {
                setErrors({
                    ...errors,
                    [e.target.name]: ""
                });
            })
            .catch(err => {
                setErrors({
                    ...errors,
                    [e.target.name]: err.errors[0]
                });
            });
    };

    // onSubmit function
    const formSubmit = e => {
        e.preventDefault();
        axios
            .post("https://reqres.in/api/users", formState)
            .then(res => {
                setUser(res.data);
                console.log("Success", user);

                setFormState({
                    name: "",
                    email: "",
                    password: "",
                    terms: ""
                });
            })
            .catch(err => {
                console.log(err.res);
            });
    };

    // onChange function
    const inputChange = e => {
        e.persist();
        const newFormData = {
            ...formState,
            [e.target.name]:
                e.target.type === "checkbox" ? e.target.checked : e.target.value
        };
        validateChange(e);
        setFormState(newFormData);
    };

    return (
        <div>
            <form onSubmit={formSubmit}>
                <label htmlFor="name">
                    name:
                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={formState.name}
                        onChange={inputChange}
                    />
                    {errors.name.length > 0 ? (
                        <p className="error">{errors.name}</p>
                    ) : null}
                </label>
                <label htmlFor="email">
                    email:
                    <input
                        id="email"
                        type="text"
                        name="email"
                        value={formState.email}
                        onChange={inputChange}
                    />
                    {errors.email.length > 0 ? (
                        <p className="error">{errors.email}</p>
                    ) : null}
                </label>
                <label htmlFor="password">
                    password:
                    <input
                        id="password"
                        type="text"
                        name="password"
                        value={formState.password}
                        onChange={inputChange}
                    />
                    {errors.password.length > 0 ? (
                        <p className="error">{errors.password}</p>
                    ) : null}
                </label>
                <label htmlFor="terms" className="terms">
                    <input
                        type="checkbox"
                        name="terms"
                        checked={formState.terms}
                        onChange={inputChange}
                    />
                    Terms and Conditions
                </label>
                <button disabled={buttonDisabled}>Submit</button>
                <pre>{JSON.stringify(user, null, 2)}</pre>
            </form>
        </div>
    );
}
