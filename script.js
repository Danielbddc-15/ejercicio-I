
async function fetchUser() {
    const res = await fetch('https://randomuser.me/api/');
    const data = await res.json();
    return data.results[0];
}

function renderUser(user) {
    document.getElementById('user-photo').src = user.picture.large;
    document.getElementById('user-name').textContent = `${user.name.first} ${user.name.last}`;
    document.getElementById('user-email').textContent = user.email;
    document.getElementById('user-location').textContent = `${user.location.city}, ${user.location.country}`;
}

async function loadUser() {
    // Mostrar estado de carga
    document.getElementById('user-name').textContent = 'Cargando...';
    document.getElementById('user-email').textContent = '';
    document.getElementById('user-location').textContent = '';
    
    try {
        const user = await fetchUser();
        renderUser(user);
    } catch (error) {
        document.getElementById('user-name').textContent = 'Error al cargar usuario';
        console.error('Error:', error);
    }
}

// Cargar usuario al iniciar la página
window.onload = loadUser;

// Agregar evento al botón para cargar nuevo usuario
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('refresh-btn').addEventListener('click', loadUser);
});
