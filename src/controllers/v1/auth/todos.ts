import { Body, JsonController, Post, Res, Req, Put, Param } from "routing-controllers";
import { Response, Request } from 'src/types/express';
import { apiResponse } from "src/helpers/api-response";
import { Todo } from "src/types";
import { createTodo, updateTodo } from "src/services/v1/todos"

@JsonController('/todo')
export default class TodoController {

    @Post('/')
    public async createTodo(@Req() req: Request, @Res() res: Response, @Body() body: Todo) {
        try {
            const todo = await createTodo(body, req.authorization.userIdentifier);
            return apiResponse(res, 200, 1300, todo);
        } catch (error) {
            return apiResponse(res, 500, 1301, error);
        }
    }

    @Put('/:_id')
    public async updateTodo(@Req() req: Request, @Res() res: Response, @Body() body: Todo, @Param('_id') _id: string) {
        try {
            const todo = await updateTodo(body, req.authorization.userIdentifier, _id);
            return apiResponse(res, 200, 1302, todo);
        } catch (error) {
            return apiResponse(res, 500, 1303, error);
        }
    }

}