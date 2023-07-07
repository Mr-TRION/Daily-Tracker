import axios from "axios";
import { toast } from "react-toastify";
import cookie from "js-cookie";
import baseUrl from "./baseUrl";
import catchErrors from "./catchErrors";

export const Axios = axios.create({
    baseURL: `${baseUrl}/api/lists`,
    headers: { Authorization: cookie.get("token") }
});

const toastError = error => toast.error(catchErrors(error));

export const submitNewList = async(
    text,
    setLists,
    setNewList,
    setError
) => {
    try {
        const res = await Axios.post("/", { text });

        setLists(prev => [res.data, ...prev]);
        setNewList({ text: "" });
    } catch (error) {
        const errorMsg = catchErrors(error);
        setError(errorMsg);
    }
};



export const deleteList = async(listId, setLists) => {
    try {
        await Axios.delete(`/${listId}`);
        setLists(prev => prev.filter(list => list._id !== listId));
    } catch (error) {
        toastError(error);
    }
};

export const listUpdate = async(list, newList, setLoading, setError) => {
    try {
        const { text } = newList;

        console.log(text);

        await Axios.post(`/update/${list._id}`, {
            text
        });

        setLoading(false);
        window.location.reload();
    } catch (error) {
        setError(catchErrors(error));
        setLoading(false);
    }
}


export const todoUpdate = async(listId, todo, newText, setLoading, setError) => {
        try {
            const { text } = newText;
            console.log("id = " + listId);

            await Axios.post(`/update/${listId}/${todo._id}`, {
                text
            });

            setLoading(false);
            window.location.reload();
        } catch (error) {
            setError(catchErrors(error));
            setLoading(false);
        }
    }
    ////////////////////////////////////////////////////////

export const postTodo = async(listId, user, text, setTodo, setText) => {
    try {
        const res = await Axios.post(`/todo/${listId}`, { text });

        const newTodo = {
            _id: res.data,
            user,
            text,
            date: Date.now()
        };

        setTodo(prev => [newTodo, ...prev]);
        setText("");
    } catch (error) {
        toastError(error);
    }
};

export const deleteTodos = async(listId, todoId, setTodo) => {
    try {
        await Axios.delete(`/todo/${listId}/${todoId}`);
        setTodo(prev => prev.filter(todo => todo._id !== todoId));
    } catch (error) {
        toastError(error);
    }
};