import React, {useState} from "react";
import {TodoProps} from "../types";
import {FaCheck, FaPen, FaTrash} from "react-icons/fa";

const Todo: React.FC<TodoProps> = (props) => {
    const {id, title, createdAt, onDelete, onEdit} = props
    const [isInEdit, setInEdit] = useState<boolean>(false)
    const [newTitle, setNewTitle] = useState<string>(title)

    const getDate = (createdAt: number) => {
        const date = new Date(createdAt)

        return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}
        ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    }

    return (
        <div className="todo">
            {isInEdit ?
                <input
                    type="text"
                    className="text-input"
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
                />
                :
                <div className="info">
                    <p>{title}</p>
                    <p className="created-at">{getDate(createdAt)}</p>
                </div>
            }

            <div className="actions">
                <button
                    type="button"
                    className={`button ${isInEdit ? 'submit' : 'edit'}`}
                    onClick={() => {
                        if (isInEdit) {
                            if (onEdit && newTitle.length > 0) {
                                onEdit(id, newTitle)
                                setInEdit(false)
                            }
                        } else {
                            setInEdit(true)
                        }
                    }}
                >{isInEdit ? <FaCheck color="#fff" /> : <FaPen color="#fff" />}</button>

                <button
                    type="button"
                    className="button delete"
                    onClick={() => {
                        if (onDelete) onDelete(id)
                    }}
                ><FaTrash color="#fff" /></button>
            </div>
        </div>
    )
}

export default Todo