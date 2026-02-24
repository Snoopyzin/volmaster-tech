// ===================================
// VOLMASTER - Gerenciador de Dados
// Sistema de CRUD com LocalStorage
// ===================================

// ===================================
// Sistema de Armazenamento
// ===================================
const Storage = {
    get(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    },
    
    set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    
    remove(key) {
        localStorage.removeItem(key);
    },
    
    clear() {
        localStorage.clear();
    }
};

// ===================================
// Inicializar Dados Padrão
// ===================================
function initDefaultData() {
    // Clientes padrão
    if (!Storage.get('clientes')) {
        Storage.set('clientes', [
            {
                id: 1,
                nome: 'João Silva',
                cpfCnpj: '123.456.789-00',
                telefone: '(62) 98765-4321',
                email: 'joao@email.com',
                endereco: 'Rua das Flores, 123',
                cidade: 'Goiânia',
                estado: 'GO',
                status: 'Ativo',
                dataCadastro: new Date().toISOString()
            },
            {
                id: 2,
                nome: 'Maria Santos',
                cpfCnpj: '987.654.321-00',
                telefone: '(62) 99876-5432',
                email: 'maria@email.com',
                endereco: 'Av. Central, 456',
                cidade: 'Goiânia',
                estado: 'GO',
                status: 'Ativo',
                dataCadastro: new Date().toISOString()
            }
        ]);
    }
    
    // Veículos padrão
    if (!Storage.get('veiculos')) {
        Storage.set('veiculos', [
            {
                id: 1,
                clienteId: 1,
                marca: 'Volvo',
                modelo: 'FH 540',
                placa: 'ABC-1234',
                ano: 2020,
                chassi: '9BW1234567890ABCD',
                km: 125000,
                cor: 'Branco',
                status: 'Ativo',
                dataCadastro: new Date().toISOString()
            },
            {
                id: 2,
                clienteId: 2,
                marca: 'Volvo',
                modelo: 'FM 380',
                placa: 'DEF-5678',
                ano: 2019,
                chassi: '9BW9876543210DCBA',
                km: 98000,
                cor: 'Azul',
                status: 'Ativo',
                dataCadastro: new Date().toISOString()
            }
        ]);
    }
    
    // Mecânicos padrão
    if (!Storage.get('mecanicos')) {
        Storage.set('mecanicos', [
            {
                id: 1,
                nome: 'Gabriel Alexandre',
                especialidade: 'Motor e Transmissão',
                experiencia: '1a 2m',
                avaliacao: 4.0,
                osCompletas: 287,
                foto: 'imagens/Gabriel Mecanico.png',
                status: 'Ativo'
            },
            {
                id: 2,
                nome: 'Matheus Uai',
                especialidade: 'Sistema Elétrico',
                experiencia: '4 anos',
                avaliacao: 5.0,
                osCompletas: 315,
                foto: 'imagens/Matheus Mecanico.png',
                status: 'Ativo'
            },
            {
                id: 3,
                nome: 'Jesuino Vieira',
                especialidade: 'Especialista Geral',
                experiencia: '30 anos',
                avaliacao: 5.0,
                osCompletas: 2847,
                foto: 'imagens/Jesuino Mecanico.png',
                status: 'Lenda',
                descricao: '30 anos de empresa! Se ele não souber, ninguém sabe...'
            }
        ]);
    }
    
    // Ordens de Serviço padrão
    if (!Storage.get('ordens')) {
        Storage.set('ordens', [
            {
                id: 2401,
                clienteId: 1,
                veiculoId: 1,
                mecanicoId: 1,
                servico: 'Manutenção Preventiva',
                descricao: 'Revisão completa com troca de óleo e filtros',
                dataAbertura: new Date().toISOString(),
                dataPrevisao: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
                status: 'Em Andamento',
                valor: 2500.00
            },
            {
                id: 2402,
                clienteId: 2,
                veiculoId: 2,
                mecanicoId: 2,
                servico: 'Diagnóstico Eletrônico',
                descricao: 'Diagnóstico completo do sistema eletrônico',
                dataAbertura: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
                dataConclusao: new Date().toISOString(),
                status: 'Concluída',
                valor: 850.00
            }
        ]);
    }
    
    // Estoque padrão
    if (!Storage.get('estoque')) {
        Storage.set('estoque', [
            {
                id: 1,
                codigo: 'FLT-001',
                nome: 'Filtro de Óleo Volvo',
                categoria: 'Filtros',
                quantidade: 25,
                quantidadeMinima: 10,
                valorUnitario: 85.00,
                fornecedor: 'Volvo Peças',
                localizacao: 'Prateleira A1'
            },
            {
                id: 2,
                codigo: 'OLE-001',
                nome: 'Óleo Motor 15W40',
                categoria: 'Lubrificantes',
                quantidade: 120,
                quantidadeMinima: 50,
                valorUnitario: 45.00,
                fornecedor: 'Shell',
                localizacao: 'Prateleira B2'
            }
        ]);
    }
    
    // Financeiro padrão
    if (!Storage.get('financeiro')) {
        Storage.set('financeiro', [
            {
                id: 1,
                tipo: 'Receita',
                descricao: 'OS #2402 - Diagnóstico Eletrônico',
                categoria: 'Serviços',
                valor: 850.00,
                formaPagamento: 'PIX',
                data: new Date().toISOString(),
                status: 'Recebido'
            },
            {
                id: 2,
                tipo: 'Despesa',
                descricao: 'Compra de peças - Fornecedor Volvo',
                categoria: 'Peças',
                valor: 3500.00,
                formaPagamento: 'Boleto',
                data: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
                status: 'Pago'
            }
        ]);
    }
}

// ===================================
// CRUD - Clientes
// ===================================
const ClientesDB = {
    getAll() {
        return Storage.get('clientes') || [];
    },
    
    getById(id) {
        const clientes = this.getAll();
        return clientes.find(c => c.id === parseInt(id));
    },
    
    create(cliente) {
        const clientes = this.getAll();
        const newId = clientes.length > 0 ? Math.max(...clientes.map(c => c.id)) + 1 : 1;
        const novoCliente = {
            ...cliente,
            id: newId,
            dataCadastro: new Date().toISOString(),
            status: cliente.status || 'Ativo'
        };
        clientes.push(novoCliente);
        Storage.set('clientes', clientes);
        return novoCliente;
    },
    
    update(id, clienteData) {
        const clientes = this.getAll();
        const index = clientes.findIndex(c => c.id === parseInt(id));
        if (index !== -1) {
            clientes[index] = { ...clientes[index], ...clienteData };
            Storage.set('clientes', clientes);
            return clientes[index];
        }
        return null;
    },
    
    delete(id) {
        let clientes = this.getAll();
        clientes = clientes.filter(c => c.id !== parseInt(id));
        Storage.set('clientes', clientes);
        return true;
    },
    
    search(termo) {
        const clientes = this.getAll();
        const termoLower = termo.toLowerCase();
        return clientes.filter(c => 
            c.nome.toLowerCase().includes(termoLower) ||
            c.cpfCnpj.includes(termo) ||
            c.telefone.includes(termo) ||
            c.email.toLowerCase().includes(termoLower)
        );
    }
};

// ===================================
// CRUD - Veículos
// ===================================
const VeiculosDB = {
    getAll() {
        return Storage.get('veiculos') || [];
    },
    
    getById(id) {
        const veiculos = this.getAll();
        return veiculos.find(v => v.id === parseInt(id));
    },
    
    getByCliente(clienteId) {
        const veiculos = this.getAll();
        return veiculos.filter(v => v.clienteId === parseInt(clienteId));
    },
    
    create(veiculo) {
        const veiculos = this.getAll();
        const newId = veiculos.length > 0 ? Math.max(...veiculos.map(v => v.id)) + 1 : 1;
        const novoVeiculo = {
            ...veiculo,
            id: newId,
            dataCadastro: new Date().toISOString(),
            status: veiculo.status || 'Ativo'
        };
        veiculos.push(novoVeiculo);
        Storage.set('veiculos', veiculos);
        return novoVeiculo;
    },
    
    update(id, veiculoData) {
        const veiculos = this.getAll();
        const index = veiculos.findIndex(v => v.id === parseInt(id));
        if (index !== -1) {
            veiculos[index] = { ...veiculos[index], ...veiculoData };
            Storage.set('veiculos', veiculos);
            return veiculos[index];
        }
        return null;
    },
    
    delete(id) {
        let veiculos = this.getAll();
        veiculos = veiculos.filter(v => v.id !== parseInt(id));
        Storage.set('veiculos', veiculos);
        return true;
    },
    
    search(termo) {
        const veiculos = this.getAll();
        const termoLower = termo.toLowerCase();
        return veiculos.filter(v => 
            v.marca.toLowerCase().includes(termoLower) ||
            v.modelo.toLowerCase().includes(termoLower) ||
            v.placa.toLowerCase().includes(termoLower)
        );
    }
};

// ===================================
// CRUD - Mecânicos
// ===================================
const MecanicosDB = {
    getAll() {
        return Storage.get('mecanicos') || [];
    },
    
    getById(id) {
        const mecanicos = this.getAll();
        return mecanicos.find(m => m.id === parseInt(id));
    },
    
    create(mecanico) {
        const mecanicos = this.getAll();
        const newId = mecanicos.length > 0 ? Math.max(...mecanicos.map(m => m.id)) + 1 : 1;
        const novoMecanico = {
            ...mecanico,
            id: newId,
            osCompletas: 0,
            avaliacao: mecanico.avaliacao || 5.0,
            status: mecanico.status || 'Ativo',
            dataCadastro: new Date().toISOString()
        };
        mecanicos.push(novoMecanico);
        Storage.set('mecanicos', mecanicos);
        return novoMecanico;
    },
    
    update(id, mecanicoData) {
        const mecanicos = this.getAll();
        const index = mecanicos.findIndex(m => m.id === parseInt(id));
        if (index !== -1) {
            // Proteger Jesuino de alterações no status Lenda
            if (mecanicos[index].status === 'Lenda' && mecanicoData.status !== 'Lenda') {
                showToast('Mecânicos lendários não podem ter seu status alterado!', 'warning');
                return mecanicos[index];
            }
            mecanicos[index] = { ...mecanicos[index], ...mecanicoData };
            Storage.set('mecanicos', mecanicos);
            return mecanicos[index];
        }
        return null;
    },
    
    delete(id) {
        const mecanico = this.getById(id);
        if (mecanico && mecanico.status === 'Lenda') {
            showToast('Mecânicos lendários não podem ser removidos!', 'error');
            return false;
        }
        let mecanicos = this.getAll();
        mecanicos = mecanicos.filter(m => m.id !== parseInt(id));
        Storage.set('mecanicos', mecanicos);
        return true;
    }
};

// ===================================
// CRUD - Ordens de Serviço
// ===================================
const OrdensDB = {
    getAll() {
        return Storage.get('ordens') || [];
    },
    
    getById(id) {
        const ordens = this.getAll();
        return ordens.find(o => o.id === parseInt(id));
    },
    
    create(ordem) {
        const ordens = this.getAll();
        const newId = ordens.length > 0 ? Math.max(...ordens.map(o => o.id)) + 1 : 2401;
        const novaOrdem = {
            ...ordem,
            id: newId,
            dataAbertura: new Date().toISOString(),
            status: ordem.status || 'Em Andamento'
        };
        ordens.push(novaOrdem);
        Storage.set('ordens', ordens);
        return novaOrdem;
    },
    
    update(id, ordemData) {
        const ordens = this.getAll();
        const index = ordens.findIndex(o => o.id === parseInt(id));
        if (index !== -1) {
            if (ordemData.status === 'Concluída' && !ordens[index].dataConclusao) {
                ordemData.dataConclusao = new Date().toISOString();
            }
            ordens[index] = { ...ordens[index], ...ordemData };
            Storage.set('ordens', ordens);
            return ordens[index];
        }
        return null;
    },
    
    delete(id) {
        let ordens = this.getAll();
        ordens = ordens.filter(o => o.id !== parseInt(id));
        Storage.set('ordens', ordens);
        return true;
    }
};

// ===================================
// CRUD - Estoque
// ===================================
const EstoqueDB = {
    getAll() {
        return Storage.get('estoque') || [];
    },
    
    getById(id) {
        const estoque = this.getAll();
        return estoque.find(e => e.id === parseInt(id));
    },
    
    create(item) {
        const estoque = this.getAll();
        const newId = estoque.length > 0 ? Math.max(...estoque.map(e => e.id)) + 1 : 1;
        const novoItem = {
            ...item,
            id: newId,
            dataCadastro: new Date().toISOString()
        };
        estoque.push(novoItem);
        Storage.set('estoque', estoque);
        return novoItem;
    },
    
    update(id, itemData) {
        const estoque = this.getAll();
        const index = estoque.findIndex(e => e.id === parseInt(id));
        if (index !== -1) {
            estoque[index] = { ...estoque[index], ...itemData };
            Storage.set('estoque', estoque);
            
            // Verificar estoque baixo
            if (estoque[index].quantidade <= estoque[index].quantidadeMinima) {
                showToast(`Alerta: Estoque baixo de ${estoque[index].nome}!`, 'warning');
            }
            
            return estoque[index];
        }
        return null;
    },
    
    delete(id) {
        let estoque = this.getAll();
        estoque = estoque.filter(e => e.id !== parseInt(id));
        Storage.set('estoque', estoque);
        return true;
    },
    
    baixaEstoque(id, quantidade) {
        const item = this.getById(id);
        if (item) {
            const novaQuantidade = item.quantidade - quantidade;
            if (novaQuantidade < 0) {
                showToast('Quantidade insuficiente em estoque!', 'error');
                return false;
            }
            return this.update(id, { quantidade: novaQuantidade });
        }
        return false;
    }
};

// ===================================
// CRUD - Financeiro
// ===================================
const FinanceiroDB = {
    getAll() {
        return Storage.get('financeiro') || [];
    },
    
    getById(id) {
        const financeiro = this.getAll();
        return financeiro.find(f => f.id === parseInt(id));
    },
    
    create(lancamento) {
        const financeiro = this.getAll();
        const newId = financeiro.length > 0 ? Math.max(...financeiro.map(f => f.id)) + 1 : 1;
        const novoLancamento = {
            ...lancamento,
            id: newId,
            data: lancamento.data || new Date().toISOString()
        };
        financeiro.push(novoLancamento);
        Storage.set('financeiro', financeiro);
        return novoLancamento;
    },
    
    update(id, lancamentoData) {
        const financeiro = this.getAll();
        const index = financeiro.findIndex(f => f.id === parseInt(id));
        if (index !== -1) {
            financeiro[index] = { ...financeiro[index], ...lancamentoData };
            Storage.set('financeiro', financeiro);
            return financeiro[index];
        }
        return null;
    },
    
    delete(id) {
        let financeiro = this.getAll();
        financeiro = financeiro.filter(f => f.id !== parseInt(id));
        Storage.set('financeiro', financeiro);
        return true;
    },
    
    getTotais() {
        const lancamentos = this.getAll();
        const receitas = lancamentos
            .filter(l => l.tipo === 'Receita')
            .reduce((sum, l) => sum + l.valor, 0);
        const despesas = lancamentos
            .filter(l => l.tipo === 'Despesa')
            .reduce((sum, l) => sum + l.valor, 0);
        return {
            receitas,
            despesas,
            saldo: receitas - despesas
        };
    }
};

// ===================================
// Inicializar ao carregar a página
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    initDefaultData();
    console.log('✅ Sistema de dados inicializado!');
});
