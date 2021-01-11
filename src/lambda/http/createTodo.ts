import 'source-map-support/register'
import * as  uuid from 'uuid'
import * as AWS from 'aws-sdk'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

//import { CreateTodoRequest } from '../../requests/CreateTodoRequest'

const todoClient = new AWS.DynamoDB.DocumentClient()

const todotablename = process.env.TODOS_TABLE
const bucketName = process.env.TODOS_FILEBUCKET

const s3 = new AWS.S3({
    signatureVersion: 'v4'
})

let dateTimestamp = Date.now()





export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

   
    console.log('adding to do list ', event.body)

    const parsedToDo = JSON.parse(event.body)



    const itemid = uuid.v4()

    const newToDo = {
        todoId: itemid,
        createdAt: dateTimestamp.toString(),
        ...parsedToDo
    }

    await todoClient.put({
        TableName: todotablename,
        Item: newToDo

    }).promise()

    const url = getUploadUrl(itemid)





     return {
        statusCode: 201,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({ event, url })




    }
}


function getUploadUrl(imageId: string) {
    return s3.getSignedUrl('putObject', {
        Bucket: bucketName,
        Key: imageId,
        Expires: 300
    })
}



