function addUser(name, email) {
  return `
  <tr>
    <td>${name}</td>
    <td>${email}</td>
  </tr>
  `;
}

async function getAllUsers(){
  try {
    let users = await fetch('http://localhost:3000/users',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    users = await users.json();
    let allUsers = '';
    users.forEach(user => {
      allUsers += addUser(user.name, user.email);
    });

    document.getElementById('user-list').innerHTML += allUsers;

  } catch(error) {
    console.error('Error:', error);
  }
};

getAllUsers();
