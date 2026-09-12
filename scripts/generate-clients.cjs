const { execFileSync } = require('node:child_process');
const path = require('node:path');
const cwd = path.resolve(__dirname, '..');
const run = args => execFileSync(process.execPath, args, { cwd, stdio: 'inherit' });
run(['scripts/postgres-schema.cjs', '--check']);
run(['node_modules/prisma/build/index.js', 'generate']);
run(['node_modules/prisma/build/index.js', 'generate', '--config', 'prisma.postgresql.config.ts']);
