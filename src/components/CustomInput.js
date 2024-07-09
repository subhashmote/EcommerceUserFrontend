import React from 'react'

function CustomInput(props) {
    const {type,name,placeholder,className,value,onChange,onBlur,disabled} = props;
    return (
        <div>
            <input 
                className={className}
                name={name}
                placeholder={placeholder}
                type={type}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                disabled={disabled}
            ></input>
        </div>
    )
}

export default CustomInput