import TodoController from "./todos";
import PostsController from "./posts";
import CommentsController from "./comments";

const authRoutesV1 = [
    TodoController,
    PostsController,
    CommentsController
];

export default authRoutesV1;