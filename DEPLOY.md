# 🚀 Guia de Deploy - Volmaster Tech

Este guia mostra como colocar o projeto Volmaster Tech no ar.

## 📋 Pré-requisitos

- Conta no GitHub
- Git instalado no computador
- Um navegador moderno

## 🌐 Opção 1: GitHub Pages (Recomendado - Gratuito)

### Passo 1: Criar Repositório no GitHub
1. Acesse [github.com](https://github.com)
2. Clique em "New repository"
3. Nome sugerido: `volmaster-tech`
4. Deixe como **público**
5. **NÃO** marque "Add README" (já temos um)
6. Clique em "Create repository"

### Passo 2: Subir o Projeto

```bash
# Abra o terminal na pasta do projeto
cd "c:\Users\Volmaster T.I\Desktop\projetos vscode\volmaster agenda"

# Inicialize o Git (se ainda não inicializou)
git init

# Adicione todos os arquivos
git add .

# Faça o primeiro commit
git commit -m "🎉 Primeiro commit - Volmaster Tech com 20 cursos"

# Conecte ao repositório do GitHub (substitua SEU-USUARIO)
git remote add origin https://github.com/SEU-USUARIO/volmaster-tech.git

# Envie para o GitHub
git branch -M main
git push -u origin main
```

### Passo 3: Ativar GitHub Pages
1. No repositório do GitHub, clique em **Settings**
2. No menu lateral, clique em **Pages**
3. Em "Source", selecione **main** branch
4. Clique em **Save**
5. Aguarde alguns minutos
6. Seu site estará em: `https://SEU-USUARIO.github.io/volmaster-tech/`

## 🎯 Opção 2: Netlify (Deploy Automático)

### Método 1: Via Drag & Drop
1. Acesse [netlify.com](https://www.netlify.com/)
2. Crie uma conta (gratuita)
3. Arraste a pasta do projeto para a área de deploy
4. Pronto! Site no ar em segundos

### Método 2: Via Git
1. Suba o projeto para o GitHub (passos acima)
2. Entre no Netlify
3. Clique em "Add new site" → "Import an existing project"
4. Conecte seu GitHub
5. Selecione o repositório `volmaster-tech`
6. Clique em "Deploy site"
7. Domínio customizado: `volmaster-tech.netlify.app`

## ⚡ Opção 3: Vercel (Alta Performance)

1. Acesse [vercel.com](https://vercel.com/)
2. Crie uma conta com GitHub
3. Clique em "New Project"
4. Selecione o repositório `volmaster-tech`
5. Clique em "Deploy"
6. Site disponível em: `volmaster-tech.vercel.app`

## 🖥️ Opção 4: Hospedagem Tradicional

### Arquivos necessários:
- Todos os arquivos HTML
- styles.css
- scripts.js
- Pasta `volmaster/` com as imagens

### Via FTP:
1. Contrate uma hospedagem (ex: Hostinger, HostGator)
2. Use FileZilla ou similar
3. Conecte via FTP
4. Envie todos os arquivos para `public_html/`
5. Acesse seu domínio

## 🔄 Atualizações Futuras

### Atualizar no GitHub:
```bash
# Adicione as mudanças
git add .

# Commit com mensagem descritiva
git commit -m "✨ Adiciona novo curso de treinamento"

# Envie para o GitHub
git push
```

### GitHub Pages / Netlify / Vercel
- Atualizam automaticamente após o push!

## 📱 Domínio Personalizado

### GitHub Pages:
1. Settings → Pages → Custom domain
2. Digite seu domínio (ex: `www.volmastertech.com.br`)
3. Configure DNS no seu provedor:
   - Type: **CNAME**
   - Host: **www**
   - Points to: **SEU-USUARIO.github.io**

### Netlify/Vercel:
1. Site settings → Domain management
2. Add custom domain
3. Siga as instruções de DNS

## ✅ Checklist Pré-Deploy

- [ ] Todas as imagens estão na pasta `volmaster/`
- [ ] Links do WhatsApp estão corretos
- [ ] Links das redes sociais funcionam
- [ ] Formulário de contato validado
- [ ] Testado em diferentes navegadores
- [ ] Testado em dispositivos mobile
- [ ] README.md atualizado
- [ ] .gitignore configurado

## 🔒 Segurança

- Nunca commite senhas ou chaves API
- Use variáveis de ambiente para dados sensíveis
- Mantenha as dependências atualizadas

## 📊 Monitoramento

### Google Analytics (Opcional):
1. Crie uma conta em [analytics.google.com](https://analytics.google.com)
2. Adicione o código de rastreamento antes do `</head>` em cada página HTML

### Search Console:
1. Acesse [search.google.com/search-console](https://search.google.com/search-console)
2. Adicione seu site
3. Verifique a propriedade
4. Envie o sitemap (se tiver)

## 🆘 Problemas Comuns

### Imagens não aparecem
- Verifique os caminhos: `./volmaster/nome-imagem.jpeg`
- Certifique-se que as imagens foram enviadas

### CSS não carrega
- Verifique o caminho: `<link rel="stylesheet" href="styles.css">`
- Limpe o cache do navegador (Ctrl + F5)

### Links do WhatsApp não funcionam
- Verifique o formato: `https://wa.me/556293290519`
- Teste em diferentes dispositivos

## 📞 Suporte

Se precisar de ajuda:
- WhatsApp: +55 62 9329-0519 (Suziane)
- Email: vendas.volmastertech@gmail.com
- Issues no GitHub: Abra uma issue no repositório

---

**Boa sorte com o deploy! 🚀**

Desenvolvido com ❤️ pela Volmaster Tech
