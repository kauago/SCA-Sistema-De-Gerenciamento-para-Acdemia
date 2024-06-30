document.getElementById('open_btn').addEventListener('click', function () {
    document.getElementById('sidebar').classList.toggle('open-sidebar');
});

function loadContent(page) {
    const mainContent = document.getElementById("main-content");

    if (page === 'home') {
        mainContent.innerHTML = `
      
        <h1>SCA-Sistema De Academia</h1>
        
       
        `;
    } else if (page === 'clientes') {
        mainContent.innerHTML = `
            <form class="pesquisa" onsubmit="searchUser(event)">
                <h3>Pesquisar Usuário</h3>
                <input type="text" id="search-name" placeholder="Nome">
                <button type="submit">Pesquisar</button>
            </form>
            <h2>Usuários</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Idade</th>
                        <th>Modalidade</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody id="user-table">
                    <!-- Users will be dynamically added here -->
                </tbody>
            </table>
        `;
    } else if (page === 'cadastra-clientes') {
        mainContent.innerHTML = `
            <form class="cadastro" onsubmit="addUser(event)">
                <h3>Cadastrar Usuário</h3>
                <input type="text" id="name" placeholder="Nome" required>
                <input type="email" id="email" placeholder="Email" required>
                <input type="number" id="age" placeholder="Idade" required>
                <input type="text" id="modality" placeholder="Modalidade" required>
                <button type="submit">Cadastrar</button>
            </form>
        `;
    } else if (page === 'financeiro') {
        mainContent.innerHTML = '<h2>Financeiro</h2>';
    } else if (page === 'suporte') {
        mainContent.innerHTML = `
        
        <form class="contact-form" onsubmit="sendWhatsApp(event)">
                <h2>Entre em Contato com o Suporte</h2>
                <label for="name">Nome:</label>
                <input type="text" id="name" name="name" required>
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required>
                <label for="description">Descrição do Problema:</label>
                <textarea id="description" name="description" rows="4" required></textarea>
                <button type="submit">Enviar Mensagem via WhatsApp</button>
            </form>
        `;
    } else if (page === 'exit') {
        mainContent.innerHTML = '<h2>Sair</h2>';
    }
}

function addUser(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const age = document.getElementById("age").value;
    const modality = document.getElementById("modality").value;

    // Armazene os dados dos usuários no localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ name, email, age, modality });
    localStorage.setItem('users', JSON.stringify(users));

    // Carregue a página de clientes para exibir a tabela atualizada
    loadContent('clientes');
    setTimeout(function() {
        loadContent('clientes');
    }, 1000); // 5000 milissegundos = 5 segundos
    
}

function searchUser(event) {
    event.preventDefault();
    const searchName = document.getElementById('search-name').value.toLowerCase();
    const rows = document.querySelectorAll('#user-table tr');

    rows.forEach(row => {
        const name = row.children[0].textContent.toLowerCase();
        if (name.includes(searchName)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

function pagarUser() {
    alert("Pagamento efetuado!");
}

function bloquearUser() {
    alert("Usuário bloqueado!");
}

function excluirUser(button) {
    button.closest('tr').remove();
}

// Carrega a página inicial por padrão
loadContent('home');

// Carrega a tabela de usuários ao carregar a página de clientes
window.addEventListener('load', function () {
    if (document.getElementById('main-content')) {
        const page = document.getElementById('main-content').dataset.page;
        if (page === 'clientes') {
            loadUsers();
        }
    }
});

function loadUsers() {
    const userTable = document.getElementById("user-table");
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    userTable.innerHTML = ''; // Limpa a tabela antes de adicionar os usuários
    users.forEach(user => {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.age}</td>
            <td>${user.modality}</td>
            <td>
                <button onclick="pagarUser()">Pagar</button>
                <button onclick="bloquearUser()">Bloquear</button>
                <button onclick="excluirUser(this)">Excluir</button>
            </td>
        `;
        userTable.appendChild(newRow);
    });
}

// Carrega a página de clientes ao clicar no menu
document.querySelector('body').addEventListener('click', function (event) {
    if (event.target.closest('.side-item a')) {
        const page = event.target.closest('.side-item a').getAttribute('onclick').split("'")[1];
        if (page === 'clientes') {
            loadUsers();
        }
    }
});


function sendWhatsApp(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const description = document.getElementById("description").value;

    // Simulação de envio via WhatsApp
    const whatsappLink = `https://wa.me/+5585981704863/?text=Nome:%20${encodeURIComponent(name)}%0AEmail:%20${encodeURIComponent(email)}%0ADescrição:%20${encodeURIComponent(description)}`;
    
    // Abre o link no WhatsApp
    window.open(whatsappLink, '_blank');
}

// Carrega a página inicial por padrão
loadContent('home');