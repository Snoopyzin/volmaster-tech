# 📂 Estrutura de Pastas e Arquivos

Este documento detalha a organização completa do projeto Volmaster Tech.

## 🌳 Árvore de Diretórios

```
volmaster-agenda/
│
├── 📄 index.html                    # Página inicial com carousel
├── 📄 produtos.html                 # Catálogo de cursos em grid
├── 📄 contatos.html                 # Formulário e informações de contato
│
├── 🎨 styles.css                    # Estilos globais (1000+ linhas)
├── ⚙️ scripts.js                    # JavaScript funcional (200 linhas)
│
├── 📸 volmaster/                    # Pasta de imagens dos cursos
│   ├── Diagnostico completo do FH4 EURO 6.jpeg
│   ├── motor d13K euro 6.jpeg
│   ├── ELETRICIDADE E ELETRÔNICA DO FH CLÁSSICO 30 de março.jpg
│   ├── ELETRICIDADE E ELETRONICA DO FH CLASSICO.jpeg
│   ├── CAIXA I-SHIFT VERSÃO F E G.jpeg
│   ├── ELETRICIDADE E ELETRONICA VM EURO 6.jpeg
│   ├── MOTOR D8K VM VM EURO 6.jpeg
│   ├── MOTOR SCANIA SUPER EURO6 16 A 19 DE JUNHO.jpg
│   └── SISTEMA DE PÓS TRATAMENTO DOS GASES EURO 5 EURO 6 E VM.jpeg
│
├── 📚 Documentação
│   ├── README.md                    # Documentação principal do projeto
│   ├── CHANGELOG.md                 # Histórico de versões e mudanças
│   ├── CONTRIBUTING.md              # Guia para contribuidores
│   ├── DEPLOY.md                    # Instruções de deploy
│   ├── CODE_OF_CONDUCT.md           # Código de conduta da comunidade
│   ├── SECURITY.md                  # Política de segurança
│   ├── LICENSE                      # Licença MIT
│   └── FOLDER_STRUCTURE.md          # Este arquivo
│
├── 🔧 Arquivos de Configuração
│   ├── .gitignore                   # Arquivos ignorados pelo Git
│   ├── .gitattributes               # Configurações de atributos Git
│   ├── robots.txt                   # Instruções para crawlers
│   └── sitemap.txt                  # Mapa do site
│
└── 📁 vmt/                          # Pasta adicional (recursos extras)
    └── index.html

```

## 📄 Descrição dos Arquivos Principais

### Páginas HTML (3 arquivos)

#### `index.html` - Página Inicial
- **Propósito**: Homepage com carousel interativo
- **Componentes**:
  - Header com navegação
  - Carousel com 9 slides de cursos
  - Setas de navegação (prev/next)
  - Indicadores de slides (dots)
  - Footer com informações da empresa
  - Botão flutuante do WhatsApp
- **Tamanho**: ~400 linhas
- **Dependências**: `styles.css`, `scripts.js`, imagens da pasta `/volmaster/`

#### `produtos.html` - Catálogo de Produtos
- **Propósito**: Grid de todos os cursos disponíveis
- **Componentes**:
  - Header com navegação
  - Grid responsivo (3 colunas → 2 → 1)
  - 9 cards de produtos
  - Cada card tem: imagem, título, descrição, botão "Saiba Mais"
  - Footer
  - Botão flutuante do WhatsApp
- **Tamanho**: ~350 linhas
- **Dependências**: `styles.css`, imagens da pasta `/volmaster/`

#### `contatos.html` - Página de Contatos
- **Propósito**: Formulário de contato e informações da empresa
- **Componentes**:
  - Header com navegação
  - Formulário de contato (nome, email, telefone, assunto, mensagem)
  - Seção de informações (endereço, telefone, email, horário)
  - Links para redes sociais (YouTube, Instagram, Facebook)
  - Footer
  - Botão flutuante do WhatsApp
- **Tamanho**: ~250 linhas
- **Dependências**: `styles.css`, `scripts.js`

### Arquivos de Estilo e Script

#### `styles.css` - Folha de Estilos Principal
- **Propósito**: Todos os estilos do site
- **Estrutura**:
  ```css
  /* 1. Reset e Variáveis Globais */
  * { margin: 0; padding: 0; box-sizing: border-box; }
  
  /* 2. Estilos do Header e Navegação */
  header { ... }
  nav { ... }
  
  /* 3. Estilos do Carousel (index.html) */
  .carousel { ... }
  .item { ... }
  .dots { ... }
  
  /* 4. Estilos de Produtos (produtos.html) */
  .product-grid { ... }
  .product-card { ... }
  
  /* 5. Estilos de Contatos (contatos.html) */
  .contact-form { ... }
  .contact-info { ... }
  
  /* 6. Estilos do Footer */
  footer { ... }
  
  /* 7. Botão flutuante WhatsApp */
  .whatsapp-button { ... }
  
  /* 8. Media Queries */
  @media (max-width: 768px) { ... }
  @media (max-width: 480px) { ... }
  
  /* 9. Animações */
  @keyframes fadeIn { ... }
  @keyframes slideInFromRight { ... }
  ```
- **Tamanho**: ~1000 linhas
- **Tecnologias**:
  - CSS Grid e Flexbox
  - Animações com `@keyframes`
  - Transições suaves
  - Variáveis CSS (cores)
  - Media queries responsivas

#### `scripts.js` - JavaScript Principal
- **Propósito**: Todas as funcionalidades interativas
- **Estrutura**:
  ```javascript
  // ============================================
  // SEÇÃO 1: CAROUSEL (index.html)
  // ============================================
  const items = document.querySelectorAll('.item');
  let currentIndex = 0;
  
  function createDots() { ... }
  function update() { ... }
  function goToSlide() { ... }
  
  // ============================================
  // SEÇÃO 2: FORMULÁRIO DE CONTATO (contatos.html)
  // ============================================
  const form = document.querySelector('.contact-form');
  form.addEventListener('submit', (e) => { ... });
  
  // ============================================
  // SEÇÃO 3: BOTÃO WHATSAPP (todas as páginas)
  // ============================================
  const whatsappBtn = document.querySelector('.whatsapp-button');
  
  // ============================================
  // SEÇÃO 4: BOTÃO TOPO (scroll to top)
  // ============================================
  const scrollToTopBtn = document.createElement('button');
  ```
- **Tamanho**: ~200 linhas
- **Funcionalidades**:
  - Carousel automático (5 segundos)
  - Navegação com setas
  - Navegação com dots clicáveis
  - Validação de formulário
  - Scroll to top
  - Animações suaves

### Imagens (9 arquivos)

#### Pasta `/volmaster/`
Todas as imagens dos cursos em alta qualidade:

| Arquivo | Curso | Formato | Uso |
|---------|-------|---------|-----|
| `Diagnostico completo do FH4 EURO 6.jpeg` | Diagnóstico FH4 EURO 6 | JPEG | Slide 1 / Card 1 |
| `motor d13K euro 6.jpeg` | Motor D13K EURO 6 | JPEG | Slide 2 / Card 2 |
| `ELETRICIDADE E ELETRÔNICA DO FH CLÁSSICO 30 de março.jpg` | Eletricidade FH Clássico (Turma 1) | JPG | Slide 3 / Card 3 |
| `ELETRICIDADE E ELETRONICA DO FH CLASSICO.jpeg` | Eletricidade FH Clássico (Turma 2) | JPEG | Slide 4 / Card 4 |
| `CAIXA I-SHIFT VERSÃO F E G.jpeg` | Caixa I-SHIFT | JPEG | Slide 5 / Card 5 |
| `ELETRICIDADE E ELETRONICA VM EURO 6.jpeg` | Eletricidade VM EURO 6 | JPEG | Slide 6 / Card 6 |
| `MOTOR D8K VM VM EURO 6.jpeg` | Motor D8K VM EURO 6 | JPEG | Slide 7 / Card 7 |
| `MOTOR SCANIA SUPER EURO6 16 A 19 DE JUNHO.jpg` | Motor Scania Super EURO 6 | JPG | Slide 8 / Card 8 |
| `SISTEMA DE PÓS TRATAMENTO DOS GASES EURO 5 EURO 6 E VM.jpeg` | Pós Tratamento de Gases | JPEG | Slide 9 / Card 9 |

**Recomendações**:
- Manter resolução alta para qualidade visual
- Considerar compressão para melhor performance
- Usar formatos WebP como fallback (futuro)

### Documentação (8 arquivos)

#### `README.md` - Documentação Principal
- Visão geral do projeto
- Recursos e características
- Instruções de instalação
- Como usar
- Tecnologias utilizadas
- Lista completa dos 9 cursos
- Informações de contato

#### `CHANGELOG.md` - Histórico de Versões
- Registro de todas as mudanças
- Versões: 4.0, 3.0, 2.0, 1.0
- Data de cada release
- Novos recursos, correções, melhorias

#### `CONTRIBUTING.md` - Guia de Contribuição
- Como contribuir com o projeto
- Padrões de código
- Processo de Pull Request
- Boas práticas

#### `DEPLOY.md` - Guia de Deploy
- Instruções para publicar no GitHub Pages
- Deploy em Netlify
- Deploy em Vercel
- Configurações de servidor

#### `CODE_OF_CONDUCT.md` - Código de Conduta
- Padrões de comportamento
- Responsabilidades
- Processo de reporte

#### `SECURITY.md` - Política de Segurança
- Como reportar vulnerabilidades
- Versões suportadas
- Práticas de segurança

#### `LICENSE` - Licença MIT
- Termos de uso do projeto
- Direitos autorais

#### `FOLDER_STRUCTURE.md` - Este Arquivo
- Estrutura completa do projeto
- Descrição de cada arquivo
- Organização e propósito

### Arquivos de Configuração (4 arquivos)

#### `.gitignore`
```
# OS
.DS_Store
Thumbs.db

# Editor
.vscode/
.idea/
*.swp

# Logs
*.log

# Temporários
*.tmp
*.bak
```

#### `.gitattributes`
```
* text=auto
*.html text eol=lf
*.css text eol=lf
*.js text eol=lf
*.jpg binary
*.jpeg binary
```

#### `robots.txt`
```
User-agent: *
Allow: /

Sitemap: https://seusite.com/sitemap.txt
```

#### `sitemap.txt`
```
https://seusite.com/
https://seusite.com/produtos.html
https://seusite.com/contatos.html
```

## 📊 Estatísticas do Projeto

| Métrica | Valor |
|---------|-------|
| Total de Arquivos | ~25 |
| Páginas HTML | 3 |
| Linhas de CSS | ~1000 |
| Linhas de JavaScript | ~200 |
| Imagens | 9 |
| Arquivos de Documentação | 8 |
| Cursos Cadastrados | 9 |
| Tamanho Total | ~15 MB (com imagens) |

## 🔄 Fluxo de Navegação

```
┌─────────────┐
│  index.html │ ◄─── Página Inicial (Carousel)
└──────┬──────┘
       │
       ├────► produtos.html   (Grid de cursos)
       │
       ├────► contatos.html   (Formulário)
       │
       └────► WhatsApp        (Link externo)
```

## 🎯 Convenções de Nomenclatura

### Arquivos HTML
- Minúsculas
- Sem espaços
- Descritivos
- Exemplo: `produtos.html`, `contatos.html`

### Arquivos CSS
- Kebab-case
- Exemplo: `styles.css`

### Arquivos JavaScript
- Kebab-case
- Exemplo: `scripts.js`

### Imagens
- Nomes descritivos
- Maiúsculas permitidas
- Espaços permitidos
- Exemplo: `MOTOR D8K VM VM EURO 6.jpeg`

### Documentação
- SCREAMING_SNAKE_CASE para guidelines
- Exemplo: `README.md`, `CHANGELOG.md`, `CONTRIBUTING.md`

## 🚀 Próximas Melhorias na Estrutura

- [ ] Criar pasta `/assets/` separando imagens, fontes, ícones
- [ ] Adicionar pasta `/js/` para múltiplos scripts
- [ ] Criar pasta `/css/` para modularização de estilos
- [ ] Adicionar pasta `/docs/` para documentação detalhada
- [ ] Implementar `/src/` e `/dist/` para build process
- [ ] Adicionar `/tests/` para testes automatizados

## 📞 Manutenção da Estrutura

Para manter a organização:

1. **Nunca** mova arquivos sem atualizar os links
2. **Sempre** use caminhos relativos
3. **Mantenha** a pasta `/volmaster/` para imagens
4. **Atualize** esta documentação ao adicionar arquivos
5. **Siga** as convenções de nomenclatura

---

**Última atualização**: 24 de fevereiro de 2026
**Versão da Estrutura**: 4.0.0

📧 **Dúvidas?** Entre em contato: vendas.volmastertech@gmail.com
