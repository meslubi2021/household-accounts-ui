# Household Accounts UI
This repository contains the frontend built with Nextjs and Typescript.

[Deployment Link](https://household-accounts-ui.vercel.app/)

## Overview
"Household accounts" app provides managing and coordinating assets across accounts at the household level.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)

## Installation

## Usage
To run the app
```bash
npm run dev
```
This will start the application on 'http://localhost:3000'

## Project Structure
```bash
household-accounts-UI/
  ├── app/ 
  │ ├── [lng]/                      # APP Routing
  │ │    ├── (calendar)/
  │ │    ├── login/
  │ │    └── app.tsx                # Entry point
  │ ├── lib/
  │ ├── login-process/
  │ └── ui/
  │      ├── sass/
  │      ├── shared-components/
  │      ├── calendar-page.tsx/
  │      ├── footer.tsx/
  │      └── header.tsx/
  ├── public/ 
  │ ├── assets/
  │ └── manifest.json
  ├── .env
  ├── middleware.ts
  ├── next.config.mjs
  ├── package.json
  ├── tailwind.config.ts
  ├── tsconfig.json
  └── vercel.json
```

## Contributing
1. Fort the repository.
2. Create a new branch: `git checkout -b feature/your-feautre-name` on `development` branch.
3. Whatever work you do, after it has been tested locally by hand and unit/integration tests, you will bump the major, minor, or patch versions of package.json file based on the scope of work completed. Rule of thumb is:
 - Breaking changes = bump major version
 - Additional feature(s) with no breaking changes = bump minor version
 - Chore or bug fix = bump patch version
4. Make your changes an commit them: `git commit -m 'Add some feature'`
5. Push to the branch: `git push origin feature/your-feature-name`
6. Open a pull request.