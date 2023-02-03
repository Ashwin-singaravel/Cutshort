import mongoose from 'mongoose';
import Todos from 'src/model/v1/todos';
import { Todo } from 'src/types';

export const createTodo = async (body: Todo, userId: string) => {

    if (body.title == undefined || body.title.length == 0) {
        throw 1002;
    }

    const todo: any = (await Todos.createTodo({
        ...body,
        user_id: userId
    })).toObject();

    delete todo.__v;
    delete todo.updated_at;    

    return todo;
}

export const updateTodo = async (body: Todo, userId: string, _id: string) => {

    if (body.title == undefined || body.title.length == 0 || !mongoose.isValidObjectId(_id)) {
        throw 1002;
    }

    const update = await Todos.updateTodo({
        ...body,
        user_id: userId,
        _id: _id
    })

    if (update.nModified < 1) {
        throw await Todos.findById(_id) ? 1305 :  1304;
    }


}