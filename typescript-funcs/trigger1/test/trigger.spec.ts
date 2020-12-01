import httpFunction from '../index'
import context from './defaultContext'

test('teste', async () => {
    const request = {
        query: { name: 'Bill' }
    };

    await httpFunction(context, request);

//    expect(context.log.mock.calls.length).toBe(1);
    expect(context.res.body).toEqual("Hello, Bill. This HTTP triggered function executed successfully.");
})