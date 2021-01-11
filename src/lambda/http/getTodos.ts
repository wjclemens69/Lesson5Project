import 'source-map-support/register'
import * as AWS from 'aws-sdk'





import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'

const todoClient = new AWS.DynamoDB.DocumentClient()
const todotablename = process.env.TODOS_TABLE


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // TODO: Get all TODO items for a current user

    console.log("processing get todos request..", event)



    const result = await todoClient.scan({ TableName: todotablename }).promise()
    const items = result.Items
    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ items })

    }






}
