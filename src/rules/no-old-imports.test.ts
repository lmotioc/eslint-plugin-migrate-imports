import { RuleTester } from 'eslint'
import rule from './no-old-imports'

const options =  [{
  "oldLibs": ["LibA", "LibB"],
  "newLibs": [
    {key: 'new-libraries/components/complystation', values: ['Button', 'Stepper']},
    {key: 'new-libraries/components/appsettings', values: ['EntityContext', 'DetailContext']},
    {key: 'new-libraries/components/mui', values: ['Popover', 'Badge']},
    {key: 'new-libraries/styles', values: ['RemoveIcon', 'Typography']},
    {key: 'new-libraries/system', values: ['GeneralHelper', 'useList']}
  ]
}]

const tester = new RuleTester({ parserOptions: { ecmaVersion: 2015 , sourceType: 'module'}} )

tester.run('no-old-library-imports', rule, {
  valid: [{
     code: "import {Button} from 'newLibrary/ButtonModule'; \nimport {ButtonB} from 'newLibrary/ButtonModuleB';",
     options: options
   },
   {
    code: "import {Button} from 'newLibrary/ButtonModule'",
  }],
  invalid: [
    {
      code: "import {Button} from 'LibB'",
      errors: [{messageId: 'noOldLibs'}],
      output: "import {Button} from 'new-libraries/components/complystation';",
      options: options
    },
    {
      code: "import {Button, EntityContext} from 'LibB';",
      output: "import {Button} from 'new-libraries/components/complystation';\nimport {EntityContext} from 'new-libraries/components/appsettings';",
      errors: [{messageId: 'noOldLibs'}],
      options: options
    },
    {
      code: "import {Button, EntityContext} from 'LibB'\nimport {ModalB} from 'newLibrary'",
      output: "import {Button} from 'new-libraries/components/complystation';\nimport {EntityContext} from 'new-libraries/components/appsettings';\nimport {ModalB} from 'newLibrary'",
      errors: [{messageId: 'noOldLibs'}],
      options: options
    },
    {
      code: "import {Button, Stepper} from 'LibB'\nimport {ModalB} from 'newLibrary';",
      output: "import {Button, Stepper} from 'new-libraries/components/complystation';\nimport {ModalB} from 'newLibrary';",
      errors: [{messageId: 'noOldLibs'}],
      options: options
    },
  ],
})
