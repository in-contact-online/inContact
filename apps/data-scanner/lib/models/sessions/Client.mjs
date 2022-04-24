export class Client {
    constructor(session, config) {
        console.log(session, config)
    }

    async init() {

    }

}
// const sessions = [1,2,3,4];

// const res = await sessions.reduce(async (memo, session) => {
//     const acc = await memo;
//     await Promise.resolve({});
//     console.log(session);
//     acc[session] = { sessionId: session };
//     return acc;
// }, Promise.resolve({}));
