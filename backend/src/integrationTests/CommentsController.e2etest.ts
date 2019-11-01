require('dotenv').config();
import io from 'socket.io-client';
import http, { Server } from 'http';
import ioBackend, { Server as IoServer } from 'socket.io';
import { AddressInfo } from 'net';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { usersSeed, articlesSeed } from './../testSetup/commentServiceSeed';
import { UserModel } from './../models/User/UserModel';
import CommentsController, {
    events,
    RoomUser,
    STREAM_NAME
} from './../controllers/Comments/CommentsController';
import { expect } from 'chai';
import { userService, commentService, articleService } from './../setup/container';
import forEach from 'mocha-each';
import { ArticleModel } from './../models/Article/ArticleModel';

let socket: SocketIOClient.Socket;
let httpServer: Server;
let httpServerAddr: AddressInfo;
let ioServer: IoServer;
let mongoServer: MongoMemoryServer;

const closeServers = (done: Function) => {
    mongoose.disconnect();
    mongoServer.stop();
    ioServer.close();
    httpServer.close();
    done();
};

const closeSocket = (done: Function) => {
    if (socket.connected) {
        socket.disconnect();
    }
    done();
};

const beforeFn = async (userId: string) => {
    mongoServer = new MongoMemoryServer();
    const url = await mongoServer.getConnectionString();
    mongoose.connect(url, { useNewUrlParser: true });
    await UserModel.insertMany(usersSeed);
    await ArticleModel.insertMany(articlesSeed);

    httpServer = http.createServer().listen();
    httpServerAddr = httpServer.address() as AddressInfo;
    ioServer = ioBackend(httpServer);

    ioServer.use((socket, next) => {
        socket.request.session = {
            passport: {
                user: userId
            }
        };

        next();
    });

    const commentsController = new CommentsController(
        ioServer,
        userService,
        commentService,
        articleService
    );
};

describe('Comments controller When user have active session and active account', () => {
    before(async () => {
        await beforeFn(usersSeed[0]._id);
    });

    after(closeServers);

    afterEach(closeSocket);

    it('should add user to room', done => {
        socket = io.connect(
            `http://[${httpServerAddr.address}]:${httpServerAddr.port}${STREAM_NAME}`,
            {
                query: {
                    articleId: '6d1a44b66970a011ed25ca0e'
                },
                reconnectionDelay: 0,
                forceNew: true,
                transports: ['websocket']
            }
        );
        socket.on(events.roomUpdate, (msg: RoomUser[]) => {
            const expectedUsers = [
                {
                    _id: '5d1a44b66970a011ed25ca0e',
                    name: 'myUser'
                }
            ];

            expect(msg).to.deep.equal(expectedUsers);
            done();
        });
    });

    it('should receive valid message sent to the room and add it to database', done => {
        socket = io.connect(
            `http://[${httpServerAddr.address}]:${httpServerAddr.port}${STREAM_NAME}`,
            {
                query: {
                    articleId: '6d1a44b66970a011ed25ca0e'
                },
                reconnectionDelay: 0,
                forceNew: true,
                transports: ['websocket']
            }
        );
        const message = 'My comment';
        const expectedMessage = {
            __v: 0,
            article: '6d1a44b66970a011ed25ca0e',
            author: {
                _id: '5d1a44b66970a011ed25ca0e',
                name: 'myUser'
            },
            content: 'My comment',
            isRemoved: false
        };
        socket.on(events.success, async (msg: any) => {
            expect(msg).to.deep.include(expectedMessage);
            const comments = await commentService.get('6d1a44b66970a011ed25ca0e');
            expect(comments).to.have.lengthOf(1);
            done();
        });

        socket.emit('message', message);
    });

    (forEach([
        ['some string'],
        [1],
        [undefined],
        [null],
        [true]
    ]) as any).describe('should not add user to room and disconnect', (articleId: any) => {
        it('when article Id is %s', done => {
            socket = io.connect(
                `http://[${httpServerAddr.address}]:${httpServerAddr.port}${STREAM_NAME}`,
                {
                    reconnectionDelay: 0,
                    forceNew: true,
                    transports: ['websocket'],
                    query: {
                        articleId
                    }
                }
            );
            socket.on(events.disconnect, (msg: RoomUser[]) => {
                expect(msg).to.deep.equal('io server disconnect');
                done();
            });

            afterEach(closeSocket);

            after(closeServers);
        });
    });

    it('when article Id has correct format but article does not exist should disconnect the user', done => {
        socket = io.connect(
            `http://[${httpServerAddr.address}]:${httpServerAddr.port}${STREAM_NAME}`,
            {
                reconnectionDelay: 0,
                forceNew: true,
                transports: ['websocket'],
                query: {
                    articleId: '5d1a44b66970a011ed25c000'
                }
            }
        );
        socket.on(events.disconnect, (msg: RoomUser[]) => {
            expect(msg).to.deep.equal('io server disconnect');
            done();
        });

        afterEach(closeSocket);

        after(closeServers);
    });
});


describe('Comments controller When user have active session and not active account', () => {
    before(async () => {
        await beforeFn(usersSeed[1]._id);
    });

    after(closeServers);

    afterEach(closeSocket);


    it('should disconnect the user', done => {
        socket = io.connect(
            `http://[${httpServerAddr.address}]:${httpServerAddr.port}${STREAM_NAME}`,
            {
                reconnectionDelay: 0,
                forceNew: true,
                transports: ['websocket'],
                query: {
                    articleId: '6d1a44b66970a011ed25ca0e'
                }
            }
        );
        socket.on(events.disconnect, (msg: RoomUser[]) => {
            expect(msg).to.deep.equal('io server disconnect');
            done();
        });

        afterEach(closeSocket);

        after(closeServers);
    });
});


describe('Comments controller When user have active session but account is removed', () => {
    before(async () => {
        await beforeFn('6d1a44b66970a011ed25ca0e');
    });

    after(closeServers);

    afterEach(closeSocket);


    it('should disconnect the user', done => {
        socket = io.connect(
            `http://[${httpServerAddr.address}]:${httpServerAddr.port}${STREAM_NAME}`,
            {
                reconnectionDelay: 0,
                forceNew: true,
                transports: ['websocket'],
                query: {
                    articleId: '6d1a44b66970a011ed25ca0e'
                }
            }
        );
        socket.on(events.disconnect, (msg: RoomUser[]) => {
            expect(msg).to.deep.equal('io server disconnect');
            done();
        });

        afterEach(closeSocket);

        after(closeServers);
    });
});