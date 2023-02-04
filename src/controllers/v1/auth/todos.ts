import { Body, JsonController, Post, Res, Req, Put, Param, Delete, Get, QueryParams } from "routing-controllers";
import { Response, Request } from 'src/types/express';
import { apiResponse } from "src/helpers/api-response";
import { ListTodos, Todo } from "src/types";
import { createTodo, deleteTodo, listTodos, readTodo, updateTodo } from "src/services/v1/todos"

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

    @Get('/:_id')
    public async readTodo(@Res() res: Response, @Param('_id') _id: string) {
        try {
            const todo = await readTodo(_id);
            return apiResponse(res, 200, 1309, todo);
        } catch (error) {
            return apiResponse(res, 500, 1310, error);
        }
    }

    @Get('/')
    public async listTodos(@Res() res: Response, @QueryParams() params: ListTodos) {
        try {
            const list = await listTodos(params)
            return apiResponse(res, 200, 1311, list)
        } catch (error) {
            return apiResponse(res, 500, 1312, error)
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

    @Delete('/:_id')
    public async deleteTodo(@Req() req: Request, @Res() res: Response, @Param('_id') _id: string) {
        try {
            const todo = await deleteTodo(_id, req.authorization.userIdentifier);
            return apiResponse(res, 200, 1306, todo);
        } catch (error) {
            return apiResponse(res, 500, 1307, error);
        }
    }

}