/**
 *  Exemplo 1 
 *  https://www.npmjs.com/package/dotenv
 */
const { DotenvAzure } = require('dotenv-azure')
const mongoClient = require('mongodb')
const axios = require('axios')
 
module.exports = async (context) => {
    await new DotenvAzure().config()
    
    const item = await getItem()
    const result = await insertItem(item)
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: result.insertedId || 'Ocorreu um erro'
    };
}

async function getItem() {
    try {
        const { data } = await axios.post(process.env.LOGIC_APP_URL, {
            "codigo-item-datasul": "'A2"
        })

        return data
    } catch (error) {
        console.log(error)
    }
}

async function insertItem(item) {
    const client = await mongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true })
        .catch(err => console.log('ERRO DE CONEXAO COM O MONGO'))

    if (!client) return null

    const db = client.db('testedb')

    return await db.collection('itens').insertOne(item)
}
