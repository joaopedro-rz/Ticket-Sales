# Ticket Sales System

O **Ticket Sales System** é um sistema de venda de ingressos desenvolvido para facilitar a compra e gerenciamento de ingressos online. Ele permite que os usuários comprem ingressos, visualizem seu histórico de compras e gerenciem seus dados, enquanto os administradores podem criar, atualizar e excluir ingressos.

---

## Funcionalidades

### **Usuários Comuns**:
- Registrar uma nova conta.
- Fazer login na plataforma.
- Visualizar lista de ingressos disponíveis.
- Comprar ingressos.
- Visualizar histórico de compras.
- Ver detalhes de um ingresso adquirido.

### **Administradores**:
- Criar novos ingressos.
- Atualizar informações de ingressos existentes.
- Excluir ingressos.
- Gerenciar usuários.

---
## Rotas da API
 ```bash
Autenticação:
    POST /api/auth/register: Registrar um novo usuário.
    POST /api/auth/login: Fazer login e obter token JWT.
Usuários:
    GET /api/users: Listar todos os usuários (apenas administradores).
    GET /api/users/:id : Obter detalhes de um usuário específico.
    PUT /api/users/:id : Atualizar informações de um usuário.
    DELETE /api/users/:id : Excluir um usuário (apenas administradores).
Ingressos:
    GET /api/tickets: Listar todos os ingressos disponíveis.
    GET /api/tickets/:id : Obter detalhes de um ingresso específico.
    POST /api/tickets: Criar um novo ingresso (apenas administradores).
    PUT /api/tickets/:id : Atualizar informações de um ingresso (apenas administradores).
    DELETE /api/tickets/:id : Excluir um ingresso (apenas administradores).
Compras:
    POST /api/purchases: Realizar uma compra de ingressos.
    GET /api/purchases/history: Visualizar histórico de compras do usuário logado.
    GET /api/purchases/:id : Visualizar detalhes de uma compra específica.
