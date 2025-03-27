import React from "react";

const ButtonThree = ({ children, className, onClick }) => {
    return (
        <button className={`${className} inline-flex items-center justify-center gap-2 rounded-md bg-primary py-2 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10`} onClick={onClick}>
            {children}
        </button>
    );
};

export default ButtonThree;
