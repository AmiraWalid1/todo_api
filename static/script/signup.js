
document.getElementById('form').addEventListener('submit', async(event)=>{
  event.preventDefault();
  const name = event.target.name.value;
  const email = event.target.email.value;
  const password = event.target.password.value;
  try{
    const res = await fetch('http://localhost:3000/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, email, password})
    });

    const user = await res.json();
    console.log(user);
    window.location.href = './login.html';

  } catch (error) {
  console.error('Error:', error);
  }
});

