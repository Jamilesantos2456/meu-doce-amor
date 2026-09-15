const cart = [];
const TAXA_ENTREGA = 7;

function money(v) {
  return v.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}

function isEntrega() {
  const tipo = document.getElementById('deliveryType');
  return tipo && tipo.value === 'Entrega';
}

function addToCart(name, price) {
  const found = cart.find(i => i.name === name);

  if (found) {
    found.qty++;
  } else {
    cart.push({
      name: name,
      price: price,
      qty: 1
    });
  }

  renderCart();

  document.getElementById('pedido').scrollIntoView({
    behavior: 'smooth',
    block: 'center'
  });
}

function changeQty(index, delta) {
  cart[index].qty += delta;

  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }

  renderCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}

function renderCart() {
  const list = document.getElementById('cartItems');
  const empty = document.getElementById('emptyCart');

  list.innerHTML = '';

  let count = 0;
  let totalProdutos = 0;

  cart.forEach((item, i) => {
    count += item.qty;
    totalProdutos += item.price * item.qty;

    list.innerHTML += `
      <div class="cart-row">
        <div>
          <strong>${item.name}</strong><br>
          <small>${money(item.price)} cada</small>
        </div>

        <div class="qty">
          <button onclick="changeQty(${i},-1)">−</button>
          <strong>${item.qty}</strong>
          <button onclick="changeQty(${i},1)">+</button>
        </div>

        <strong>${money(item.price * item.qty)}</strong>

        <button class="remove" onclick="removeItem(${i})">
          Remover
        </button>
      </div>
    `;
  });

  const taxa = isEntrega() ? TAXA_ENTREGA : 0;
  const totalFinal = totalProdutos + taxa;

  empty.style.display = cart.length ? 'none' : 'block';

  document.getElementById('cartCount').textContent = count;

  document.getElementById('cartTotal').textContent =
    money(totalFinal);

  document.getElementById('checkoutProducts').textContent =
    money(totalProdutos);

  document.getElementById('checkoutDelivery').textContent =
    money(taxa);

  document.getElementById('checkoutTotal').textContent =
    money(totalFinal);

  document.getElementById('floatingCount').textContent = count;

  document.getElementById('floatingTotal').textContent =
    money(totalFinal);
}

function openWhatsApp(text) {
  window.open(
    'https://wa.me/5547992765611?text=' +
    encodeURIComponent(text),
    '_blank'
  );
}

function finishOrder() {
  if (!cart.length) {
    alert('Adicione pelo menos um produto ao carrinho.');
    return;
  }

  const name =
    document.getElementById('customerName').value.trim() ||
    'Não informado';

  const type =
    document.getElementById('deliveryType').value;

  const address =
    document.getElementById('address').value.trim();

  const notes =
    document.getElementById('notes').value.trim();

  let totalProdutos = 0;

  let message =
    `Olá, Jamile! 💕 Gostaria de fazer um pedido pelo site:\n\n`;

  cart.forEach(item => {
    totalProdutos += item.price * item.qty;

    message +=
      `• ${item.qty}x ${item.name} — ${money(item.price * item.qty)}\n`;
  });

  const taxaEntrega =
    type === 'Entrega' ? TAXA_ENTREGA : 0;

  const totalFinal =
    totalProdutos + taxaEntrega;

  message +=
    `\n*Total dos produtos: ${money(totalProdutos)}*\n`;

  message +=
    `*Taxa de entrega: ${money(taxaEntrega)}*\n`;

  message +=
    `*TOTAL DO PEDIDO: ${money(totalFinal)}*\n`;

  message +=
    `\nNome: ${name}\n`;

  message +=
    `Forma de receber: ${type}\n`;

  if (type === 'Entrega') {
    message +=
      `Endereço: ${address || 'Ainda não informado'}\n`;
  }

  if (notes) {
    message +=
      `Observações: ${notes}\n`;
  }

  message +=
    `\nAguardo confirmação do pedido. 😊`;

  openWhatsApp(message);
}


// Atualiza a taxa quando trocar
// entre Entrega e Retirada.
const deliveryType =
  document.getElementById('deliveryType');

if (deliveryType) {
  deliveryType.addEventListener('change', renderCart);
}


// Inicia o carrinho
renderCart();
