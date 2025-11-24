# react-form-buddy

A lightweight, customizable, and developer-friendly **React form handler** built for modern applications.  
`react-form-buddy` simplifies form state, validation, error handling, and submission — without heavy abstractions or complex APIs.

Perfect for React developers who want a clean, simple API that “just works”.

---

## 🚀 Features

- ✔ Minimal API — only one hook to learn
- ✔ Built-in state management (`values`, `errors`, `form`)
- ✔ Supports custom validation functions
- ✔ Tracks touched / dirty fields
- ✔ Handles `onChange`, `onBlur`, and `onSubmit` logic
- ✔ Prevents unwanted characters for numeric fields
- ✔ Auto-trims input values
- ✔ Works with **React 16 → 19+**
- ✔ Zero dependencies (tiny bundle size)

---

## 📦 Installation

```bash
npm install react-form-buddy
# or
yarn add react-form-buddy
```

## ✨ Basic Usage Example
```jsx
import useFormHandler from "react-form-buddy";

const MyForm = () => {
  const validate = (values) => {
    const errors = {};
    if (!values.email) errors.email = "Email is required";
    return errors;
  };

  const submitForm = () => {
    console.log("Form submitted successfully!");
  };

  const {
    values,
    errors,
    handleChange,
    handleOnBlur,
    handleSubmit
  } = useFormHandler(submitForm, validate);

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        value={values.email || ""}
        onChange={handleChange}
        onBlur={handleOnBlur}
      />
      {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;
```
## 📘 API Documentation

The hook signature is:
```jsx
useFormHandler(callback, validate);
```
Where:

- **callback** → function fired when the form has no validation errors

- **validate** → function receiving form values and returning an errors object

Example:

```jsx
const errors = validate(values);
return { email: "Invalid email" };

```

| Key                    | Type     | Description                     |
| ---------------------- | -------- | ------------------------------- |
| `values`               | object   | Current form values             |
| `errors`               | object   | Validation errors               |
| `form`                 | object   | Dirty/touched metadata          |
| `isSubmitted`          | boolean  | True after first submit         |
| `isSubmitting`         | boolean  | Shows submission state          |
| `handleSubmit(event)`  | function | Use on `<form onSubmit>`        |
| `handleChange(event)`  | function | Use on inputs' `onChange`       |
| `handleOnBlur(event)`  | function | Runs validation on blur         |
| `handleKeyDown(event)` | function | Prevents invalid numeric input  |
| `setValue(obj)`        | function | Manually set one or more values |
| `initForm(obj)`        | function | Reset the entire form           |
| `refresh()`            | function | Re-run validation manually      |
| `deleteErrors(obj)`    | function | Remove specific errors          |

## 🧠 How Each Function Works

### ✔ `handleChange(event)`

- Updates `values` in real-time
- Re-validates the specific field that changed
- Automatically trims **leading whitespace**

---
### ✔ `handleOnBlur(event)`
- Marks the field as **dirty**
- Validates the field on blur
- Errors appear **only after blur or submit**

---

### ✔ `handleSubmit(event)`
- Prevents the default form submit behavior
- Marks the form as **submitted**
- Trims all **trailing whitespace** from string fields
- Runs full form validation
- If validation passes → **your callback function is executed**

---

### ✔ `setValue({ key: value })`
- Programmatically update **one or more** form values
- Useful for:
    - Prefilling form data
    - Setting values from external sources
    - Updating dependent fields

### ✔ `initForm(values)`
Resets the entire form state:
- `values`
- `errors`
- `dirty` flags
- `submit` flags

---

### ✔ `refresh()`
- Re-runs validation using the **current** form values.
- Useful when you change values programmatically and want validation to update.

---

### ✔ `deleteErrors({ field: true })`
- Clears specific error messages.
- Also removes corresponding **dirty flags**, so the field behaves like fresh input again.

---

### ✔ `handleKeyDown(event)`
For `<input type="number">` fields:
- Blocks invalid keys such as:
    - `e`
    - `E`
    - `+`
    - `-`
    - `.`

To prevent scientific notation.

Usage:
```jsx
<input type="number" onKeyDown={handleKeyDown} />
```

## 📚 Advanced Example

```jsx
const {
  values,
  errors,
  form,
  isSubmitted,
  isSubmitting,
  handleChange,
  handleOnBlur,
  handleSubmit,
  setValue,
  initForm,
  deleteErrors,
  handleKeyDown,
  refresh
} = useFormHandler(submitForm, validate);

```
You can then bind these anywhere in your UI.

## 📜 License

MIT — free to use in personal and commercial projects.

