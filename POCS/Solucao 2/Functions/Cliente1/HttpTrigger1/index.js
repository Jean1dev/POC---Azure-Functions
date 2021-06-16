const { runnable, SimulacaoIntegracao } = require('../../../BASES/DATASUL')

class Customizada extends SimulacaoIntegracao {
    tratarDados() {
        console.log('custom implementation')
    }
}

function decoratorInstanciador(context, content) {
    runnable(context, content, Customizada)
    context.done()
}

module.exports = decoratorInstanciador
