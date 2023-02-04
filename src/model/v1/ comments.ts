import mongoose, { Schema, Model, Document, UpdateWriteOpResult } from 'mongoose';
import { pagination } from 'src/helpers';
import { createdBy } from 'src/helpers/models';
// import { pagination } from 'src/helpers/pagination';
import { CreateComment, ListComments, UpdateComment } from 'src/types';

export interface CommentDocument extends Document {
    _id: mongoose.Types.ObjectId;
    user_id: mongoose.Types.ObjectId;
    post_id: mongoose.Types.ObjectId;
    comment: string;
    updated_at?: Date;
}

export interface CommentsModel extends Model<CommentDocument> {
    createComment(comment: CreateComment): Promise<CommentDocument>;
    updateComment(comment: UpdateComment): Promise<UpdateWriteOpResult>;
    readComment(_id: string): Promise<CommentDocument[]>;
    listComments(listParams: ListComments): Promise<CommentDocument[]>;
}


const CommentSchema: Schema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId
    },
    post_id: {
        type: Schema.Types.ObjectId
    },
    comment: {
        type: String
    },
    updated_at: {
        type: Date
    },
})

CommentSchema.statics.createComment = async function(comment: CreateComment) {
    return (new this({
        ...comment,
        updated_at: new Date()
    })).save();
}

CommentSchema.statics.updateComment = async function(comment: UpdateComment) {
    return this.updateOne({
        _id: comment._id,
        user_id: comment.user_id
    }, {
        ...comment,
        updated_at: new Date()
    });
}

CommentSchema.statics.readComment = async function(_id: string) {
    const options = [];

    options.push({
        $match: {
            _id: mongoose.Types.ObjectId(_id)
        }
    })

    options.push({
        $project: {
            comment: 1,
            post_id: 1,
            user_id: 1
        }
    })

    options.push(...createdBy('user_id'));

    return this.aggregate(options);
}

CommentSchema.statics.listComments = async function (listParams: ListComments) {

    const options = [];
    const afPipeline = [];

    const match: any = {};

    if (listParams.search) {
        match.comment = {
            $regex: listParams.search,
            $options: '$i'
        }
    }
    
    if (listParams.post_id && mongoose.isValidObjectId(listParams.post_id)) {
        match.post_id = mongoose.Types.ObjectId(listParams.post_id)
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
            comment: 1,
            completed: 1,
            user_id: 1
        }
    })

    afPipeline.push(...createdBy('user_id'));

    return pagination<CommentDocument, CommentsModel>(
        this as any,
        options,
        afPipeline,
        Number(listParams.page),
        Number(listParams.limit)
    )
}

export default mongoose.model<CommentDocument, CommentsModel>('Comments', CommentSchema, 'comments');