import { Body, JsonController, Post, Res, Req, Put, Param, Delete, Get, QueryParams } from "routing-controllers";
import { Response, Request } from 'src/types/express';
import { apiResponse } from "src/helpers/api-response";
import { ListPosts, Post as Tpost } from "src/types/controllers/v1/posts";
import { createPost, deletePost, listPosts, readPost, updatePost } from "src/services/v1/posts";

@JsonController('/post')
export default class PostsController {

    @Post('/')
    public async createPost(@Req() req: Request, @Res() res: Response, @Body() body: Tpost) {
        try {
            const post = await createPost(body, req.authorization.userIdentifier);
            return apiResponse(res, 200, 1400, post);
        } catch (error) {
            return apiResponse(res, 500, 1401, error);
        }
    }

    @Get('/:_id')
    public async readPost(@Res() res: Response, @Param('_id') _id: string) {
        try {
            const post = await readPost(_id);
            return apiResponse(res, 200, 1409, post);
        } catch (error) {
            return apiResponse(res, 500, 1410, error);
        }
    }

    @Get('/')
    public async listPosts(@Res() res: Response, @QueryParams() params: ListPosts) {
        try {
            const list = await listPosts(params)
            return apiResponse(res, 200, 1411, list)
        } catch (error) {
            return apiResponse(res, 500, 1412, error)
        }
    }

    @Put('/:_id')
    public async updatePost(@Req() req: Request, @Res() res: Response, @Body() body: Tpost, @Param('_id') _id: string) {
        try {
            const post = await updatePost(body, req.authorization.userIdentifier, _id);
            return apiResponse(res, 200, 1402, post);
        } catch (error) {
            return apiResponse(res, 500, 1403, error);
        }
    }

    @Delete('/:_id')
    public async deletePost(@Req() req: Request, @Res() res: Response, @Param('_id') _id: string) {
        try {
            const post = await deletePost(_id, req.authorization.userIdentifier);
            return apiResponse(res, 200, 1406, post);
        } catch (error) {
            return apiResponse(res, 500, 1407, error);
        }
    }
}