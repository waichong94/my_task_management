import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextArea({ cols = '50', rows = '4', className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();
    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <textarea
            {...props}
            cols={cols}
            rows={rows}
            className={
                'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' +
                className
            }
            ref={input}
        />
    );
});
