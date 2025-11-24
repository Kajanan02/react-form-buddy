import { useEffect, useState } from 'react';
import { isEmpty, isFunction } from './utils';

const useFormHandler = (callback, validate) => {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) {
            setIsSubmitting(false);
            callback();
        }
    }, [errors, isSubmitting, callback]);


    const handleSubmit = (event) => {
        if (event) event.preventDefault();
        setIsSubmitted(true);
        setIsSubmitting(true);

        setValues((prev) => {
            const nextValues = { ...prev };

            Object.keys(nextValues).forEach((key) => {
                if (typeof nextValues[key] === 'string') {
                    nextValues[key] = nextValues[key].trimEnd();
                }
            });

            setErrors(validate(nextValues));
            return nextValues;
        });
    };

    function checkDirty(errorsI, isSubmittedI, formI) {
        if (isSubmittedI) {
            return errorsI;
        }
        const cleaned = { ...errorsI };
        for (let property in cleaned) {
            if (!formI[property] || !formI[property].dirty) {
                delete cleaned[property];
            }
        }
        return cleaned;
    }

    const handleKeyDown = (event) => {
        ['e', 'E', '+', '-'].includes(event.key) && event.preventDefault();
    };

    const handleChange = (event) => {
        if (isFunction(event.persist)) {
            event.persist();
        }

        if (event.target.type) {
            event.target.value = event.target.value ? event.target.value.trimStart() : '';
        }

        const { name, value } = event.target;

        setValues((prev) => {
            const nextValues = { ...prev, [name]: value };
            setErrors(checkDirty(validate(nextValues), isSubmitted, form));
            return nextValues;
        });

        setIsSubmitting(false);
    };

    const setValue = (value) => {
        setValues((prev) => {
            const nextValues = { ...prev, ...value };
            setErrors(checkDirty(validate(nextValues), isSubmitted, form));
            return nextValues;
        });
        setIsSubmitting(false);
    };

    const refresh = () => {
        setValues((prev) => {
            const nextValues = { ...prev };
            setErrors(checkDirty(validate(nextValues), isSubmitted, form));
            return nextValues;
        });
        setIsSubmitting(false);
    };

    const initForm = (initialValues) => {
        setValues(initialValues || {});
        setErrors({});
        setForm({});
        setIsSubmitted(false);
        setIsSubmitting(false);
    };

    const handleOnBlur = (event) => {
        if (isFunction(event.persist)) {
            event.persist();
        }

        const { name, value } = event.target;

        const nextForm = { ...form, [name]: { dirty: true } };

        setErrors(checkDirty(validate({ ...values, [name]: value }), isSubmitted, nextForm));
        setForm(nextForm);
        setIsSubmitting(false);
    };

    const deleteErrors = (error) => {
        if (!error || isEmpty(error)) return;

        const newForm = { ...form };
        Object.keys(error).forEach((key) => delete newForm[key]);

        setForm(newForm);
        setErrors({});
    };

    return {
        handleChange,
        handleOnBlur,
        handleSubmit,
        initForm,
        setValue,
        deleteErrors,
        handleKeyDown,
        refresh,
        values,
        errors,
        form,
        isSubmitted,
        isSubmitting,
    };
};

export default useFormHandler;
