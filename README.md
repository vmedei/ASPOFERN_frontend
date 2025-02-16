# Sistema ASPOFERN

Esse é um projeto elaborado em [Next.js](https://nextjs.org) para ASPOFERN, integracom dom um backend FastAPI.

## Tecnologias Usadas

- **Frontend:**
  - Next.js 14
  - React 18
  - TypeScript
  - Tailwind CSS
  - DaisyUI
  - Axios
  - TanStack React Table

- **Backend:**
  - FastAPI
  - Python 3
  - Pandas
  - Uvicorn
  - OpenPyXL
  - XLRD

## Iniciando

### Frontend

Faça a instalação das dependências: 

```
npm install
```

Execute o ambiente de desenvolvimento:

```
npm run dev
```

Abra a página [http://localhost:3000](http://localhost:3000) no seu navegador.

### Backend

1. Crie um Ambiente Virtual:

```
python -m venv .venv
```

2. Instale as Dependências:

```
pip install -r requirements.txt
```

3. Ative o Ambiente Virtual:

   Windows:
   ```
   .venv\Scripts\activate
   ```
   
   Linux/macOS:
   ```
   source .venv/bin/activate
   ```

4. Execute a API:

## API Endpoints

- **POST /uploadfiles/**: Faz Upload e processa os arquivos
- **GET /download/{filename}**: faz o download do arquivo gerado

## Learn More

To learn more about the technologies used, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [FastAPI Documentation](https://fastapi.tiangolo.com/) - learn about FastAPI features.
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - learn about Tailwind CSS.
- [DaisyUI Documentation](https://daisyui.com/docs/install/) - learn about DaisyUI components.

## Deploy

For deployment options, refer to:

- [Next.js deployment documentation](https://nextjs.org/docs/deployment)
- [FastAPI deployment documentation](https://fastapi.tiangolo.com/deployment/)