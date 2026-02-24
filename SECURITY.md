# Política de Segurança

## 🛡️ Versões Suportadas

Atualmente, estamos fornecendo atualizações de segurança para as seguintes versões:

| Versão | Suportada          |
| ------ | ------------------ |
| 4.0.x  | ✅ Sim             |
| 3.x.x  | ❌ Não             |
| < 3.0  | ❌ Não             |

## 🔒 Reportando uma Vulnerabilidade

A segurança do projeto Volmaster Tech é levada a sério. Se você descobrir uma vulnerabilidade de segurança, por favor, siga estes passos:

### 1. **NÃO abra uma Issue pública**
Vulnerabilidades de segurança não devem ser divulgadas publicamente até que sejam corrigidas.

### 2. **Entre em contato diretamente**
Envie um email para: **vendas.volmastertech@gmail.com**

Inclua as seguintes informações:
- Descrição detalhada da vulnerabilidade
- Passos para reproduzir o problema
- Impacto potencial
- Sugestões de correção (se possível)

### 3. **Aguarde nossa resposta**
- Você receberá uma confirmação em até 48 horas
- Manteremos você informado sobre o progresso
- Creditaremos sua descoberta (se desejar)

## 🔐 Práticas de Segurança

### Dados Sensíveis
- ✅ Nenhuma senha ou credencial é armazenada no código
- ✅ Formulário de contato não armazena dados localmente
- ✅ Integração WhatsApp usa apenas links públicos

### Código Seguro
- ✅ Validação de entrada no formulário de contato
- ✅ Sanitização de dados antes de exibição
- ✅ Sem execução de código dinâmico não confiável
- ✅ Sem uso de `eval()` ou `innerHTML` inseguro

### Dependências
- ✅ Projeto usa JavaScript vanilla (sem dependências externas)
- ✅ Google Fonts carregado via HTTPS
- ✅ Todas as imagens são locais

### Recursos de Segurança
```html
<!-- Content Security Policy (adicionar ao HTML se necessário) -->
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:;">
```

## 🚨 Vulnerabilidades Conhecidas

Atualmente, não há vulnerabilidades conhecidas na versão 4.0.x.

## 📝 Histórico de Segurança

### v4.0.0 (24/02/2026)
- ✅ Implementação de validação de formulário
- ✅ Sanitização de entrada de dados
- ✅ Remoção de código inseguro

### v3.0.0 (Versão anterior)
- ℹ️ Nenhum problema de segurança reportado

## 🔍 Auditoria de Segurança

Para auditar o código:

```bash
# Verificar código JavaScript
npm audit (se usar npm no futuro)

# Validar HTML
https://validator.w3.org/

# Validar CSS
https://jigsaw.w3.org/css-validator/

# Testar segurança de headers
https://securityheaders.com/
```

## 📋 Checklist de Segurança

- [x] Validação de entrada no formulário
- [x] Sanitização de dados
- [x] HTTPS obrigatório em produção
- [x] Sem dependências externas vulneráveis
- [x] Código fonte público e auditável
- [x] Sem armazenamento de dados sensíveis
- [x] Links WhatsApp seguros
- [x] Imagens otimizadas e seguras

## 🤝 Responsabilidade Compartilhada

### Nossa Responsabilidade
- ✅ Manter o código seguro e atualizado
- ✅ Corrigir vulnerabilidades reportadas
- ✅ Documentar práticas de segurança

### Sua Responsabilidade (ao usar o projeto)
- ✅ Manter o servidor atualizado
- ✅ Usar HTTPS em produção
- ✅ Configurar headers de segurança adequados
- ✅ Fazer backups regulares
- ✅ Monitorar logs de acesso

## 📞 Contato de Segurança

**Email de Segurança**: vendas.volmastertech@gmail.com
**Resposta Esperada**: 48 horas
**Horário de Atendimento**: Segunda a Sexta, 8h às 18h (Horário de Brasília)

---

**Última atualização**: 24 de fevereiro de 2026

Obrigado por ajudar a manter o Volmaster Tech seguro! 🛡️
