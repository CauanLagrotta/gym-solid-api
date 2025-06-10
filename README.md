# Gym pass style app

## Requisitos funcionais:
- [ ] Deve ser possivel se cadastrar
- [ ] Deve ser possivel se autenticar
- [ ] Deve ser possivel obter o perfil do usuario logado
- [ ] Deve ser possivel obter o numero de check-ins realizados pelo usuario logado
- [ ] Deve ser possivel o usuario obter seu historico de check-ins
- [ ] Deve ser possivel o usuario buscar academias proximas
- [ ] Deve ser possivel o usuario buscar academias pelo nome
- [ ] Deve ser possivel realizar check-in em uma academia
- [ ] Deve ser possivel validar o check-in de um usuario
- [ ] Deve ser possivel cadastrar uma academia

## Regras de negocio
- [ ] O usuario nao deve poder se cadastrar com um email duplicado
- [ ] O usuario nao pode fazer dois check-ins no mesmo dia
- [ ] O usuario nao pode fazer check-ins se nao estiver 100m da academia
- [ ] O check-in so pode ser validado ate 20min apos criado
- [ ] O check-in so pode ser validado por admins
- [ ] A academia so pode ser cadastrada por admins

## Requisitos nao funcionais
- [ ] A senha do usuario precisa estar criptografada
- [ ] Os dados da aplicacao precisam estar persistidos em um banco de dados postgreSQL
- [ ] Todas as listas de dados precisam estar paginadas com 20 itens por pagina
- [ ] O usuario deve ser identificado por um JWT