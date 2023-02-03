import mongoose, { Schema, Model, Document, UpdateWriteOpResult } from 'mongoose';
import { CreateTodo, UpdateTodo } from 'src/types/controllers/v1/todos';

export interface TodoDocument extends Document {
    _id: mongoose.Types.ObjectId;
    user_id: mongoose.Types.ObjectId;
    title: string;
    completed: boolean;
    updated_at?: Date;
}

export interface TodoModel extends Model<TodoDocument> {
    createTodo(todo: CreateTodo): Promise<TodoDocument>;
    updateTodo(todo: UpdateTodo): Promise<UpdateWriteOpResult>;
}

const TodoSchema : Schema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId
    },
    title: {
        type: String
    },
    completed: {
        type: Boolean,
        default: false
    },
    updated_at: {
        type: Date
    },
})

TodoSchema.statics.createTodo = async function(todo: CreateTodo) {
    return (new this({
        ...todo,
        updated_at: new Date()
    })).save();
}

TodoSchema.statics.updateTodo = async function(todo: UpdateTodo) {
    return this.updateOne({
        _id: todo._id,
        user_id: todo.user_id
    }, {
        ...todo,
        updated_at: new Date()
    });
}

export default mongoose.model<TodoDocument, TodoModel>('Todo', TodoSchema, 'todos');