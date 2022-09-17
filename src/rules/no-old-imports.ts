import { Rule } from 'eslint'

const newLibrary = 'newLibrary';

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
        if(!context.options[0] || !context.options[0].oldLibs) return;
        const excludedLibraries = context.options[0].oldLibs;
        if(excludedLibraries.some((e: string) => e === node.source.value))
        context.report({
          messageId: 'noOldLibs',
          node,
          fix: fixer => {
            return fixer.replaceText(
              node, 
              node.specifiers
              .filter(specifier  => specifier.type === 'ImportSpecifier' )
              .map(specifier => {
                return `import {${specifier.local.name}} from '${newLibrary}'`}
                )
              .join('\n')
            )}
        })
      },
    }
  },
}

export = rule
