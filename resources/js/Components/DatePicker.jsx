import { forwardRef, useEffect, useRef } from 'react';
import Datepicker from "react-tailwindcss-datepicker";

export default forwardRef(function ({className = '', isFocused = false, ...props}, ref) {
    const input = ref ? ref : useRef();
    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <Datepicker
            {...props}
            className={className}
            inputId={props.id}
            value={props.value}
            onChange={(date) => props.onChange(date)}
        />
    );
});