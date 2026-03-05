# AIFCA Frontend (Part 1)

Next.js 14 frontend for AIFCA with:
- Public landing page
- GitHub SSO auth pages
- Protected dashboard shell and routes
- Design system tokens, motifs, and skeleton loading

## Local Development

1. Install dependencies:
```bash
npm ci
```

2. Add local env:
```bash
cp .env.example .env.local
```

3. Generate Prisma client:
```bash
npx prisma generate
```

4. Run app:
```bash
npm run dev
```

## Quality Checks

```bash
npm run lint
npm run build
```

## Azure Production Deploy (GitHub Actions)

This repo deploys on each `main` push via:
- `.github/workflows/deploy-main.yml`

### Required GitHub Secret

- `AZURE_WEBAPP_PUBLISH_PROFILE_AIFCA_PROD`
  - Value: publish profile XML for Azure Web App `aifca-meghaboi`

### Required Azure App Settings

- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_APP_NAME`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `GITHUB_CLIENT_ID`
- `GITHUB_CLIENT_SECRET`
- `DATABASE_URL`
- `AZURE_AI_FOUNDRY_ENDPOINT`
- `AZURE_AI_FOUNDRY_API_KEY`
- `AZURE_AI_FOUNDRY_DEPLOYMENT`
- `AZURE_AI_FOUNDRY_API_VERSION`

### Azure Runtime Settings

- `SCM_DO_BUILD_DURING_DEPLOYMENT=true`
- `WEBSITE_NODE_DEFAULT_VERSION=~20`

## Notes

- Footer includes: `Made by Meghanadh`
- Deployment target is `https://aifca-meghaboi.azurewebsites.net`
