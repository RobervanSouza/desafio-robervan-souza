let cardapio = [
    { codigo: 'cafe', descricao: 'Café', valor: 3.00 },
    { codigo: 'chantily', descricao: 'Chantily (extra do Café)', valor: 1.50 },
    { codigo: 'suco', descricao: 'Suco Natural', valor: 6.20 },
    { codigo: 'sanduiche', descricao: 'Sanduíche', valor: 6.50 },
    { codigo: 'queijo', descricao: 'Queijo (extra do Sanduíche)', valor: 2.00 },
    { codigo: 'salgado', descricao: 'Salgado', valor: 7.25 },
    { codigo: 'combo1', descricao: '1 Suco e 1 Sanduíche', valor: 9.50 },
    { codigo: 'combo2', descricao: '1 Café e 1 Sanduíche', valor: 7.50 }
];
class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {
       

        const formasPagamento = [ 'dinheiro', 'debito', 'credito' ];

        const carrinho = [];
        let valorTotal = 0;

        let temCafe = false;
        let temSanduiche = false;

        for (const itemStr of itens) {
            const [ codigo, quantidadeStr ] = itemStr.split(',');
            const quantidade = parseInt(quantidadeStr);

            const cardapioItem = cardapio.find(i => i.codigo === codigo);

            if (!cardapioItem) {
                return "Item inválido!";
            }

            if (quantidade <= 0) {
                return "Quantidade inválida!";
            }

            if (codigo === 'cafe') {
                temCafe = true;
            } else if (codigo === 'sanduiche') {
                temSanduiche = true;
            }

            carrinho.push({ item: cardapioItem, quantidade: quantidade });
        }

        for (const item of carrinho) {
            if ((item.item.codigo === 'queijo')  && !temSanduiche) {
                return "Item extra não pode ser pedido sem o principal";
            }
        }
        for (const item of carrinho) {
            if ((item.item.codigo === 'chantily')  && !temCafe) {
                return "Item extra não pode ser pedido sem o principal";
            }
        }
        

        if (carrinho.length === 0) {
            return "Não há itens no carrinho de compra!";
        }

        for (const item of carrinho) {
            valorTotal += item.item.valor * item.quantidade;
        }

        if (!formasPagamento.includes(metodoDePagamento)) {
            return "Forma de pagamento inválida!";
        }

        if (metodoDePagamento === 'dinheiro') {
            valorTotal *= 0.95; // Aplicar desconto de 5%
        } else if (metodoDePagamento === 'credito') {
            valorTotal *= 1.03; // Aplicar acréscimo de 3%
        } 

   
        return `R$ ${valorTotal.toFixed(2).replace('.', ',')}`;
        
    }
}

// Exemplos
const caixa = new CaixaDaLanchonete();

console.log(caixa.calcularValorDaCompra('dinheiro', ['cafe,1'])); // Saída: "R$ 5,25"
console.log(caixa.calcularValorDaCompra('debito', [ 'cafe,1', 'chantily,1' ])); // Saída: "R$ 4,50"
console.log(caixa.calcularValorDaCompra('debito', [ 'cafe,1', 'sanduiche,1' ])); // Saída: "R$ 9,23"

export {CaixaDaLanchonete};