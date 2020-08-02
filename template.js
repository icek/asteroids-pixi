import { promises as fs } from 'fs';

export const template = async ({ files }) => {
  const file = await fs.readFile('src/index.html', 'utf8');
  return file.replace(
    /<script src="index.ts"><\/script>/gm,
    files.js.map(({ fileName }) => `<script src="${fileName}"></script>`).join('\n'),
  );
};
