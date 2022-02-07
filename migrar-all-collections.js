const fs = require('fs')
const CosmosClient = require('@azure/cosmos').CosmosClient
const keys = {
  OLD_DB: 'ldc-db',
  NEW_DB: 'ldc-db'
}

function registrarArquivoDeCollectionsMigradas(collections) {
  fs.writeFileSync('collections-migradas.json', JSON.stringify(collections))
}

  ; (async () => {
    const client = new CosmosClient('')
    const newClient = new CosmosClient('')

    const retorno = await client.database(keys.OLD_DB).containers.readAll().fetchAll();
    const collectionsMigradas = []

    for (const resource of retorno.resources) {
      const collection = resource.id

      if (collection !== "logMonitoramento") {
        console.log(collection);
        const dbOld = client.database(keys.OLD_DB).container(collection)
        const itens = await dbOld.items.readAll().fetchAll()

        try {
          await newClient.database(keys.NEW_DB).container(collection).read();
        }
        catch (err) {
          console.log('err')

          const { container } = await newClient
            .database(keys.NEW_DB)
            .containers.createIfNotExists(
              { id: collection },
            )

          console.log(`Criado container`);
          async function bulkCreate(todos) {
            const creates = []
            for (const item of todos) {
              creates.push(container.items.create(item))

            }
            return Promise.all(creates)
          }

          try {
            // const bloco1 = []
            // const bloco2 = []
            // const bloco3 = []
            // const bloco4 = []
            // const bloco5 = []
            // const bloco6 = []
            // for (let index = 0; index < 500; index++) {
            //   bloco1.push(itens.resources[index])

            // }

            // for (let index = 500; index < 1000; index++) {
            //   bloco2.push(itens.resources[index])

            // }

            // for (let index = 1000; index < 1500; index++) {
            //   bloco3.push(itens.resources[index])
            // }

            // for (let index = 1500; index < 2000; index++) {
            //   bloco4.push(itens.resources[index])
            // }

            // for (let index = 2000; index < 2500; index++) {
            //   bloco5.push(itens.resources[index])
            // }

            // for (let index = 2500; index < itens.resources.length; index++) {
            //   bloco6.push(itens.resources[index])
            // }

            // await bulkCreate(bloco1)
            // await bulkCreate(bloco2)
            // await bulkCreate(bloco3)
            // await bulkCreate(bloco4)
            // await bulkCreate(bloco5)
            // await bulkCreate(bloco6)

            await bulkCreate(itens.resources)
            collectionsMigradas.push(collection)
          } catch (error) {
            console.error('erro na collection ', error.message)
            registrarArquivoDeCollectionsMigradas(collectionsMigradas)
          }
        }





      }

    }
  })()
