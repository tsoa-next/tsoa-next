---
lastUpdated: 2026-04-20T00:28:55.920Z
---
# বিবরণ

এর মধ্যে tsoa আপনার তথ্য থেকে অনেক তথ্য সংগ্রহ করুন TypeScript আমাদের কোড নথিভুক্ত করার ক্ষেত্রে এটা আমাদের এ পর্যন্ত দূর করতে পারবে।
কোডের জটিলতা এড়ানোর জন্য আমাদের প্রচেষ্টার ক্ষেত্রে, tsoa ব্যবহৃত হচ্ছে JSDoc পাদটীকা যখন আমরা তথ্য ব্যাখ্যা করতে চাই যা এই ধরনের সিস্টেমের অংশ নয় ।

::: tip
tsoa আপনার পছন্দের বর্ণনা উল্লেখ করতে পরীক্ষা করো ।

আমরা একটি বিটার ব্যবহার করে সুপারিশ করবো
(আমরা ভালবাসি) [Spectral](https://stoplight.io/open-source/spectral)আপনার নির্দেশ নিশ্চিত করার জন্য, শুধু সঠিক নয়,
কিন্তু বর্ণনা ও সঠিক নয় [examples](./examples). .
:::

এই বর্ণনার জন্য একটি ভাল উদাহরণ। আপনি সম্ভবত একমত হবেন যে টেক্সট বা মার্কস এর শেষ বর্ণনা গ্রাহকের জন্য সহায়ক। একটি সংক্ষিপ্ত বর্ণনার মাধ্যমে একটি API সমাপ্তি ঘটবে।
কিন্তু ডেভেলপার আপনাকেও উপকার করতে পারে JSDocযে - এডিটরটি কোনো পদ্ধতির ওপর দিয়ে চলাচল করালে আপনার এডিটরে স্বাভাবিক অবস্থায় দেখানো হয় ।
স্পেয়ার: tsoa এই দুটো জিনিসই সম্ভব।

## %s প্রিন্টারের সমাপ্তি

এই বর্ণনাগুলোর মধ্যে একটা হল বিভিন্ন ধরনের বর্ণনা, অথবা HTTP শব্দ গণনাবিদ্যা, স্থায়ী বর্ণনা ।

```ts {3-6}
@Route("users")
export class UsersController extends Controller {
  /**
   * Retrieves the details of an existing user.
   * Supply the unique user ID from either and receive corresponding user details.
   */
  @Get("{userId}")
  public async getUser(
    @Path() userId: number,
    @Query() name?: string
  ): Promise<User> {
    return new UsersService().get(userId, name);
  }
}
```

এই পদ্ধতি নিয়ে আমরা ইতোমধ্যে আমাদের সম্পাদককে দেখতে পাচ্ছি:

![Method description](/docs-images/jsdoc-method.png)

কিন্তু এর মাত্র অর্ধেক লাভ:

![SwaggerUI endpoint descriptions](/docs-images/swui-endpoint-description.png)

ওএসওএ এই পরিবর্তনকে প্রতিফলিত করে, এবং এই নথিপত্র থেকে নথি সংগ্রহ করে!

## পরামিতির বর্ণনা

কিন্তু সেখানে থামলেন কেন? [JSDoc also offers parameter descriptions](https://jsdoc.app/tags-param.html)দেখা যাক:

```ts {6,7}
@Route("users")
export class UsersController extends Controller {
  /**
   * Retrieves the details of an existing user.
   * Supply the unique user ID from either and receive corresponding user details.
   * @param userId The user's identifier
   * @param name Provide a username to display
   */
  @Get("{userId}")
  public async getUser(
    @Path() userId: number,
    @Query() name?: string
  ): Promise<User> {
    return new UsersService().get(userId, name);
  }
}
```

## মডেল

মডেল স্তরে আমরা বর্ণনাও পার্স করতে পারি (মান ইন্টারফেস বা ক্লাস):

```ts {1-6}
/**
 * User objects allow you to associate actions performed
 * in the system with the user that performed them.
 * The User object contains common information across
 * every user in the system regardless of status and role.
 */
export interface User {
  id: number;
  email: string;
  name: string;
  status?: "Happy" | "Sad";
  phoneNumbers: string[];
}
```

::: tip
পরিচয় পত্রের মাধ্যমে tsoa ৩) আপনি এটাকে খুব শক্তিশালী প্যাটার্ন হিসেবে ব্যবহার করতে পারেন।
একটু ধরে নিই যে আমাদের API হ্যান্ডেল ব্যবহারকারী দ্বারা সনাক্ত করা ব্যবহারকারী UUID. .
সাধারণত, নিশ্চলকে স্ট্রিং হিসেবে পাঠানো হয়, তবে আদর্শভাবে আমরা নিশ্চিত করতে চাই যে, আমরা যখন Uuid চাই, তখন আমরা কি বলবো।
যা বলা হয়েছে, কোডের বর্ণনাকে ঘিরে অনেক প্রচেষ্টা আছে, দেখা যাক আমরা কিভাবে ভাল করতে পারি:

```ts {1,2,3,4,5}
/**
 * Stringified UUIDv4.
 * See [RFC 4112](https://tools.ietf.org/html/rfc4122)
 * @pattern [0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}
 * @format uuid
 */
export type UUID = string;
```

<details><summary>আমরা এটা আমাদের ব্যবহারকারী পুনরায় ব্যবহার করতে পারেন</summary>

```ts
/**
 * User objects allow you to associate actions performed in the system with the user that performed them.
 * The User object contains common information across every user in the system regardless of status and role.
 */
export interface User {
  id: UUID;
  email: string;
  name: string;
  status?: "Happy" | "Sad";
  phoneNumbers: string[];
}
```

</details>

এখন, আমরা সংজ্ঞায়িত করি `UUID` এক প্রকার পরিচয়।
লেখার সময় আধুনিক সম্পাদকদের তথ্য প্রদর্শন করা হবে

![JSDoc Type Alias](/docs-images/jsdoc-alias.png)

tsoa এটি প্রতি বার আপনি যে ধরনের ছদ্মনাম ব্যবহার করে তাকে চিহ্নিত করতে পারেন:

<details><summary>OpenAPI স্পেকট্রাম</summary>

```yaml
components:
  schemas:
    UUID:
      type: string
      description: "Stringified UUIDv4.\nSee [RFC 4112](https://tools.ietf.org/html/rfc4122)"
      pattern: "[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}"
    User:
      description: "User objects allow you to associate actions performed in the system with the user that performed them.\nThe User object contains common information across every user in the system regardless of status and role."
      properties:
        id:
          $ref: "#/components/schemas/UUID"
```

</details>

এটি দেখতে যেমন:

<details>

![Rendered](/docs-images/swui-alias.png)

</details>

<br>
:::

## বৈশিষ্ট্যের বিবরণ

::: warning
আপনি আশা করতে পারেন যে এর জন্য কোন বর্ণনা দেখতে `id` যদি তুমি সেট করো।
যাই হোক, যেহেতু এটি একটি রেফারেন্সে রূপান্তর করা হবে UUID স্কীমা, বর্ণনা অগ্রাহ্য করা হবে, উপেক্ষা করা হবে
যে কোনো বৈশিষ্ট্যের মান মুছে ফেলা হবে (_l) ( চিহ্ন)OpenAPIলিঙ্ক- এর সাথে লিঙ্ক করার পদ্ধতি UUID স্কিমা উপেক্ষা করা হবে।

আরও তথ্যের জন্য, তথ্যের প্রাসঙ্গিক অংশ দেখুন [OpenAPI Specification](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#schemaObject) এবং [JSON Schema Core](https://tools.ietf.org/html/draft-wright-json-schema-00#section-7)

:::

```ts {8,9,10}
/**
 * User objects allow you to associate actions performed in the system with the user that performed them.
 * The User object contains common information across every user in the system regardless of status and role.
 */
export interface User {
  id: UUID;

  /**
   * The email the user used to register his account
   */
  email: string;

  name: string;
  status?: "Happy" | "Sad";
  phoneNumbers: string[];
}
```

## পরিসংখ্যান

tsoa মাধ্যমে প্রদত্ত সংক্ষিপ্ত বিবরণ ব্যবহার করে JSDoc ![`@summary`](https://jsdoc.app/tags-summary.html) এর সারসংক্ষেপ হিসাবে ব্যবহার করা হবে OpenAPI ডাক্তার:

```ts {5}
  /**
   * A very long, verbose, wordy, long-winded, tedious, verbacious, tautological,
   * profuse, expansive, enthusiastic, redundant, flowery, eloquent, articulate,
   * loquacious, garrulous, chatty, extended, babbling description.
   * @summary A concise summary.
   */
  @Get('SummaryMethod')
  public async summaryMethod(): Promise<TestModel> {
    return new ModelService().getModel();
  }
```
