import { promises as fs } from 'fs';

export const template = deps => async ({ files }) => {
  const pkgJson = await fs.readFile('./package.json', 'utf8');
  const { dependencies } = JSON.parse(pkgJson);
  const scripts = deps.map(({ name, path }) =>
    `<script src="https://www.unpkg.com/${name}@${dependencies[name]}${path}"></script>`
  );
  const file = await fs.readFile('src/index.html', 'utf8');
  const jsCommentsRegEx = /<!-- scripts:begin -->(.|\s)*?<!-- scripts:end -->/gm;
  const bundle = files.js.map(({ fileName }) => `<script src="${fileName}"></script>`).join('\n');

  return file.replace(jsCommentsRegEx, `${scripts.concat(bundle).join('\n')}`);
};
