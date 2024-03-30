import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function SearchBar({ filterText, onFilterTextChange, className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();
    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <input
            {...props}
            type="text"
            value={filterText}
            placeholder="Search..."
            onChange={(e) => onFilterTextChange(e.target.value)}
            className={
                'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' +
                className
            }
            ref={input}
        />
    );
});
