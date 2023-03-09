import React from 'react'
import { Button } from "react-bootstrap"
export default function PrimaryButton({
    onClick,
    title,
    variant = "primary",
    style ={},
    disabled = false}) {
    return (
        <Button variant={variant}
            onClick={onClick}
            style={style}
            disabled={disabled}
        >
            {title}
        </Button>
    )
}
