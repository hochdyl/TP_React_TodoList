export type FormProps = {
    onSubmit: (title: string) => void;
}

export type ListProps = {
    todos: TodoProps[]
}

export type TodoProps = {
    id: number,
    title: string,
    onDelete?: (id: number) => void;
    onEdit?: (id: number, newTitle: string) => void;
}
