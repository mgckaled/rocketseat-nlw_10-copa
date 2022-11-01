# NLW Copa - 10° edição

<p align="center">
<a href="#sobre-o-projeto">Sobre o Projeto</a> •
<a href="#tecnologias">Tecnologias</a> •
<a href="#configurações-necessárias">Configurações necessárias</a> •
<a href="#licença">Licença</a> •
<a href="#autor">Autor</a>
</p>

## Sobre o projeto

Aplicação desenvolvida pela equipe da Rocketseat que registra apostas(bolões) para os jogos Copa do Mundo de 2022.

---

## Tecnologias

- [Visual Studio Code](https://code.visualstudio.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Node](https://nodejs.org/)
- [Git](https://git-scm.com/)
- [GitHub](https://github.com/)
- [ReactJS](https://reactjs.org/)
- [React Native](https://reactnative.dev/)
- [NextJS](https://nextjs.org/)
- [Expo](https://expo.dev/)
- [Expo Go](https://expo.dev/client)
- [Prisma](https://www.prisma.io/)
- [Fastify](https://www.fastify.io/)

---

## Configurações necessárias

### **Requisitos**

Necessário realizar as instalações:

- [Git](https://git-scm.com/)
- [npm](https://www.npmjs.com/)
- [Node](https://nodejs.org/)
- [Expo](https://docs.expo.dev/)
- [Expo Go](https://expo.dev/client)

Necessário criar contas

- [GitHub](https://github.com/)

Criar conta e configurar os serviços externos:

```bash
# Execute o comando git clone para realizar o clone do repositório
$ git clone https://github.com/mgkclaed/rocketseat-nlw_10-copa.git
# ou execute
$ gh repo clone mgckaled/rocketseat-nlw_10-copa

# Entre na pasta do repositório clonado
$ cd rocketseat-nlw_10-copa
```

### `/server`

```bash
# criar projeto /server
npm init -y

# instalar dependências
npm install

# criar arquivo tsconfig.json
npx tsc --init

# setup prisma com flag SQLite - schema prisma file / .env
npx prisma init --datasource-provider SQLite

# migration - mecanismo de versionamento de banco de dados (arquivos de instruções)
npx prisma migrate dev

# visualisar banco de dados - Prisma Studio
npx prisma studio

# Gerar ERD - Diagrama de Banco de Dados
npx prisma generate
```

### `/web`

```bash
# criar projeto /web
npx create-next-app@latest --use-npm

## instalar dependências
npm install
```

### `/mobile`

```bash
# criar projeto /mobile
npx create-expo-app mobile

## instalar dependências
npm install

# inicializar expo
npx expo start
```

## Licença

Distribuído sob a licença MIT. Veja [LICENSE](LICENSE) para mais informações.

---

## Autor

Feito por Marcel Kaled. Entre em contato!
