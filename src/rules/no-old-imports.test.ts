import { RuleTester } from 'eslint'

import rule from './no-old-imports'

const tester = new RuleTester({ parserOptions: { ecmaVersion: 2015 , sourceType: 'module'} })

tester.run('no-old-library-imports', rule, {
  valid: [{ code: "import {Button} from 'newLibrary/ButtonModule'" }],
  invalid: [
    {
      code: "import {Button} from 'oldLibrary'",
      errors: [{ message: '😿' }],
    },
    {
      code: "import {Button, Modal} from 'oldLibrary'",
      errors: [{ message: '😿' }],
    },
    {
      code: "import {Button} from 'theOtherOldLibrary'",
      errors: [{ message: '😿' }],
    }
  ],
})
