import axios from 'axios'
import httpFunction from '../index'
import context from './defaultContext'

jest.mock('axios')

test('teste', async () => {
    const request = {
        query: { name: 'Bill' }
    };

    //@ts-ignore
    axios.post.mockImplementation(() => Promise.resolve({ status: 200, data: {} }))

    await httpFunction(context, request);

    expect(context.res.body).toEqual("Hello, Bill. This HTTP triggered function executed successfully.");
})