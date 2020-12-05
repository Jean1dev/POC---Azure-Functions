import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import httpFunction from '../index'
import context from './defaultContext'

test('teste', async () => {
    const request = {
        query: { name: 'Bill' }
    };

    let mock = new MockAdapter(axios)
    mock.onPost('URL', 'teste')
        .reply(200)

    await httpFunction(context, request);

//    expect(context.log.mock.calls.length).toBe(1);
    expect(context.res.body).toEqual("Hello, Bill. This HTTP triggered function executed successfully.");
})