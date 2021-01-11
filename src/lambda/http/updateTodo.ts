import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import * as AWS from 'aws-sdk'

const todoClient = new AWS.DynamoDB.DocumentClient()

const todotablename = process.env.TODOS_TABLE
//todoId: '57248dec-222e-40a4-8f17-6eb33b853ab8', createdAt: '1610301046624' }






export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    const todoId = "57248dec-222e-40a4-8f17-6eb33b853ab8"

    const createdAt = "1610301046624"

    const key = {
        todoId: todoId,
        createdAt: createdAt
    }



    var params = {
        TableName: todotablename,
        Key: key,

        UpdateExpression: "set #done = :done",
        ExpressionAttributeNames: {
            "#done": "done"
        },

        ExpressionAttributeValues: {
            ":done": 'false'
        },
        ReturnValues: "UPDATED_NEW"
    };


   
    await todoClient.update(params).promise();

    return {
        statusCode: 201,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify("whaa?")

    }
}







//async function updateTodo(todo: TodoUpdate, todoId: string, userId: string) {
//    console.log(`Updating a todo with id ${todoId} and userid ${userId}`);
//    const params = {
//        TableName: this.todosTable,
//        Key: {
//            userId: userId,
//            todoId: todoId
//        },
//        ExpressionAttributeNames: {
//            '#todo_name': 'name',
//        },
//        ExpressionAttributeValues: {
//            ':name': todo.name,
//            ':dueDate': todo.dueDate,
//            ':done': todo.done,
//        },
//        UpdateExpression: 'SET #todo_name = :name, dueDate = :dueDate, done = :done',
//        ReturnValues: 'ALL_NEW',
//    };
//    const result = await this.docClient.update(params).promise();
//    console.log(`Update statement has completed without error`, result);
//    return result.Attributes as Todo;
//}
