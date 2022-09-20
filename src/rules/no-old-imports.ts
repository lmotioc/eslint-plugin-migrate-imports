import { Rule } from 'eslint'

const rule: Rule.RuleModule = {
  meta: { 
    messages: {
      noOldLibs: '😿'
    },
    fixable: 'code',
  },

  create: context => {
    return {
      ImportDeclaration: node => {
        // todo: component not found int he list 
        if(!context.options[0] || !context.options[0].oldLibs) return;
        const excludedLibraries = context.options[0].oldLibs;
        const newPaths = context.options[0].newLibs;
        if(excludedLibraries.some((e: string) => e === node.source.value))
        context.report({
          messageId: 'noOldLibs',
          node,
          fix: fixer => {
            const idetifiers = node.specifiers
            .filter(specifier => specifier && specifier.type === 'ImportSpecifier' )
            .map(specifier => {return specifier.local.name});
            
            const fixed = newPaths.map(newPath => {
                const components = idetifiers
                  .filter(i => newPath.values.includes(i))
                  .join(', ');

                if(components) { 
                  const importStatement = `import {${components}} from '${newPath.key}';`;
                  return importStatement;
                }
                return null;
             }).filter(f => f!=null).join('\n');;
             
            return fixer.replaceText(
              node, fixed
            )
          }
        })
      },
    }
  },
}

export = rule;
