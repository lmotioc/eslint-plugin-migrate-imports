import { RuleTester } from 'eslint'
import rule from './no-old-imports'

const options =  [{
  "oldLibs": ["LibA", "LibB"],
  "newLibs": {
    "frontend-libraires": []
  }
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
      output: "import {Button} from 'newLibrary'",
      options: options
    },
    {
      code: "import {Button, Modal} from 'oldLibrary'",
      output: "import {Button} from 'newLibrary'\nimport {Modal} from 'newLibrary'",
      errors: [{messageId: 'noOldLibs'}],
      options: options
    },
    {
      code: "import {Button} from 'theOtherOldLibrary'",
      output: "import {Button} from 'newLibrary'",
      errors: [{messageId: 'noOldLibs'}],
      options: options
    }
  ],
})

// import { Button, Stepper } from 'common-libraries/components/complystation';
// import { EntityContext, DetailContext } from 'common-libraries/components/appsettings';
// import { Popover, Badge } from 'common-libraries/components/mui';

// import { RemoveIcon, Typography } from 'common-libraries/styles';
// import { GeneralHelper, useList } from 'common-libraries/system';
