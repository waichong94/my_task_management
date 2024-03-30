import { forwardRef, useEffect, useRef } from 'react';
import Select from 'react-select';

export default forwardRef(function MultiSelectInput({ className = '', isFocused = false, options = [], ...props }, ref) {
    const input = ref ? ref : useRef();
    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <Select
            {...props}
            isMulti
            className={
                'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' +
                className
            }
            ref={input}
            getOptionLabel={option => option.display}
            getOptionValue={option => option.id}
            options={options}
            value={options.filter(option => props.value.includes(option.id))}
            onChange={selectedOptions => props.onChange(selectedOptions.map(option => option.id))}
            isClearable={true}
        >
        </Select>
    );
});