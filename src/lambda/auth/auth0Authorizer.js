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
var jsonwebtoken_1 = require("jsonwebtoken");
//import { createLogger } from '../../utils/logger'
var axios_1 = require("axios");
//const logger = createLogger('auth')
// TODO: Provide a URL that can be used to download a certificate that can be used
// to verify JWT token signature.
// To get this URL you need to go to an Auth0 page -> Show Advanced Settings -> Endpoints -> JSON Web Key Set
var jwksUrl = 'https://dev--0p77835.us.auth0.com/.well-known/jwks.json';
exports.handler = function (event) { return __awaiter(_this, void 0, void 0, function () {
    var jwtToken, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                //logger.info('Authorizing a user', event.authorizationToken)
                console.log('Authorizing User ', event.authorizationToken);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, verifyToken(event.authorizationToken)
                    //logger.info('User was authorized', jwtToken)
                ];
            case 2:
                jwtToken = _a.sent();
                //logger.info('User was authorized', jwtToken)
                return [2 /*return*/, {
                        principalId: jwtToken.sub,
                        policyDocument: {
                            Version: '2012-10-17',
                            Statement: [
                                {
                                    Action: 'execute-api:Invoke',
                                    Effect: 'Allow',
                                    Resource: '*'
                                }
                            ]
                        }
                    }];
            case 3:
                e_1 = _a.sent();
                //        logger.error('User not authorized', { error: e.message })
                return [2 /*return*/, {
                        principalId: 'user',
                        policyDocument: {
                            Version: '2012-10-17',
                            Statement: [
                                {
                                    Action: 'execute-api:Invoke',
                                    Effect: 'Deny',
                                    Resource: '*'
                                }
                            ]
                        }
                    }];
            case 4: return [2 /*return*/];
        }
    });
}); };
function verifyToken(authHeader) {
    return __awaiter(this, void 0, void 0, function () {
        var token, jwt, response, responseData, signingKey;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    token = getToken(authHeader);
                    jwt = jsonwebtoken_1.decode(token, { complete: true });
                    return [4 /*yield*/, axios_1.default(jwksUrl)];
                case 1:
                    response = _a.sent();
                    responseData = response.data;
                    signingKey = responseData['keys'].find(function (key) { return key['kid'] === jwt['header']['kid']; });
                    if (!signingKey) {
                        throw new Error('Invalid Signing key');
                    }
                    //return verify(token, jwkToPem(signingKey), { algorithms: ['RS256'] }) as JwtPayload;
                    return [2 /*return*/, jsonwebtoken_1.verify(token, signingKey, { algorithms: ['RS256'] })];
            }
        });
    });
}
//async function verifyToken(authHeader: string,certifcate: string): Promise<JwtPayload> {
//    const token = getToken(authHeader)
//    const jwt: Jwt = decode(token, { complete: true }) as Jwt
//    //return jwt
//    //return verify(token, secret) as Jwt
//    return verify(token, certifcate, { algorithms: ['RS256'] }) as JwtToken
//    // TODO: Implement token verification
//    // You should implement it similarly to how it was implemented for the exercise for the lesson 5
//    // You can read more about how to do this here: https://auth0.com/blog/navigating-rs256-and-jwks/
//    return undefined
//}
function getToken(authHeader) {
    if (!authHeader)
        throw new Error('No authentication header');
    if (!authHeader.toLowerCase().startsWith('bearer '))
        throw new Error('Invalid authentication header');
    var split = authHeader.split(' ');
    var token = split[1];
    return token;
}
//# sourceMappingURL=auth0Authorizer.js.map