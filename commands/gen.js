async function gen(mensagem) {
  const res = await fetch(`http://localhost:8080/v1/gen?time=${encodeURIComponent(mensagem)}`, {
    method: 'POST',
    headers: {
      'X-API-KEY': process.env.APIKEY
    }
  });

  const response = await res.json();
  if (!response.success) {
     return response.mensagem;
  }
  console.log(response);

  return response.data;
}

module.exports = { gen };
