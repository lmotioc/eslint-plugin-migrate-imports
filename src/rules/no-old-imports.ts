import { Rule } from 'eslint'

const excludedLibraries = ['oldLibrary', 'theOtherOldLibrary'];

const rule: Rule.RuleModule = {
  create: context => {
    return {
      ImportDeclaration: node => {
        if(excludedLibraries.some(e=> e === node.source.value))
        context.report({
          message: '😿',
          node,
        })
      },
    }
  },
}

export = rule
