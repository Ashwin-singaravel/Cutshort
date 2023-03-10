import mongoose, { Schema, Model, Document, UpdateWriteOpResult } from 'mongoose';
import { pagination } from 'src/helpers/pagination';
import { createdBy } from 'src/helpers';
import { CreateTodo, ListTodos, UpdateTodo } from 'src/types/controllers/v1/todos';

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
    readTodo(_id: string): Promise<TodoDocument[]>;
    listTodos(listParams: ListTodos): Promise<TodoDocument[]>;
}

const TodoSchema: Schema = new Schema({
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

TodoSchema.statics.createTodo = async function (todo: CreateTodo) {
    return (new this({
        ...todo,
        updated_at: new Date()
    })).save();
}

TodoSchema.statics.updateTodo = async function (todo: UpdateTodo) {
    return this.updateOne({
        _id: todo._id,
        user_id: todo.user_id
    }, {
        ...todo,
        updated_at: new Date()
    });
}

TodoSchema.statics.readTodo = async function (_id: string) {
    const options = [];

    options.push({
        $match: {
            _id: mongoose.Types.ObjectId(_id)
        }
    })

    options.push({
        $project: {
            title: 1,
            completed: 1,
            user_id: 1
        }
    })

    options.push(...createdBy('user_id'));

    return this.aggregate(options);
}

TodoSchema.statics.listTodos = async function (listParams: ListTodos) {

    const options = [];
    const afPipeline = [];

    const match: any = {};

    if (listParams.search) {
        match.title = {
            $regex: listParams.search,
            $options: '$i'
        }
    }

    if (listParams.completed != undefined) {
        match.completed = listParams.completed
    }

    if (listParams.created_by && mongoose.isValidObjectId(listParams.created_by)) {
        match.user_id = mongoose.Types.ObjectId(listParams.created_by)
    }

    if (Object.keys(match).length > 0) {
        options.push({
            $match: match
        })
    }
  
    afPipeline.push({
        $project: {
            title: 1,
            completed: 1,
            created_by: '$user_id'
        }
    })

    afPipeline.push(...createdBy('created_by'));

    return pagination<TodoDocument, TodoModel>(
        this as any,
        options,
        afPipeline,
        Number(listParams.page),
        Number(listParams.limit)
    )
}

export default mongoose.model<TodoDocument, TodoModel>('Todo', TodoSchema, 'todos');