const CosmosClient = require('@azure/cosmos').CosmosClient

async function run () {
  const newClient = new CosmosClient('')

  const retorno = await newClient.database('ldc-db').containers.readAll().fetchAll();
  console.log(retorno.resources.length)
}


run()
