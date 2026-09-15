const cart = [];

function money(v) {
  return v.toLocaleString('pt-BR', {style:'currency', currency:'BRL'});
}

function addToCart(name, price) {
  const found = cart.find(i => i.name === name);
  if (found) found.qty++;
  else cart.push({name, price, qty:1});
  renderCart();
  document.getElementById('pedido').scrollIntoView({behavior:'smooth', block:'center'});
}

function changeQty(index, delta) {
  cart[index].qty += delta;
  if (cart[index].qty <= 0) cart.splice(index, 1);
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
  let count = 0, total = 0;

  cart.forEach((item, i) => {
    count += item.qty;
    total += item.price * item.qty;
    list.innerHTML += `
      <div class="cart-row">
        <div><strong>${item.name}</strong><br><small>${money(item.price)} cada</small></div>
        <div class="qty">
          <button onclick="changeQty(${i},-1)">−</button>
          <strong>${item.qty}</strong>
          <button onclick="changeQty(${i},1)">+</button>
        </div>
        <strong>${money(item.price * item.qty)}</strong>
        <button class="remove" onclick="removeItem(${i})">Remover</button>
      </div>`;
  });

  empty.style.display = cart.length ? 'none' : 'block';
  document.getElementById('cartCount').textContent = count;
  document.getElementById('cartTotal').textContent = money(total);
  document.getElementById('checkoutTotal').textContent = money(total);
  document.getElementById('floatingCount').textContent = count;
  document.getElementById('floatingTotal').textContent = money(total);
}

function openWhatsApp(text) {
  window.open('https://wa.me/554792765611?text=' + encodeURIComponent(text), '_blank');
}

function finishOrder() {
  if (!cart.length) {
    alert('Adicione pelo menos um produto ao carrinho.');
    return;
  }
  const name = document.getElementById('customerName').value.trim() || 'Não informado';
  const type = document.getElementById('deliveryType').value;
  const address = document.getElementById('address').value.trim();
  const notes = document.getElementById('notes').value.trim();

  let total = 0;
  let message = `Olá, Jamile! 💕 Gostaria de fazer um pedido pelo site:%0A%0A`;
  message = `Olá, Jamile! 💕 Gostaria de fazer um pedido pelo site:\n\n`;
  cart.forEach(item => {
    total += item.price * item.qty;
    message += `• ${item.qty}x ${item.name} — ${money(item.price * item.qty)}\n`;
  });
  message += `\n*Total dos produtos: ${money(total)}*\n`;
  message += `\nNome: ${name}\n`;
  message += `Forma de receber: ${type}\n`;
  if (type === 'Entrega') message += `Endereço: ${address || 'Ainda não informado'}\n`;
  if (notes) message += `Observações: ${notes}\n`;
  message += `\nAguardo confirmação do pedido. 😊`;

  openWhatsApp(message);
}

renderCart();
