// ===================================
// VOLMASTER - Gerenciador de Interface
// Controle de Modais e Renderização
// ===================================

// ===================================
// Notificações Dropdown
// ===================================
function toggleNotifications() {
    const dropdown = document.getElementById('notificationsDropdown');
    dropdown.classList.toggle('show');
}

function clearAllNotifications() {
    const notificationsList = document.getElementById('notificationsList');
    notificationsList.innerHTML = '<div class="notification-item" style="text-align: center; color: var(--text-gray);"><p>Nenhuma notificação</p></div>';
    document.getElementById('notificationCount').textContent = '0';
    showToast('Todas as notificações foram limpas', 'success');
}

function viewAllNotifications() {
    toggleNotifications();
    showToast('Redirecionando para página de notificações...', 'info');
}

// Fechar dropdown ao clicar fora
document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('notificationsDropdown');
    const notificationBtn = document.querySelector('.btn-notification');
    
    if (dropdown && notificationBtn && 
        !dropdown.contains(event.target) && 
        !notificationBtn.contains(event.target)) {
        dropdown.classList.remove('show');
    }
});

// ===================================
// Funções de Utilidade
// ===================================
function showToast(message, type = 'success') {
    // Criar elemento de toast
    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;
    toast.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'times-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Adicionar ao body
    document.body.appendChild(toast);
    
    // Mostrar
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Remover após 3 segundos
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('pt-BR');
}

function formatDateTime(dateString) {
    return new Date(dateString).toLocaleString('pt-BR');
}

function renderStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    let html = '';
    
    for (let i = 0; i < fullStars; i++) {
        html += '<i class="fas fa-star text-warning"></i>';
    }
    
    if (hasHalf) {
        html += '<i class="fas fa-star-half-alt text-warning"></i>';
    }
    
    const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        html += '<i class="far fa-star text-muted"></i>';
    }
    
    return html;
}

// ===================================
// Gerenciamento de Clientes
// ===================================
function renderClientesTable(searchTerm = '') {
    const tbody = document.querySelector('#page-clientes tbody');
    if (!tbody) return;
    
    let clientes = searchTerm ? ClientesDB.search(searchTerm) : ClientesDB.getAll();
    
    if (clientes.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" class="text-center">Nenhum cliente encontrado</td></tr>';
        return;
    }
    
    tbody.innerHTML = clientes.map(cliente => {
        const veiculos = VeiculosDB.getByCliente(cliente.id);
        return `
            <tr>
                <td>#${String(cliente.id).padStart(3, '0')}</td>
                <td>${cliente.nome}</td>
                <td>${cliente.cpfCnpj}</td>
                <td>${cliente.telefone}</td>
                <td>${cliente.email || '-'}</td>
                <td>${veiculos.length}</td>
                <td><span class="badge badge-success">${cliente.status}</span></td>
                <td>
                    <button class="btn-action" onclick="viewCliente(${cliente.id})" title="Visualizar">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-action" onclick="editCliente(${cliente.id})" title="Editar">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-action" onclick="deleteCliente(${cliente.id})" title="Excluir">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

function openModalCliente(clienteId = null) {
    const modal = new bootstrap.Modal(document.getElementById('modalCliente'));
    const form = document.getElementById('formCliente');
    const titulo = document.getElementById('modalClienteTitulo');
    
    form.reset();
    document.getElementById('clienteId').value = '';
    
    if (clienteId) {
        const cliente = ClientesDB.getById(clienteId);
        if (cliente) {
            titulo.textContent = 'Editar Cliente';
            document.getElementById('clienteId').value = cliente.id;
            document.getElementById('clienteNome').value = cliente.nome;
            document.getElementById('clienteCpfCnpj').value = cliente.cpfCnpj;
            document.getElementById('clienteTelefone').value = cliente.telefone;
            document.getElementById('clienteEmail').value = cliente.email || '';
            document.getElementById('clienteEndereco').value = cliente.endereco || '';
            document.getElementById('clienteCidade').value = cliente.cidade || '';
            document.getElementById('clienteEstado').value = cliente.estado || '';
        }
    } else {
        titulo.textContent = 'Novo Cliente';
    }
    
    modal.show();
}

function editCliente(id) {
    openModalCliente(id);
}

function viewCliente(id) {
    const cliente = ClientesDB.getById(id);
    if (cliente) {
        const veiculos = VeiculosDB.getByCliente(id);
        alert(`Cliente: ${cliente.nome}\nCPF/CNPJ: ${cliente.cpfCnpj}\nTelefone: ${cliente.telefone}\nEmail: ${cliente.email || '-'}\nVeículos: ${veiculos.length}`);
    }
}

function deleteCliente(id) {
    if (confirm('Deseja realmente excluir este cliente?')) {
        ClientesDB.delete(id);
        renderClientesTable();
        showToast('Cliente excluído com sucesso!', 'success');
    }
}

// ===================================
// Gerenciamento de Veículos
// ===================================
function renderVeiculosTable(searchTerm = '') {
    const tbody = document.querySelector('#page-veiculos tbody');
    if (!tbody) return;
    
    let veiculos = searchTerm ? VeiculosDB.search(searchTerm) : VeiculosDB.getAll();
    
    if (veiculos.length === 0) {
        tbody.innerHTML = '<tr><td colspan="9" class="text-center">Nenhum veículo encontrado</td></tr>';
        return;
    }
    
    tbody.innerHTML = veiculos.map(veiculo => {
        const cliente = ClientesDB.getById(veiculo.clienteId);
        return `
            <tr>
                <td>#${String(veiculo.id).padStart(3, '0')}</td>
                <td>${cliente ? cliente.nome : 'N/A'}</td>
                <td>${veiculo.marca}</td>
                <td>${veiculo.modelo}</td>
                <td>${veiculo.placa}</td>
                <td>${veiculo.ano}</td>
                <td>${veiculo.km ? veiculo.km.toLocaleString() + ' km' : '-'}</td>
                <td><span class="badge badge-success">${veiculo.status}</span></td>
                <td>
                    <button class="btn-action" onclick="viewVeiculo(${veiculo.id})" title="Visualizar">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-action" onclick="editVeiculo(${veiculo.id})" title="Editar">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-action" onclick="deleteVeiculo(${veiculo.id})" title="Excluir">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

function loadClientesSelect() {
    const selects = [
        document.getElementById('veiculoCliente'),
        document.getElementById('ordemCliente')
    ];
    
    const clientes = ClientesDB.getAll();
    
    selects.forEach(select => {
        if (select) {
            const currentValue = select.value;
            select.innerHTML = '<option value="">Selecione o cliente...</option>' +
                clientes.map(c => `<option value="${c.id}">${c.nome}</option>`).join('');
            if (currentValue) select.value = currentValue;
        }
    });
}

function openModalVeiculo(veiculoId = null) {
    const modal = new bootstrap.Modal(document.getElementById('modalVeiculo'));
    const form = document.getElementById('formVeiculo');
    const titulo = document.getElementById('modalVeiculoTitulo');
    
    form.reset();
    document.getElementById('veiculoId').value = '';
    loadClientesSelect();
    
    if (veiculoId) {
        const veiculo = VeiculosDB.getById(veiculoId);
        if (veiculo) {
            titulo.textContent = 'Editar Veículo';
            document.getElementById('veiculoId').value = veiculo.id;
            document.getElementById('veiculoCliente').value = veiculo.clienteId;
            document.getElementById('veiculoMarca').value = veiculo.marca;
            document.getElementById('veiculoModelo').value = veiculo.modelo;
            document.getElementById('veiculoPlaca').value = veiculo.placa;
            document.getElementById('veiculoAno').value = veiculo.ano;
            document.getElementById('veiculoChassi').value = veiculo.chassi || '';
            document.getElementById('veiculoKm').value = veiculo.km || '';
            document.getElementById('veiculoCor').value = veiculo.cor || '';
        }
    } else {
        titulo.textContent = 'Novo Veículo';
    }
    
    modal.show();
}

function editVeiculo(id) {
    openModalVeiculo(id);
}

function viewVeiculo(id) {
    const veiculo = VeiculosDB.getById(id);
    if (veiculo) {
        const cliente = ClientesDB.getById(veiculo.clienteId);
        alert(`Veículo: ${veiculo.marca} ${veiculo.modelo}\nPlaca: ${veiculo.placa}\nAno: ${veiculo.ano}\nCliente: ${cliente ? cliente.nome : 'N/A'}\nKM: ${veiculo.km || 'N/A'}`);
    }
}

function deleteVeiculo(id) {
    if (confirm('Deseja realmente excluir este veículo?')) {
        VeiculosDB.delete(id);
        renderVeiculosTable();
        showToast('Veículo excluído com sucesso!', 'success');
    }
}

// ===================================
// Gerenciamento de Ordens de Serviço
// ===================================
function renderOrdensTable(searchTerm = '') {
    const tbody = document.querySelector('#page-ordens tbody');
    if (!tbody) return;
    
    let ordens = OrdensDB.getAll();
    
    if (searchTerm) {
        const lower = searchTerm.toLowerCase();
        ordens = ordens.filter(o => 
            o.servico.toLowerCase().includes(lower) ||
            o.id.toString().includes(lower)
        );
    }
    
    if (ordens.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" class="text-center">Nenhuma ordem de serviço encontrada</td></tr>';
        return;
    }
    
    tbody.innerHTML = ordens.map(ordem => {
        const cliente = ClientesDB.getById(ordem.clienteId);
        const veiculo = VeiculosDB.getById(ordem.veiculoId);
        const mecanico = MecanicosDB.getById(ordem.mecanicoId);
        
        const badgeClass = ordem.status === 'Concluída' ? 'badge-success' : 
                          ordem.status === 'Em Andamento' ? 'badge-warning' : 'badge-info';
        
        return `
            <tr>
                <td>#${ordem.id}</td>
                <td>${cliente ? cliente.nome : 'N/A'}</td>
                <td>${veiculo ? `${veiculo.marca} ${veiculo.modelo}` : 'N/A'}</td>
                <td>${mecanico ? mecanico.nome : 'N/A'}</td>
                <td>${ordem.servico}</td>
                <td><span class="badge ${badgeClass}">${ordem.status}</span></td>
                <td>${formatCurrency(ordem.valor)}</td>
                <td>
                    <button class="btn-action" onclick="viewOrdem(${ordem.id})" title="Visualizar">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-action" onclick="editOrdem(${ordem.id})" title="Editar">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-action" onclick="deleteOrdem(${ordem.id})" title="Excluir">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

function loadMecanicosSelect() {
    const select = document.getElementById('ordemMecanico');
    if (!select) return;
    
    const mecanicos = MecanicosDB.getAll();
    const currentValue = select.value;
    
    select.innerHTML = '<option value="">Selecione o mecânico...</option>' +
        mecanicos.map(m => `<option value="${m.id}">${m.nome}</option>`).join('');
    
    if (currentValue) select.value = currentValue;
}

function openModalOrdem(ordemId = null) {
    const modal = new bootstrap.Modal(document.getElementById('modalOrdem'));
    const form = document.getElementById('formOrdem');
    const titulo = document.getElementById('modalOrdemTitulo');
    
    form.reset();
    document.getElementById('ordemId').value = '';
    loadClientesSelect();
    loadMecanicosSelect();
    
    // Configurar data de hoje
    document.getElementById('financeiroData').value = new Date().toISOString().split('T')[0];
    
    if (ordemId) {
        const ordem = OrdensDB.getById(ordemId);
        if (ordem) {
            titulo.textContent = 'Editar Ordem de Serviço';
            document.getElementById('ordemId').value = ordem.id;
            document.getElementById('ordemCliente').value = ordem.clienteId;
            
            // Carregar veículos do cliente
            loadVeiculosDoCliente(ordem.clienteId);
            document.getElementById('ordemVeiculo').value = ordem.veiculoId;
            
            document.getElementById('ordemMecanico').value = ordem.mecanicoId;
            document.getElementById('ordemServico').value = ordem.servico;
            document.getElementById('ordemDescricao').value = ordem.descricao || '';
            document.getElementById('ordemValor').value = ordem.valor;
            document.getElementById('ordemStatus').value = ordem.status;
            
            if (ordem.dataPrevisao) {
                document.getElementById('ordemPrevisao').value = ordem.dataPrevisao.split('T')[0];
            }
        }
    } else {
        titulo.textContent = 'Nova Ordem de Serviço';
    }
    
    modal.show();
}

function loadVeiculosDoCliente(clienteId) {
    const select = document.getElementById('ordemVeiculo');
    if (!select) return;
    
    if (!clienteId) {
        select.innerHTML = '<option value="">Selecione o cliente primeiro...</option>';
        select.disabled = true;
        return;
    }
    
    const veiculos = VeiculosDB.getByCliente(clienteId);
    select.disabled = false;
    
    if (veiculos.length === 0) {
        select.innerHTML = '<option value="">Cliente não possui veículos</option>';
        return;
    }
    
    select.innerHTML = '<option value="">Selecione o veículo...</option>' +
        veiculos.map(v => `<option value="${v.id}">${v.marca} ${v.modelo} - ${v.placa}</option>`).join('');
}

function editOrdem(id) {
    openModalOrdem(id);
}

function viewOrdem(id) {
    const ordem = OrdensDB.getById(id);
    if (ordem) {
        const cliente = ClientesDB.getById(ordem.clienteId);
        const veiculo = VeiculosDB.getById(ordem.veiculoId);
        const mecanico = MecanicosDB.getById(ordem.mecanicoId);
        
        alert(`OS #${ordem.id}\nCliente: ${cliente ? cliente.nome : 'N/A'}\nVeículo: ${veiculo ? veiculo.marca + ' ' + veiculo.modelo : 'N/A'}\nMecânico: ${mecanico ? mecanico.nome : 'N/A'}\nServiço: ${ordem.servico}\nValor: ${formatCurrency(ordem.valor)}\nStatus: ${ordem.status}`);
    }
}

function deleteOrdem(id) {
    if (confirm('Deseja realmente excluir esta ordem de serviço?')) {
        OrdensDB.delete(id);
        renderOrdensTable();
        showToast('Ordem de serviço excluída com sucesso!', 'success');
    }
}

// ===================================
// Gerenciamento de Estoque
// ===================================
function renderEstoqueTable(searchTerm = '') {
    const tbody = document.querySelector('#page-estoque tbody');
    if (!tbody) return;
    
    let estoque = EstoqueDB.getAll();
    
    if (searchTerm) {
        const lower = searchTerm.toLowerCase();
        estoque = estoque.filter(e => 
            e.nome.toLowerCase().includes(lower) ||
            e.codigo.toLowerCase().includes(lower)
        );
    }
    
    if (estoque.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" class="text-center">Nenhum item encontrado</td></tr>';
        return;
    }
    
    tbody.innerHTML = estoque.map(item => {
        const estoqueStatus = item.quantidade <= item.quantidadeMinima ? 'badge-danger' : 'badge-success';
        const estoqueTexto = item.quantidade <= item.quantidadeMinima ? 'Baixo' : 'Normal';
        
        return `
            <tr>
                <td>${item.codigo}</td>
                <td>${item.nome}</td>
                <td>${item.categoria}</td>
                <td>${item.quantidade}</td>
                <td>${item.quantidadeMinima}</td>
                <td><span class="badge ${estoqueStatus}">${estoqueTexto}</span></td>
                <td>${formatCurrency(item.valorUnitario * item.quantidade)}</td>
                <td>
                    <button class="btn-action" onclick="viewEstoque(${item.id})" title="Visualizar">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-action" onclick="editEstoque(${item.id})" title="Editar">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-action" onclick="deleteEstoque(${item.id})" title="Excluir">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

function openModalEstoque(estoqueId = null) {
    const modal = new bootstrap.Modal(document.getElementById('modalEstoque'));
    const form = document.getElementById('formEstoque');
    const titulo = document.getElementById('modalEstoqueTitulo');
    
    form.reset();
    document.getElementById('estoqueId').value = '';
    
    if (estoqueId) {
        const item = EstoqueDB.getById(estoqueId);
        if (item) {
            titulo.textContent = 'Editar Item de Estoque';
            document.getElementById('estoqueId').value = item.id;
            document.getElementById('estoqueCodigo').value = item.codigo;
            document.getElementById('estoqueNome').value = item.nome;
            document.getElementById('estoqueCategoria').value = item.categoria;
            document.getElementById('estoqueQuantidade').value = item.quantidade;
            document.getElementById('estoqueQuantidadeMinima').value = item.quantidadeMinima;
            document.getElementById('estoqueValor').value = item.valorUnitario;
            document.getElementById('estoqueFornecedor').value = item.fornecedor || '';
            document.getElementById('estoqueLocalizacao').value = item.localizacao || '';
        }
    } else {
        titulo.textContent = 'Novo Item de Estoque';
    }
    
    modal.show();
}

function editEstoque(id) {
    openModalEstoque(id);
}

function viewEstoque(id) {
    const item = EstoqueDB.getById(id);
    if (item) {
        alert(`Código: ${item.codigo}\nProduto: ${item.nome}\nCategoria: ${item.categoria}\nQuantidade: ${item.quantidade}\nValor Total: ${formatCurrency(item.valorUnitario * item.quantidade)}`);
    }
}

function deleteEstoque(id) {
    if (confirm('Deseja realmente excluir este item do estoque?')) {
        EstoqueDB.delete(id);
        renderEstoqueTable();
        showToast('Item excluído com sucesso!', 'success');
    }
}

// ===================================
// Gerenciamento Financeiro
// ===================================
function renderFinanceiroTable(searchTerm = '') {
    const tbody = document.querySelector('#page-financeiro tbody');
    if (!tbody) return;
    
    let lancamentos = FinanceiroDB.getAll();
    
    if (searchTerm) {
        const lower = searchTerm.toLowerCase();
        lancamentos = lancamentos.filter(l => 
            l.descricao.toLowerCase().includes(lower) ||
            l.categoria.toLowerCase().includes(lower)
        );
    }
    
    if (lancamentos.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="text-center">Nenhum lançamento encontrado</td></tr>';
        return;
    }
    
    tbody.innerHTML = lancamentos.map(lanc => {
        const tipoClass = lanc.tipo === 'Receita' ? 'text-success' : 'text-danger';
        const statusBadge = lanc.status === 'Recebido' || lanc.status === 'Pago' ? 'badge-success' : 'badge-warning';
        
        return `
            <tr>
                <td>${formatDate(lanc.data)}</td>
                <td><span class="${tipoClass}">${lanc.tipo}</span></td>
                <td>${lanc.descricao}</td>
                <td>${lanc.categoria}</td>
                <td class="${tipoClass}">${formatCurrency(lanc.valor)}</td>
                <td><span class="badge ${statusBadge}">${lanc.status}</span></td>
                <td>
                    <button class="btn-action" onclick="editFinanceiro(${lanc.id})" title="Editar">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-action" onclick="deleteFinanceiro(${lanc.id})" title="Excluir">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join('');
    
    // Atualizar totais
    updateFinanceiroTotais();
}

function updateFinanceiroTotais() {
    const totais = FinanceiroDB.getTotais();
    
    const receitasEl = document.getElementById('totalReceitas');
    const despesasEl = document.getElementById('totalDespesas');
    const saldoEl = document.getElementById('saldoMensal');
    
    if (receitasEl) receitasEl.textContent = formatCurrency(totais.receitas);
    if (despesasEl) despesasEl.textContent = formatCurrency(totais.despesas);
    if (saldoEl) {
        saldoEl.textContent = formatCurrency(totais.saldo);
        saldoEl.className = totais.saldo >= 0 ? 'text-success' : 'text-danger';
    }
}

function openModalFinanceiro(financeiroId = null) {
    const modal = new bootstrap.Modal(document.getElementById('modalFinanceiro'));
    const form = document.getElementById('formFinanceiro');
    const titulo = document.getElementById('modalFinanceiroTitulo');
    
    form.reset();
    document.getElementById('financeiroId').value = '';
    
    // Data de hoje por padrão
    document.getElementById('financeiroData').value = new Date().toISOString().split('T')[0];
    
    if (financeiroId) {
        const lanc = FinanceiroDB.getById(financeiroId);
        if (lanc) {
            titulo.textContent = 'Editar Lançamento';
            document.getElementById('financeiroId').value = lanc.id;
            document.getElementById('financeiroTipo').value = lanc.tipo;
            document.getElementById('financeiroCategoria').value = lanc.categoria;
            document.getElementById('financeiroDescricao').value = lanc.descricao;
            document.getElementById('financeiroValor').value = lanc.valor;
            document.getElementById('financeiroFormaPagamento').value = lanc.formaPagamento;
            document.getElementById('financeiroData').value = lanc.data.split('T')[0];
            document.getElementById('financeiroStatus').value = lanc.status;
        }
    } else {
        titulo.textContent = 'Novo Lançamento';
    }
    
    modal.show();
}

function editFinanceiro(id) {
    openModalFinanceiro(id);
}

function deleteFinanceiro(id) {
    if (confirm('Deseja realmente excluir este lançamento?')) {
        FinanceiroDB.delete(id);
        renderFinanceiroTable();
        showToast('Lançamento excluído com sucesso!', 'success');
    }
}

// ===================================
// Inicialização dos Formulários
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    
    // Form Cliente
    const formCliente = document.getElementById('formCliente');
    if (formCliente) {
        formCliente.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const clienteData = {
                nome: document.getElementById('clienteNome').value,
                cpfCnpj: document.getElementById('clienteCpfCnpj').value,
                telefone: document.getElementById('clienteTelefone').value,
                email: document.getElementById('clienteEmail').value,
                endereco: document.getElementById('clienteEndereco').value,
                cidade: document.getElementById('clienteCidade').value,
                estado: document.getElementById('clienteEstado').value
            };
            
            const clienteId = document.getElementById('clienteId').value;
            
            if (clienteId) {
                ClientesDB.update(clienteId, clienteData);
                showToast('Cliente atualizado com sucesso!', 'success');
            } else {
                ClientesDB.create(clienteData);
                showToast('Cliente cadastrado com sucesso!', 'success');
            }
            
            renderClientesTable();
            bootstrap.Modal.getInstance(document.getElementById('modalCliente')).hide();
        });
    }
    
    // Form Veículo
    const formVeiculo = document.getElementById('formVeiculo');
    if (formVeiculo) {
        formVeiculo.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const veiculoData = {
                clienteId: parseInt(document.getElementById('veiculoCliente').value),
                marca: document.getElementById('veiculoMarca').value,
                modelo: document.getElementById('veiculoModelo').value,
                placa: document.getElementById('veiculoPlaca').value,
                ano: parseInt(document.getElementById('veiculoAno').value),
                chassi: document.getElementById('veiculoChassi').value,
                km: parseInt(document.getElementById('veiculoKm').value) || 0,
                cor: document.getElementById('veiculoCor').value
            };
            
            const veiculoId = document.getElementById('veiculoId').value;
            
            if (veiculoId) {
                VeiculosDB.update(veiculoId, veiculoData);
                showToast('Veículo atualizado com sucesso!', 'success');
            } else {
                VeiculosDB.create(veiculoData);
                showToast('Veículo cadastrado com sucesso!', 'success');
            }
            
            renderVeiculosTable();
            bootstrap.Modal.getInstance(document.getElementById('modalVeiculo')).hide();
        });
    }
    
    // Form Ordem
    const formOrdem = document.getElementById('formOrdem');
    if (formOrdem) {
        formOrdem.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const ordemData = {
                clienteId: parseInt(document.getElementById('ordemCliente').value),
                veiculoId: parseInt(document.getElementById('ordemVeiculo').value),
                mecanicoId: parseInt(document.getElementById('ordemMecanico').value),
                servico: document.getElementById('ordemServico').value,
                descricao: document.getElementById('ordemDescricao').value,
                valor: parseFloat(document.getElementById('ordemValor').value),
                status: document.getElementById('ordemStatus').value,
                dataPrevisao: document.getElementById('ordemPrevisao').value || null
            };
            
            const ordemId = document.getElementById('ordemId').value;
            
            if (ordemId) {
                OrdensDB.update(ordemId, ordemData);
                showToast('Ordem atualizada com sucesso!', 'success');
            } else {
                OrdensDB.create(ordemData);
                showToast('Ordem criada com sucesso!', 'success');
            }
            
            renderOrdensTable();
            bootstrap.Modal.getInstance(document.getElementById('modalOrdem')).hide();
        });
    }
    
    // Form Estoque
    const formEstoque = document.getElementById('formEstoque');
    if (formEstoque) {
        formEstoque.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const estoqueData = {
                codigo: document.getElementById('estoqueCodigo').value,
                nome: document.getElementById('estoqueNome').value,
                categoria: document.getElementById('estoqueCategoria').value,
                quantidade: parseInt(document.getElementById('estoqueQuantidade').value),
                quantidadeMinima: parseInt(document.getElementById('estoqueQuantidadeMinima').value),
                valorUnitario: parseFloat(document.getElementById('estoqueValor').value),
                fornecedor: document.getElementById('estoqueFornecedor').value,
                localizacao: document.getElementById('estoqueLocalizacao').value
            };
            
            const estoqueId = document.getElementById('estoqueId').value;
            
            if (estoqueId) {
                EstoqueDB.update(estoqueId, estoqueData);
                showToast('Item atualizado com sucesso!', 'success');
            } else {
                EstoqueDB.create(estoqueData);
                showToast('Item cadastrado com sucesso!', 'success');
            }
            
            renderEstoqueTable();
            bootstrap.Modal.getInstance(document.getElementById('modalEstoque')).hide();
        });
    }
    
    // Form Financeiro
    const formFinanceiro = document.getElementById('formFinanceiro');
    if (formFinanceiro) {
        formFinanceiro.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const financeiroData = {
                tipo: document.getElementById('financeiroTipo').value,
                categoria: document.getElementById('financeiroCategoria').value,
                descricao: document.getElementById('financeiroDescricao').value,
                valor: parseFloat(document.getElementById('financeiroValor').value),
                formaPagamento: document.getElementById('financeiroFormaPagamento').value,
                data: document.getElementById('financeiroData').value,
                status: document.getElementById('financeiroStatus').value
            };
            
            const financeiroId = document.getElementById('financeiroId').value;
            
            if (financeiroId) {
                FinanceiroDB.update(financeiroId, financeiroData);
                showToast('Lançamento atualizado com sucesso!', 'success');
            } else {
                FinanceiroDB.create(financeiroData);
                showToast('Lançamento criado com sucesso!', 'success');
            }
            
            renderFinanceiroTable();
            bootstrap.Modal.getInstance(document.getElementById('modalFinanceiro')).hide();
        });
    }
    
    // Listener para carregar veículos quando cliente é selecionado
    const ordemClienteSelect = document.getElementById('ordemCliente');
    if (ordemClienteSelect) {
        ordemClienteSelect.addEventListener('change', function() {
            loadVeiculosDoCliente(this.value);
        });
    }
    
    // Renderizar tabelas iniciais
    renderClientesTable();
    renderVeiculosTable();
    renderOrdensTable();
    renderEstoqueTable();
    renderFinanceiroTable();
    
    console.log('✅ Interface inicializada!');
});
