import React from "react";
import TextInput from "./TextInput";
import validate from "./validator";

export default class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      formIsValid: false,
      formControls: {
        name: {
          value: "",
          valid: false,
          validationRules: {
            isRequired: true
          },
          placeholderText: "Your name please",
          touched: false
        },
        age: {
          value: "",
          placeholder: "What is your age",
          valid: false,
          touched: false,
          validationRules: {
            minLength: 3,
            isRequired: true
          }
        },
        gender: {
          value: "",
          placeholder: "What is your gender",
          valid: false,
          touched: false,
          validationRules: {
            isRequired: true
          },
          options: [
            { value: "male", displayValue: "Male" },
            { value: "female", displayValue: "Female" }
          ]
        }
      }
    };
  }

  onChangeHandler = event => {
    const name = event.target.name;
    const value = event.target.value;

    const updatedControls = {
      ...this.state.formControls
    };

    const updatedFormElement = {
      ...updatedControls[name]
    };

    updatedFormElement.value = value;
    updatedFormElement.touched = true;
    updatedFormElement.valid = validate(
      value,
      updatedFormElement.validationRules
    );

    updatedControls[name] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedControls) {
      formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
    }

    this.setState({
      formControls: updatedControls,
      formIsValid: formIsValid
    });
  };

  formSubmitHandler = event => {
    event.preventDefault();
    console.dir(this.state.formControls);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.submitFormHandler}>
          <div>
            <TextInput
              name="name"
              placeholder={this.state.formControls.name.placeholder}
              value={this.state.formControls.name.value}
              onChange={this.onChangeHandler}
              touched={this.state.formControls.name.touched}
              valid={this.state.formControls.name.valid}
            />
            <button
              onClick={this.formSubmitHandler}
              disabled={!this.state.formIsValid}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}
