
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
      
            carrinho.push({ itemCarrinho: cardapioItem, quantidade: quantidade });
        }
     
        for (const itemExtra of carrinho) {
            if ((itemExtra.itemCarrinho.codigo === 'queijo') && !temSanduiche) {
                return "Item extra não pode ser pedido sem o principal";
            }
        }
        for (const itemExtra of carrinho) {
            if ((itemExtra.itemCarrinho.codigo === 'chantily') && !temCafe) {
                return "Item extra não pode ser pedido sem o principal";
            }
        }

        if (carrinho.length === 0) {
            return "Não há itens no carrinho de compra!";
        }

        
        for (const item of carrinho) {
            valorTotal += item.itemCarrinho.valor * item.quantidade;
        }
      
        if (!formasPagamento.includes(metodoDePagamento)) {
            return "Forma de pagamento inválida!";
        }

        if (metodoDePagamento === 'dinheiro') {
            valorTotal *= 0.95;
        } else if (metodoDePagamento === 'credito') {
            valorTotal *= 1.03; 
        }

        return `R$ ${valorTotal.toFixed(2).replace('.', ',')}`;
    }
}

const caixa = new CaixaDaLanchonete();

export { CaixaDaLanchonete };
