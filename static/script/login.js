
document.getElementById('form').addEventListener('submit', async(event)=>{
  event.preventDefault();
  const email = event.target.email.value;
  const password = event.target.password.value;
  try{
    const res = await fetch('http://localhost:3000/users/login', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    });

    const token = await res.json();
    localStorage.setItem("token", token.token);
    window.location.href = './user.html';

  } catch (error) {
    console.error('Error:', error);
  }
});

