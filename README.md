# react-form-buddy

A lightweight form handler for React applications.

## Installation

```bash
npm install react-form-buddy
```

## Usage

```jsx
import FormHandler from 'react-form-buddy';

const MyForm = () => {
    const validate = (values) => {
        let errors = {};
        if (!values.email) {
            errors.email = "Email is required";
        }
        return errors;
    };

    const submitForm = () => {
        console.log("Form submitted successfully!");
    };

    const { handleChange, handleSubmit, values, errors } = FormHandler(submitForm, validate);

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="email" 
                name="email" 
                value={values.email || ''} 
                onChange={handleChange} 
            />
            {errors.email && <p>{errors.email}</p>}
            <button type="submit">Submit</button>
        </form>
    );
};
```

## License

MIT

### Conclusion

After following these steps, you should have a functional npm package that users can install and use in their React applications. Let me know if you have any questions or need further assistance!

