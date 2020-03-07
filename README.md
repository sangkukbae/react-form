# react form

**src/App.js**
```jsx
import React from "react";
import "./styles.css";

import TextInput from "./components/TextInput";
import validate from "./components/validator";
import TextArea from "./components/TextArea";
import Email from "./components/Email";
import Select from "./components/Select";
import Radio from "./components/Radio";

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      formIsValid: false,
      formControls: {
        name: {
          value: "",
          placeholder: "Your name...",
          valid: false,
          validationRules: {
            minLength: 4,
            isRequired: true
          },
          touched: false
        },
        address: {
          value: "",
          placeholder: "Your address",
          valid: false,
          validationRules: {
            minLength: 4,
            isRequired: true
          },
          touched: false
        },
        my_email: {
          value: "",
          placeholder: "Your email",
          valid: false,
          validationRules: {
            isRequired: true,
            isEmail: true
          },
          touched: false
        },
        gender: {
          value: "",
          placeholder: "Your gender",
          valid: false,
          touched: false,
          validationRules: {
            isRequired: true
          },
          options: [
            { value: "male", displayValue: "Male" },
            { value: "female", displayValue: "Female" }
          ]
        },
        my_radio: {
          value: "",
          placeholder: "Are you a frontend developer",
          valid: false,
          touched: false,
          validationRules: {
            // isRequired: true,
          },
          options: [
            { value: 0, displayValue: "No" },
            { value: 1, displayValue: "Yes" }
          ]
        }
      }
    };
  }

  changeHandler = event => {
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

    console.log(updatedControls);
    console.log(updatedFormElement);
  };

  formSubmitHandler = () => {
    const formData = {};
    for (let formElementId in this.state.formControls) {
      formData[formElementId] = this.state.formControls[formElementId].value;
    }

    console.dir(formData);
  };

  render() {
    return (
      <div className="App">
        <h1>react form</h1>
        <TextInput
          name="name"
          placeholder={this.state.formControls.name.placeholder}
          value={this.state.formControls.name.value}
          onChange={this.changeHandler}
          touched={this.state.formControls.name.touched}
          valid={this.state.formControls.name.valid}
        />

        <TextArea
          name="address"
          placeholder={this.state.formControls.address.placeholder}
          value={this.state.formControls.address.value}
          onChange={this.changeHandler}
          touched={this.state.formControls.address.touched}
          valid={this.state.formControls.address.valid}
        />

        <Email
          name="my_email"
          placeholder={this.state.formControls.my_email.placeholder}
          value={this.state.formControls.my_email.value}
          onChange={this.changeHandler}
          touched={this.state.formControls.my_email.touched}
          valid={this.state.formControls.my_email.valid}
        />

        <Select
          name="gender"
          value={this.state.formControls.gender.value}
          onChange={this.changeHandler}
          options={this.state.formControls.gender.options}
          touched={this.state.formControls.gender.touched}
          valid={this.state.formControls.gender.valid}
        />
        <p>Are you a frontend developer?</p>
        <Radio
          name="my_radio"
          value={this.state.formControls.my_radio.value.toString}
          onChange={this.changeHandler}
          options={this.state.formControls.my_radio.options}
          touched={this.state.formControls.my_radio.touched}
          valid={this.state.formControls.my_radio.valid}
        />

        <button
          onClick={this.formSubmitHandler}
          disabled={!this.state.formIsValid}
        >
          Submit
        </button>
      </div>
    );
  }
}
```

**src/components/validator.js**
```jsx
import React from "react";

const validate = (value, rules) => {
  let isValid = true;

  for (let rule in rules) {
    switch (rule) {
      case "minLength":
        isValid = isValid && minLengthValidator(value, rules[rule]);
        break;

      case "isRequired":
        isValid = isValid && requiredValidator(value);
        break;

      case "isEmail":
        isValid = isValid && emailValidator(value);
        break;

      default:
        isValid = true;
    }
  }

  return isValid;
};

const minLengthValidator = (value, minLength) => {
  return value.length >= minLength;
};

const requiredValidator = value => {
  return value.trim() !== "";
};

const emailValidator = value => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(value).toLowerCase());
};

export default validate;
```

[https://codesandbox.io/s/react-form-mxggk](https://codesandbox.io/s/react-form-mxggk)

:memo: **참고 자료**
* [https://medium.com/@agoiabeladeyemi/the-complete-guide-to-forms-in-react-d2ba93f32825](https://medium.com/@agoiabeladeyemi/the-complete-guide-to-forms-in-react-d2ba93f32825)
* [https://developer.mozilla.org/ko/docs/Learn/HTML/Forms/Your_first_HTML_form](https://developer.mozilla.org/ko/docs/Learn/HTML/Forms/Your_first_HTML_form)
* [https://www.w3schools.com/react/react_forms.asp](https://www.w3schools.com/react/react_forms.asp)
* [https://medium.com/@rossbulat/an-introduction-to-using-form-elements-in-react-3778042ff334](https://medium.com/@rossbulat/an-introduction-to-using-form-elements-in-react-3778042ff334) :heavy_check_mark:

