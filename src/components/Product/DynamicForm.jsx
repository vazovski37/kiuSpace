import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../env';
import ImageUpload from './ImageUpload';
import CustomDropdown from './CustomDropdown';

// CustomRadioButton component
const CustomRadioButton = ({ option, fieldName, handleChange, isSelected }) => {
    const handleRadioChange = () => {
        handleChange(fieldName, option.value);
    };

    return (
        <div className={`radio-button ${isSelected ? 'selected' : ''}`} onClick={handleRadioChange}>
            <label>{option.label}</label>
            <div className={`radio-dot ${isSelected ? 'selected' : ''}`}></div>
        </div>
    );
};




// FormField component
const FormField = ({ field, onChange, value }) => {
    const handleChange = (e) => {
        onChange(field.name, e.target.value);
      };

    const handleOptionChange = (name, value) => {
        onChange(name, value);
      };

    const [filesToUpload, setFilesToUpload] = useState([]);

    switch (field.type) {
        case 'imageUpload':
            return <ImageUpload setFilesToUpload={setFilesToUpload} />;
        case 'text':
        case 'number':
        case 'tel':
            return (
                <>
                    <label htmlFor={`${field.id}-input`}>{field.label}</label>
                    <input
                        className={field.className}
                        type={field.type}
                        name={field.name}
                        placeholder={field.placeholder}
                        required={field.required}
                        onChange={handleOptionChange}
                    />
                </>
            );
            case 'select':
                return (
                  <>
                    <label htmlFor={`${field.id}-input`}>{field.label}</label>
                    <CustomDropdown
                      options={field.options}
                      fieldName={field.name}
                      handleChange={handleChange}
                      selectedValue={value}
                    />
                  </>
                );
        case 'textarea':
            return (
                <div>
                    <label>{field.label}</label>
                <textarea
                    name={field.name}
                    placeholder={field.placeholder}
                    required={field.required}
                    onChange={handleChange}
                />
                </div>
            );
        case 'radio':
            return (
                <div className="radio-buttons-group">
                    {field.options.map((option, index) => (
                        <CustomRadioButton
                            key={index}
                            option={option}
                            fieldName={field.name}
                            handleChange={onChange}
                            isSelected={value === option.value}
                        />
                    ))}
                </div>
            );
        case 'checkbox':
            return (
                <label>
                    <input
                        type="checkbox"
                        name={field.name}
                        required={field.required}
                        onChange={handleChange}
                    />
                    {field.label}
                </label>
            );
        default:
            return null;
    }
};

// DynamicForm component
const DynamicForm = () => {
    const [formStructure, setFormStructure] = useState(null);
    const [formData, setFormData] = useState({});
    const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
    const currentUrl = window.location.href;

    let isHost = currentUrl.endsWith('/addProduct');
    let isHelp = currentUrl.endsWith('/addPost');

    useEffect(() => {
        const fetchFormStructure = async () => {
            try {
                let response = null;
                if (isHost) {
                    response = await fetch(`${API_BASE_URL}/getProductForm`);
                }
                if (isHelp) {
                    response = await fetch(`${API_BASE_URL}/getPostForm`);
                }

                const result = await response.json();
                if (result && result.formData) {
                    setFormStructure(result.formData.form);
                    const initialState = {};
                    result.formData.form.sections.forEach(section => {
                        section.fields.forEach(field => {
                            initialState[field.name] = '';
                        });
                    });
                    setFormData(initialState);
                } else {
                    console.error('Invalid form data structure:', result);
                }
            } catch (error) {
                console.error('Error fetching form data:', error);
            }
        };

        fetchFormStructure();
    }, [isHost, isHelp]);

    // const handleInputChange = (name, value) => {
    //     setFormData(prevFormData => ({
    //         ...prevFormData,
    //         [name]: value,
    //     }));
    // };
    const handleInputChange = (name, value) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_BASE_URL}/submit-form`, formData, {
                headers: { Authorization: `Bearer ${authToken}` },
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    if (!formStructure) {
        return <div>Loading form data...</div>;
    }

    return (
        <form onSubmit={handleSubmit}>
            {formStructure.sections.map((section, index) => (
                <div className='form-div' key={index}>
                    <label>{section.fields.title}</label>
                    {section.fields.map((field, fieldIndex) => (
                        <FormField
                            key={fieldIndex}
                            field={field}
                            onChange={handleInputChange}
                            value={formData[field.name]}
                        />
                    ))}
                </div>
            ))}
            {formStructure.agreement && (
            <div>
                <FormField
                    field={formStructure.agreement}
                    onChange={handleInputChange}
                    value={formData[formStructure.agreement.name]}
                    />
                <button type="submit">{formStructure.submit.text}</button>
            </div>
                )}
        </form>
    );
};

export default DynamicForm;
