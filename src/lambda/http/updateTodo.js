"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register");
var AWS = require("aws-sdk");
var todoClient = new AWS.DynamoDB.DocumentClient();
var todotablename = process.env.TODOS_TABLE;
//todoId: '57248dec-222e-40a4-8f17-6eb33b853ab8', createdAt: '1610301046624' }
exports.handler = function (event) { return __awaiter(_this, void 0, void 0, function () {
    var todoId, createdAt, key, params;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                todoId = "57248dec-222e-40a4-8f17-6eb33b853ab8";
                createdAt = "1610301046624";
                key = {
                    todoId: todoId,
                    createdAt: createdAt
                };
                params = {
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
                return [4 /*yield*/, todoClient.update(params).promise()];
            case 1:
                _a.sent();
                return [2 /*return*/, {
                        statusCode: 201,
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify("whaa?")
                    }];
        }
    });
}); };
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
//# sourceMappingURL=updateTodo.js.map