import React, {FormEvent, useState} from "react";
import {FormProps} from "../types";

const Form: React.FC<FormProps> = (props) => {
    const {onSubmit} = props
    const [title, setTitle] = useState<string>("")

    return (
        <form className="form rounded-container" onSubmit={(e: FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            onSubmit(title)
        }}>
            <input
                type="text"
                name="title"
                onChange={(e) => setTitle(e.target.value)}
            />
            <input type="submit" />
        </form>
    )
}

export default Form