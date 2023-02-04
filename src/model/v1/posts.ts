import mongoose, { Schema, Model, Document, UpdateWriteOpResult } from 'mongoose';
import { pagination } from 'src/helpers/pagination';
import { createdBy } from 'src/helpers';
import { CreatePost, ListPosts, UpdatePost } from 'src/types/controllers/v1/posts';

export interface PostDocument extends Document {
    _id: mongoose.Types.ObjectId;
    user_id: mongoose.Types.ObjectId;
    title: string;
    updated_at?: Date;
}

export interface PostsModel extends Model<PostDocument> {
    creatPost(post: CreatePost): Promise<PostDocument>;
    updatePost(post: UpdatePost): Promise<UpdateWriteOpResult>;
    readPost(_id: string): Promise<PostDocument[]>;
    listPosts(listParams: ListPosts): Promise<PostDocument[]>;
}

const PostSchema: Schema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId
    },
    title: {
        type: String
    },
    updated_at: {
        type: Date
    },
})

PostSchema.statics.creatPost = async function (post: CreatePost) {
    return (new this({
        ...post,
        updated_at: new Date()
    })).save();
}

PostSchema.statics.updatePost = async function (post: UpdatePost) {
    return this.updateOne({
        _id: post._id,
        user_id: post.user_id
    }, {
        ...post,
        updated_at: new Date()
    });
}

PostSchema.statics.readPost = async function (_id: string) {
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

PostSchema.statics.listPosts = async function (listParams: ListPosts) {

    const options = [];
    const afPipeline = [];

    const match: any = {};

    if (listParams.search) {
        match.title = {
            $regex: listParams.search,
            $options: '$i'
        }
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

    return pagination<PostDocument, PostsModel>(
        this as any,
        options,
        afPipeline,
        Number(listParams.page),
        Number(listParams.limit)
    )
}

export default mongoose.model<PostDocument, PostsModel>('Posts', PostSchema, 'posts');