const getNeweggProducts = (name, count, callback) =>
  fetch('http://localhost:3000/products', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      count: count,
    }),
  })
    .then((response) => {
      response.json().then((json) => {
        console.log(json.data);
        callback(JSON.parse(json.data));
      });
    })
    .catch((error) => {
      console.log(error);
    });

export {getNeweggProducts};
