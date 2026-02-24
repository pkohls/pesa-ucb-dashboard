# PESA - UCB Dashboard
## Permanência Estudantil e Sucesso Acadêmico

Dashboard interativo para apresentação estratégica do Setor de Permanência Estudantil e Sucesso Acadêmico (PESA) da Universidade Católica de Brasília.

### 📋 Características

- **12 Seções Integradas**: Visão Geral, Ser Estudante Universitário, Programa de Mentoria, Acolhida Acadêmica, Stay360, Pesquisa, Impacto Financeiro, Acompanhamento, Análise Científica, Histórias de Sucesso, Roadmap 2026-2029
- **Dados Científicos**: Análise baseada em pesquisa com 5.227 estudantes
- **Visualizações Interativas**: Gráficos dinâmicos com Recharts
- **Design Responsivo**: Interface moderna e adaptável para mobile/desktop
- **Menu de Navegação**: Acesso rápido a todas as seções

### 🚀 Instalação

#### Pré-requisitos
- Node.js 18+ 
- pnpm (ou npm/yarn)

#### Passos

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/pesa-ucb-dashboard.git
cd pesa-ucb-dashboard
```

2. **Instale as dependências**
```bash
pnpm install
```

3. **Inicie o servidor de desenvolvimento**
```bash
pnpm run dev
```

O dashboard estará disponível em `http://localhost:5173`

### 📦 Build para Produção

```bash
pnpm run build
```

Isso gera os arquivos otimizados na pasta `dist/`.

### 🌐 Deployment no Vercel

#### Opção 1: Via GitHub (Recomendado)

1. **Push para GitHub**
```bash
git add .
git commit -m "Initial commit: PESA Dashboard"
git push origin main
```

2. **Conecte ao Vercel**
   - Acesse [vercel.com](https://vercel.com)
   - Clique em "New Project"
   - Selecione seu repositório GitHub
   - Vercel detectará automaticamente as configurações
   - Clique em "Deploy"

#### Opção 2: Deploy Direto via CLI

1. **Instale Vercel CLI**
```bash
npm i -g vercel
```

2. **Faça deploy**
```bash
vercel
```

Siga as instruções interativas para configurar seu projeto.

### 📊 Estrutura do Projeto

```
pesa_growth_dashboard/
├── client/
│   ├── public/          # Arquivos estáticos
│   ├── src/
│   │   ├── pages/       # Componentes de página
│   │   ├── components/  # Componentes reutilizáveis
│   │   ├── App.tsx      # Roteamento principal
│   │   └── index.css    # Estilos globais
│   └── index.html       # Template HTML
├── server/              # Servidor Express (placeholder)
├── shared/              # Tipos compartilhados
├── package.json         # Dependências
├── vite.config.ts       # Configuração Vite
└── tsconfig.json        # Configuração TypeScript
```

### 🛠️ Tecnologias Utilizadas

- **React 19** - Framework UI
- **TypeScript** - Tipagem estática
- **Tailwind CSS 4** - Estilização
- **Recharts** - Visualização de dados
- **shadcn/ui** - Componentes UI
- **Wouter** - Roteamento cliente
- **Vite** - Build tool

### 📈 Dados e Métricas

O dashboard apresenta:
- **5.227** Estudantes Monitorados
- **292** Acolhida Acadêmica Bolsistas
- **138** Estudantes Mentoria
- **100%** Meta 2029

### 🔐 Variáveis de Ambiente

Para desenvolvimento local, crie um arquivo `.env.local`:

```env
VITE_APP_TITLE=PESA - UCB
VITE_APP_ID=pesa-ucb-dashboard
```

### 📝 Licença

© 2026 Universidade Católica de Brasília. Todos os direitos reservados.

### 📞 Suporte

Para dúvidas ou sugestões sobre o dashboard:
- Email: pesa@ucb.br
- Bloco R - Sala 206, Campus UCB

---

**Desenvolvido com ❤️ para o PESA - UCB**
