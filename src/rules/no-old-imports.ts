import { Rule } from 'eslint'

const excludedLibraries = ['oldLibrary', 'theOtherOldLibrary'];
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
        if(excludedLibraries.some(e=> e === node.source.value))
        context.report({
          messageId: 'noOldLibs',
          node,
          fix: fixer => 
            fixer.replaceText(
              node, 
              node.specifiers
              //.filter(specifier  => specifier.type === 'ImportSpecifier' )
              .map(specifier => {
                console.log(specifier)
                return `import {${specifier.local.name}} from '${newLibrary}'`}
                )
              .join('\n')
            ),
        })
      },
    }
  },
}

export = rule
