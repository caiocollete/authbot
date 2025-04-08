async function gen(mensagem) {
  const res = await fetch(`http://localhost:8080/v1/gen?time=${encodeURIComponent(mensagem)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ texto: mensagem }),
  });

  const response = await res.json();
  if (!response.success) {
     return response.mensagem;
  }
  console.log(response);

  return response.data;
}

module.exports = { gen };
