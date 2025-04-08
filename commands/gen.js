async function gen(mensagem) {
  const res = await fetch(`http://localhost:8080/v1/gen?time=${encodeURIComponent(mensagem)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ texto: mensagem }),
  });

  const data = await res.json();
  console.log(data);

  return data;
}

module.exports = { gen };
