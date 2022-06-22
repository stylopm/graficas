const users = require("./users.js");

async function buscar(users, nameSearch) {
  let promise = new Promise((resolve, reject) => {
    const findUser = users.find((element) => element.name === nameSearch);
    if (findUser !== undefined) {
        if (findUser.phone !== undefined) {
            resolve(`Se encontro el usuario ${findUser.name} con teléfono ${findUser.phone} `);
        } else {
            reject(`El usuario ${findUser.name} no cuenta con teléfono`);      
        }
    } else {
      reject(`No se encontró el nombre del usuario ${nameSearch}`);
    }
  });

  try {
    let response = await promise;
    console.log(response);
  } catch (err) {
    console.warn(err); // TypeError: failed to fetch
  }
}

buscar(users, 'Marcus');
