import React from 'react'

const TostMessage = ({ alertClass, message, color }) => {
    return (
        <div className="toast toast-top toast-center">
            <div className={`alert ${alertClass} ${color === "error" ? "text-red-500" : "text-green-500"}`}>
                <span>{message}</span>
            </div>
        </div>
    )
}

export default TostMessage