function finishOrder() {
  if (!cart.length) {
    alert('Adicione pelo menos um produto ao carrinho.');
    return;
  }

  const name = document.getElementById('customerName').value.trim() || 'Não informado';
  const type = document.getElementById('deliveryType').value;
  const address = document.getElementById('address').value.trim();
  const notes = document.getElementById('notes').value.trim();

  let totalProdutos = 0;
  let message = `Olá, Jamile! 💕 Gostaria de fazer um pedido pelo site:\n\n`;

  cart.forEach(item => {
    totalProdutos += item.price * item.qty;
    message += `• ${item.qty}x ${item.name} — ${money(item.price * item.qty)}\n`;
  });

  const taxaEntrega = type === 'Entrega' ? TAXA_ENTREGA : 0;
  const totalFinal = totalProdutos + taxaEntrega;

  message += `\n*Total dos produtos: ${money(totalProdutos)}*\n`;

  if (taxaEntrega > 0) {
    message += `*Taxa de entrega: ${money(taxaEntrega)}*\n`;
  }

  message += `*Total do pedido: ${money(totalFinal)}*\n`;
  message += `\nNome: ${name}\n`;
  message += `Forma de receber: ${type}\n`;

  if (type === 'Entrega') {
    message += `Endereço: ${address || 'Ainda não informado'}\n`;
  }

  if (notes) {
    message += `Observações: ${notes}\n`;
  }

  message += `\nAguardo confirmação do pedido. 😊`;

  openWhatsApp(message);
}

renderCart();
