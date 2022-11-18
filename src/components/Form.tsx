import React, {FormEvent, useState} from "react";
import {FormProps} from "../types";
import {FaLock, FaPlus} from "react-icons/fa";

const Form: React.FC<FormProps> = (props) => {
    const {onSubmit, error} = props
    const [title, setTitle] = useState<string>("")

    return (
        <form className="form rounded-container" onSubmit={(e: FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            if (title.length > 0) {
                onSubmit(title)
            }
        }}>
            <input
                type="text"
                className={`text-input ${error && "error"}`}
                onChange={(e) => setTitle(e.target.value)}
            />
            <button className={`button ${title.length > 0 ? "add" : "locked"}`} type="submit">
                {title.length > 0 ?
                    <FaPlus color="#fff" />
                    :
                    <FaLock color="#fff" />
                }
            </button>
        </form>
    )
}

export default Form