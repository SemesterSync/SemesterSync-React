SemesterSync is a tool designed to help make scheduling easier. 

## Getting Started

This project uses pnpm as the package manager, ensure you have it installed

Before running the project, make sure you copy the example.env from `dev/example.env` to the root of the project and rename it to `.env`. Make sure to replace `<USERNAME>` and `<PASSWORD>` with your MySQL servers credentials. You may also have to update the connection strings host, port, and database name depending on your setup.

After that, run the following:
```bash
pnpm install

pnpm dev
```

The app will be available at http://localhost:3000