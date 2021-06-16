class SimulacaoIntegracao {
  #context
  #something

  constructor(context, something) {
    this.#context = context
    this.#something = something
    this.run()
  }

  run() {
    this.buscarDados()
    this.tratarDados()
    this.integrarDados()
  }

  buscarDados() {
    //do something
    console.log('buscarDados')
  }

  tratarDados() {
    //do something
    console.log('tratarDados')
  }

  integrarDados() {
    // do something
    console.log('integrarDados')
  }
}

function runnable(context, content, runnable) {
  new runnable(context, content)
}

module.exports = {
  runnable,
  SimulacaoIntegracao
}
