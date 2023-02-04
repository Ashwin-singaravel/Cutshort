import { Body, JsonController, Post, Res, Req, Put, Param, Delete, Get, QueryParams } from "routing-controllers";
import { Response, Request } from 'src/types/express';
import { apiResponse } from "src/helpers/api-response";
import { createComment, deleteComment, listComments, readComment, updateComment } from "src/services/v1/comments";
import { Comment, ListComments } from "src/types";

@JsonController('/comment')
export default class CommentsController {
    
    @Post('/')
    public async createComment(@Req() req: Request, @Res() res: Response, @Body() body: Comment) {
        try {
            const comment = await createComment(body, req.authorization.userIdentifier);
            return apiResponse(res, 200, 1500, comment);
        } catch (error) {
            return apiResponse(res, 500, 1501, error);
        }
    }

    @Get('/:_id')
    public async readComment(@Res() res: Response, @Param('_id') _id: string) {
        try {
            const comment = await readComment(_id);
            return apiResponse(res, 200, 1509, comment);
        } catch (error) {
            return apiResponse(res, 500, 1510, error);
        }
    }

    @Get('/')
    public async listComments(@Res() res: Response, @QueryParams() params: ListComments) {
        try {
            const list = await listComments(params)
            return apiResponse(res, 200, 1511, list)
        } catch (error) {
            return apiResponse(res, 500, 1512, error)
        }
    }

    @Put('/:_id')
    public async updateComment(@Req() req: Request, @Res() res: Response, @Body() body: Comment, @Param('_id') _id: string) {
        try {
            const comment = await updateComment(body, req.authorization.userIdentifier, _id);
            return apiResponse(res, 200, 1502, comment);
        } catch (error) {
            return apiResponse(res, 500, 1503, error);
        }
    }

    @Delete('/:_id')
    public async deleteComment(@Req() req: Request, @Res() res: Response, @Param('_id') _id: string) {
        try {
            const comment = await deleteComment(_id, req.authorization.userIdentifier);
            return apiResponse(res, 200, 1506, comment);
        } catch (error) {
            return apiResponse(res, 500, 1507, error);
        }
    }
}