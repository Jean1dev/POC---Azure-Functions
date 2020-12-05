const { DotenvAzure } = require('dotenv-azure')
const mongoClient = require('mongodb')

module.exports = async function (context, req) {
    await new DotenvAzure().config()
    const items = await getAll()
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: items
    };
}

async function getAll() {
    const client = await mongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true })
        .catch(err => console.log('ERRO DE CONEXAO COM O MONGO'))

    if (!client) return null

    const db = client.db('testedb')

    return await db.collection('itens').find({}).toArray()
}