# Create T3 App

This is an app bootstrapped according to the [init.tips](https://init.tips) stack, also known as the T3-Stack.
### Getting started
 - Prerequisites 
    - have nodejs and npm installed locally
    - have mysql installed 
 - install npm packages

```bash
    npm i 
```
- set up a local mysql-server and edit uri string located in the environment file .env
  ```bash
  DATABASE_URL=mysql://{user}:{password}@localhost:3306/{database-name}

  ```
- start the local development server
- using the command 
```bash
  npm run dev 
``` 
