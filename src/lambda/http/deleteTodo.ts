import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import * as AWS from 'aws-sdk'

const todoClient = new AWS.DynamoDB.DocumentClient()

const todotablename = process.env.TODOS_TABLE

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todoId = event.pathParameters.todoId
    const createdAt = event.pathParameters.createdAt

    console.log("Trying to delete ", todoId)

    const deleteTodo = await todoClient.delete({
        TableName: todotablename,
        Key: { todoId: todoId, createdAt: createdAt }
    }).promise()


    return {
        statusCode: 201,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(deleteTodo)




    }
}
