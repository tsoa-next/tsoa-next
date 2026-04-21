---
lastUpdated: 2026-04-17T20:53:42.040Z
---
# উদাহরণ

রিলেভেন্ট API উল্লেখ করেছে: [`@Example`](./reference/tsoa-next/functions/Example.md)'%s' [`@Response`](./reference/tsoa-next/functions/Response.md)'%s' [`@SuccessResponse`](./reference/tsoa-next/functions/SuccessResponse.md)এবং [`Controller`](./reference/tsoa-next/classes/Controller.md). .

## syner উদাহরণ চালান

শেষ-পয়ন্ড নমুনা এবং কাঠামো ভিত্তিক সামগ্রী, ব্যবহার করুন [tsoa-next/playground](https://github.com/tsoa-next/playground) রিপোজিটরি।
ঐ পুনঃপো হচ্ছে রানিং এর জন্য নিবেদিত বাড়ি `tsoa-next` উদাহরণ হিসেবে উদাহরণ হিসেবে বলা যায়, একাধিক সার্ভার সম্পর্কের দৃশ্য দেখা গেছে।

এই গাইডটি ফোকাস করে দেখায় OpenAPI উদাহরণ এবং উদাহরণ JSDoc কোড ভিত্তির মধ্যে মিটা-ডাটা।
যখন আপনি একটি পূর্ণ অ্যাপ্লিকেশনটি ক্লোন, ইনস্টল এবং চালানো করতে চান তখন খেলার জন্য খেলার ফিরে আসুন ।

অধ্যয়ন করার পর অধ্যয়ন করুন[1](https://www.cs.mcgill.ca/~martin/papers/software2009a.pdf)'%s' [2](https://sigdoc.acm.org/cdq/how-developers-use-api-documentation-an-observation-study/)'%s' [3](https://ase.cpsc.ucalgary.ca/wp-content/uploads/2018/05/A-Study-of-the-Effectiveness-of-Usage-Examples-in-REST-API-Documentation.pdf)- হ্যা.
কিছু কিছু বিষয়, যেমন, এ ধরনের মিলগুলো JSON স্কীমা থেকে প্রাপ্ত উদাহরণগুলো এড়িয়ে যেতে পারে (যেমন উদাহরণের মতো) SwaggerUI স্বয়ংক্রিয়ভাবে স্বয়ংক্রিয়ভাবে উৎপন্ন হয়, এটা প্রায়শ আরো বেশী সংবেদনশীল হয় যদি আমরা নিজেদের কিছু উদাহরণ প্রদান করি।

বঙ্গানুবাদে যা খুব সীমিত, আমি মনে করি, বিন্যাসকে উপেক্ষা করা হবে, এবং প্রতিটিবার "string" পাঠানো হবে, যদি এই পংক্তি সত্যিকার অর্থে অর্থ থাকে।

::: tip
tsoa এটি নয় (ও নয়) আপনার চেক JSDoc উদাহরণ দিন ।
ভুল উদাহরণগুলি আপনার কনটেন্ট ভাঙোবে না, কারণ, OpenAPI [explicitly allows anything](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#fixed-fields-20). .
আপনি শুধুমাত্র প্রদর্শন করতে পারেন tsoaনির্বাচন বৈধ:

আমরা একটি বিটার ব্যবহার করে সুপারিশ করবো
(আমরা ভালবাসি) [Spectral](https://stoplight.io/open-source/spectral)আপনার নির্দেশ নিশ্চিত করার জন্য, শুধু সঠিক নয়,
কিন্তু আছে [descriptions](./descriptions) এবং সঠিক উদাহরণ।
:::

::: warning
OpenAPI ২) প্রতি মডেল/অনুক্রমণে প্রতি উদাহরণ সৃষ্টি করে।
উদাহরণস্বরূপ, একের বেশি উদাহরণ নির্ধারণ করা হলে OpenAPI ২ tsoa প্রথমে একটি মান হিসাবে প্রয়োগ করা হবে।
OpenAPI বর্তমানে ৩টি উদাহরণ সমর্থিত!
:::

## প্রতিক্রিয়া

একটি উদাহরণ প্রদান করার জন্য, tsoa একটি প্রস্তাব [`@Example()`](./reference/tsoa-next/functions/Example.md) প্রহরী.

::: tip
টাইপ করার ধরন হিসেবে আপনি যে ধরনের উদাহরণ লিখেছেন তা তুলে ধরার জন্য `T` চিহ্নিত স্থানে চলুন

```ts
@Example<T>(example: T)
```

প্রয়োজন নেই, কিন্তু বাগ সনাক্ত করতে সাহায্য করুন ।
:::

ডিফল্ট প্রত্যুত্তরের জন্য এই ইম্পোর্ট ব্যবস্থা ব্যবহার করা হয়েছে,
কিন্তু অন্যান্য প্রতিক্রিয়ার জন্য উদাহরণ যোগ করতে পারেন (যেমন:)[`@Response()`](./reference/tsoa-next/functions/Response.md)অতিরিক্ত প্রতিক্রিয়া প্রদর্শনের জন্য ব্যবহৃত [errors](./error-handling#specifying-error-response-types-for-openapi) একই সাথে তারা তৃতীয় যুক্তি প্রদান করে।

### ডিফল্ট প্রতিক্রিয়া

```ts {3-9}
@Route("users")
export class UsersController extends Controller {
  @Example<User>({
    id: "52907745-7672-470e-a803-a2f8feb52944",
    name: "tsoa user",
    email: "hello@tsoa.com",
    phoneNumbers: [],
    status: "Happy",
  })
  @Get("{userId}")
  public async getUser(
    @Path() userId: UUID,
    @Query() name: string
  ): Promise<User> {
    return new UsersService().get(userId, name);
  }
}
```

### অন্যান্য প্রতিক্রিয়া

```ts {9-17}
@Route("users")
export class UsersController extends Controller {
  /**
   * Add a new user. Remember that the demo API will not persist this data.
   *
   */
  @Post()
  @SuccessResponse("201", "Created") // Custom success response
  @Response<ValidateErrorJSON>(422, "Validation Failed", {
    message: "Validation failed",
    details: {
      requestBody: {
        message: "id is an excess property and therefore not allowed",
        value: "52907745-7672-470e-a803-a2f8feb52944",
      },
    },
  })
  public async createUser(
    @Body() requestBody: UserCreationParams
  ): Promise<void> {
    this.setStatus(201); // set return status 201
    new UsersService().create(requestBody);
    return;
  }
}
```

## পরামিতির উদাহরণ

::: warning
আপনি আশা করতে পারেন যে ধরনের রেফারেন্সের জন্য একটি উদাহরণ (মূল বা শ্রেণীতে) টাইপ করুন।
কিন্তু, এর পরে এটিকে একটি রেফারেন্সে রূপান্তর করা হবে যা স্কিমার সাথে প্রয়োগ করা হবে (_x)
যে কোনো বৈশিষ্ট্যের মান মুছে ফেলা হবে (_l) ( চিহ্ন)OpenAPIব্যবহারকারীর নির্বাচনী স্কিমার সাথে লিঙ্ক করার পদ্ধতি অগ্রাহ্য করা হবে।

আরও তথ্যের জন্য, তথ্যের প্রাসঙ্গিক অংশ দেখুন [OpenAPI Specification](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#schemaObject) এবং [JSON Schema Core](https://tools.ietf.org/html/draft-wright-json-schema-00#section-7)

:::

```ts {4-5}
@Route("users")
export class UsersController extends Controller {
  /**
   * @example userId "52907745-7672-470e-a803-a2f8feb52944"
   * @example userId "e77ef155-bd12-46f0-8559-bf55f6dd4c63"
   */
  @Get("{userId}")
  public async getUser(
    @Path() userId: UUID,
    @Query() name: string
  ): Promise<User> {
    return new UsersService().get(userId, name);
  }
}
```

## মডেল উদাহরণ

::: warning
উভয় OpenAPI ২ ও ৩ মডেলের মধ্যে শুধুমাত্র একটি উদাহরণ সমর্থন করে।
আপনি যদি একটা উদাহরণ ব্যবহার করেন, তা হলে সেটা শুধুমাত্র প্রথমটাই প্রযোজ্য হবে ।
:::

```ts {5}
/**
 * Stringified UUIDv4.
 * See [RFC 4112](https://tools.ietf.org/html/rfc4122)
 * @pattern [0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}
 * @example "52907745-7672-470e-a803-a2f8feb52944"
 */
export type UUID = string;
```

::: warning
বস্তু অথবা অ্যারের কোনো উদাহরণ সঠিক JSON-format বিন্যাসে লেখা আবশ্যক।
অন্যথায়, tsoa OAS তৈরি করার সময় সমস্যা সৃষ্টি করবে।
:::

```ts {6-10}
/**
 * User objects allow you to associate actions performed in the system with the user that performed them.
 * The User object contains common information across every user in the system regardless of status and role.
 *
 *
 * @example {
 *  "id": "52907745-7672-470e-a803-a2f8feb52944",
 *  "name": "John Doe",
 *  "phoneNumbers": []
 * }
 */
export interface User {
  id: UUID;

  /**
   * The email the user used to register his account
   */
  email?: string;

  name: string;
  status?: "Happy" | "Sad";
  phoneNumbers: string[];
}
```

## বৈশিষ্ট্যের সংকলন

::: warning
আপনি হয়তো আশা করতে পারেন যে এর জন্য আপনি একটা উদাহরণ দেখতে পারেন `id` যদি তুমি সেট করো।
যাই হোক, যেহেতু এটি একটি রেফারেন্সে রূপান্তর করা হবে UUID উদাহরণ, উপেক্ষা করা হবে
যে কোনো বৈশিষ্ট্যের মান মুছে ফেলা হবে (_l) ( চিহ্ন)OpenAPIলিঙ্ক- এর সাথে লিঙ্ক করার পদ্ধতি UUID স্কিমা উপেক্ষা করা হবে।

আরও তথ্যের জন্য, তথ্যের প্রাসঙ্গিক অংশ দেখুন [OpenAPI Specification](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#schemaObject) এবং [JSON Schema Core](https://tools.ietf.org/html/draft-wright-json-schema-00#section-7)

:::

```ts {11-13}
export interface User {
  id: UUID;

  /**
   * The email the user used to register his account
   */
  email?: string;

  name: string;

  /**
   * @example "Happy"
   */
  status?: "Happy" | "Sad";

  phoneNumbers: string[];
}
```
