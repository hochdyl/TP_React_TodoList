import React, {useState} from "react";
import {TodoProps} from "../types";

const Todo: React.FC<TodoProps> = (props) => {
    const {id, title, onDelete, onEdit} = props
    const [isInEdit, setInEdit] = useState<boolean>(false)
    const [newTitle, setNewTitle] = useState<string>(title)

    return (
        <div className="todo rounded-container">
            {isInEdit ?
                <input type="text" value={newTitle} onChange={e => setNewTitle(e.target.value)}/>
                :
                <h1>{title}</h1>
            }

            <div>
                <button
                    type="button"
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
                >{isInEdit ? "Valider" : "Modifier"}</button>

                <button
                    type="button"
                    onClick={() => {
                        if (onDelete) onDelete(id)
                    }}
                >Supprimer</button>
            </div>
        </div>
    )
}

export default Todo