---
lastUpdated: 2026-04-17T20:53:42.039Z
---
# वर्ग-वैलिडेटर के साथ कस्टम सत्यापन

कभी कभी अंतर्निहित tsoa-next सत्यापनकर्ता आवेदन-विशिष्ट वर्कफ़्लो के लिए पर्याप्त नहीं है। उस मामले में आप अपने खुद के सत्यापन मिडलवेयर संलग्न कर सकते हैं, उदाहरण के लिए, उदाहरण के लिए `class-validator`।
प्रासंगिक एपीआई संदर्भ: [`@Middlewares`](./reference/tsoa-next/functions/Middlewares.md), [`ValidateError`](./reference/tsoa-next/classes/ValidateError.md), [`@Body`](./reference/tsoa-next/functions/Body.md), [`@Post`](./reference/tsoa-next/functions/Post.md), और [`@SuccessResponse`](./reference/tsoa-next/functions/SuccessResponse.md)।

यह अध्याय एक मिडलवेयर आधारित दिखाता है `class-validator` दृष्टिकोण Express।

The `@Middlewares` सजावटकर्ता स्थानिक तर्क के रूप में मध्यवेयर कार्यों को स्वीकार करता है:

```ts
@Middlewares(validateBody(RequestClass))
```

## क्लास-वैलिडेटर पैकेज स्थापित करें

स्थापित करना `class-validator` और `class-transformer` जैसा कि उनकी स्थिति में वर्णित है:

[https://github.com/typestack/class-transformer](https://github.com/typestack/class-transformer)

[https://github.com/typestack/class-validator](https://github.com/typestack/class-validator)

## कस्टम मिडलवेयर लिखें

उपयोग करके उदाहरण सत्यापन मिडलवेयर `class-validator`:

```ts
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { ValidateError } from 'tsoa-next';

export function validateBody<T extends object>(targetClass: ClassConstructor<T>) {
   return async (req: Request, _res: Response, next: NextFunction) => {
      const instance = plainToInstance(targetClass, req.body);
      const errors = validateSync(instance, {
         forbidUnknownValues: true,
         validationError: {
            target: false
         }
      });
      const fieldsErrors: { [name: string]: { message: string; value: string } } = {};

      if (errors.length > 0) {
         errors.forEach(error => {
            if (error.constraints) {
               fieldsErrors[error.property] = {
                  message: Object.values(error.constraints).join(', '),
                  value: error.value
               };
            }
            if (error.children) {
               error.children.forEach(errorNested => {
                  if (errorNested.constraints) {
                     fieldsErrors[errorNested.property] = {
                        message: Object.values(errorNested.constraints!).join(', '),
                        value: errorNested.value
                     };
                  }
               })
            }
         });
         next(new ValidateError(fieldsErrors, 'Validation failed'));
         return;
      }
      next();
   };
}
```

## क्लास-वैलिडेटर के साथ एक अनुरोध वर्ग को नामांकित करें

```ts
import { Length } from 'class-validator'

class RequestClass {
  @Length(1, 2000)
  public text!: string
}
```

## एक नियंत्रक में उपयोग

```ts
import {
  Body,
  Controller,
  Middlewares,
  Post,
  Route,
  SuccessResponse,
} from 'tsoa-next'
import { validateBody } from '../middleware/ValidationMiddleware'

@Route('post')
export class PostController extends Controller {
  @SuccessResponse('200', 'Post created')
  @Post()
  @Middlewares(validateBody(RequestClass))
  public async create(@Body() request: RequestClass): Promise<void> {
    console.log(`validated request: ${request.text}`)
  }
}
```

`class-validator` और `class-transformer` आवश्यकता हो सकती है `emitDecoratorMetadata` आपके द्वारा उपयोग की जाने वाली सजावट और परिवर्तन सुविधाओं के आधार पर। यह आवश्यकता उन पुस्तकालयों से आती है, न कि इससे `@Middlewares(...)` खुद ही।
