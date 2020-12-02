import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import JSFunc from './teste'
import axios from 'axios'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    const opa = req.query?.name
    context.log('valor do opa', opa)
    JSFunc()
    await axios.post('URL', 'teste')
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };

};

export default httpTrigger;