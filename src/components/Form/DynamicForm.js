import React, { useState, useEffect, useCallback, useMemo } from "react";

const DynamicForm = () => {
    const [formData, setFormData] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [dynamicOptions, setDynamicOptions] = useState(null)
    const SELECT_FIELDS = useMemo(()=>["dynamic", "select"],[]);

    useEffect(() => {
        // Fetch the JSON object from the server, replace the URL with your own endpoint
        fetch("/forms/form1.json")
            .then((response) => response.json())
            .then((data) => setFormData(data));
    }, []);


    const findSelect = useCallback((fields) => {
        console.log(fields)
        if(!fields) return []
        return fields.filter(field => SELECT_FIELDS.includes(field.type));
    },[SELECT_FIELDS])



    const fetchOption = useCallback((field) => {
        if (field.optionUrl !== "") {
            console.log(field.optionUrl)
            fetch(`${field.optionUrl}`)
                .then((response) => response.json())
                .then((data) => setDynamicOptions({ ...dynamicOptions, ...{ [field.name]: data } }));
        }
    },[])


    useEffect(() => {
        // fetch select options from db
        //find select in form data
        if (formData!==null) {
            const fields = findSelect(formData.fields); 
            fields.map(field => {
                if (field.type === 'dynamic') {
                   return field.dynamicData.map(dynamicFields=>{
                        let innerFields = findSelect(dynamicFields.fields);
                        console.log({innerFields})
                       return innerFields.map(f => fetchOption(f))
                    }) 
                } else {
                   return fetchOption(field)
                }
            })
        }
    }, [formData,fetchOption, findSelect])

 

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };
    const renderField = (field) => {
        switch (field.type) {
            case "text":
                return (
                    <div className="form-group">
                        <label htmlFor={field.name}>{field.label}</label>
                        <input
                            type="text"
                            id={field.name}
                            name={field.name}
                            className="form-control"
                        />
                    </div>
                );
            case "date":
                return (
                    <div className="form-group">
                        <label htmlFor={field.name}>{field.label}</label>
                        <input
                            type="date"
                            id={field.name}
                            name={field.name}
                            className="form-control"
                        />
                    </div>
                );
            case "select":
                return (
                    <div className="form-group">
                        <label htmlFor={field.name}>{field.label}</label>
                        <select
                            id={field.name}
                            name={field.name}
                            className="form-control"
                            onChange={handleOptionChange}
                        >
                            <option value="">-- Select an option --</option>
                            {field.options.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                );
            case "radio":
                return (
                    <div className="form-group">
                        <label>{field.label}</label>
                        {field.options.map((option) => (
                            <div key={option.value} className="form-check">
                                <input
                                    type="radio"
                                    id={option.value}
                                    name={field.name}
                                    value={option.value}
                                    className="form-check-input"
                                />
                                <label htmlFor={option.value} className="form-check-label">
                                    {option.label}
                                </label>
                            </div>
                        ))}
                    </div>
                );

            case "dynamic":
                // Render additional fields based on the selected option
                const selectedOptionData = field.dynamicData.find(
                    (optionData) => optionData.name === selectedOption
                );
                if (selectedOptionData) {
                    return selectedOptionData.fields.map((subField, index) =>
                        <React.Fragment key={index}>
                            {renderField(subField)}
                        </React.Fragment>
                    );
                } else {
                    return null;
                }
            default:
                return null;
        }
    };
    return (
        <form>
            {formData &&
                formData.fields.map((field, index) => (
                    <React.Fragment key={index}>
                        {renderField(field)}
                    </React.Fragment>
                ))}
        </form>
    );
};

export default DynamicForm;
