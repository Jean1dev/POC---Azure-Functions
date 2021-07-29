const appInsights = require("applicationinsights");
const axios = require('axios')

/**
 * https://github.com/microsoft/applicationinsights-node.js
 * https://docs.microsoft.com/pt-br/azure/azure-monitor/app/overview-dashboard
 *
 */

appInsights
    .setup('InstrumentationKey=0a947c6e-1270-436e-9178-43e31b634ff7;IngestionEndpoint=https://centralus-2.in.applicationinsights.azure.com/')
    .setUseDiskRetryCaching(true)
    .setInternalLogging(true, true)
    .setDistributedTracingMode(appInsights.DistributedTracingModes.AI_AND_W3C)
    .start()

module.exports = async function (context, req) {
    appInsights.defaultClient.trackEvent({ name: 'req incoming ', properties: { key: 'value' } })
    context.log('JavaScript HTTP trigger function processed a request.');
    const correlationContext = appInsights.startOperation(context, req);

    const url = 'http://worldclockapi.com/api/json/est/now'

    const startTime = Date.now()
    const res = await axios.get(url)

    appInsights.defaultClient.trackRequest({
        name: 'GET World clock API',
        resultCode: res.status,
        success: true,
        url,
        duration: Date.now() - startTime,
        id: correlationContext.operation.parentId
    })

    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    context.res = {
        body: responseMessage
    };
}
