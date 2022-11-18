export type FormProps = {
    onSubmit: (title: string) => void;
    error: boolean
}

export type ListProps = {
    todos: TodoProps[]
}

export type TodoProps = {
    id: number,
    title: string,
    createdAt: number,
    onDelete?: (id: number) => void;
    onEdit?: (id: number, newTitle: string) => void;
}
