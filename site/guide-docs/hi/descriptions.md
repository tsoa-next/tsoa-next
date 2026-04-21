---
lastUpdated: 2026-04-20T00:28:55.920Z
---
# विवरण

जबकि tsoa अपने से बहुत सारी जानकारी निकाल सकते हैं TypeScript टाइप एनोटेशन, जो केवल हमारे कोड को दस्तावेज करने के मामले में हमें अब तक मिल सकता है।
क्रम में कोड दोहराव से बचने के हमारे प्रयासों के लिए सच रहते हैं, tsoa उपयोग JSDoc जब भी हम ऐसी जानकारी का वर्णन करना चाहते हैं जो टाइप सिस्टम का हिस्सा नहीं है।

::: tip
tsoa यदि आप विवरण प्रदान करते हैं तो यह जांच नहीं की जाती है।

हम एक linter का उपयोग करने की सलाह देते हैं
प्यार [Spectral](https://stoplight.io/open-source/spectral)यह सुनिश्चित करने के लिए कि आपके विनिर्देश सही नहीं हैं,
लेकिन इसमें विवरण और सही भी शामिल है [examples](./examples)।
:::

इसके लिए एक महान उदाहरण विवरण हैं। आप सबसे अधिक संभावना सहमत हैं कि एंडपॉइंट विवरण या तो पाठ या मार्कडाउन में उपभोक्ताओं के लिए एक बेहतर तरीके से एक एपीआई एंडपॉइंट प्राप्त करने के लिए बहुत मददगार हैं।
लेकिन डेवलपर्स आपको पसंद करते हैं JSDocअक्सर अपने संपादक में प्रदर्शित किया जाता है, जब एक विधि से अधिक हो तो आप परिचित नहीं हो सकते।
स्पॉयलर: tsoa इन दोनों चीजों को संभव बनाता है।

## समापन बिंदु विवरण

सबसे उपयोगी प्रकार के विवरण विधि विवरण हैं, या, HTTP शब्दावली में, समापन बिंदु विवरण।

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

विधि के नाम पर होवर करके, हम पहले से ही हमारे संपादक में परिणाम देख सकते हैं:

![Method description](/docs-images/jsdoc-method.png)

लेकिन यह लाभ का केवल आधा है:

![SwaggerUI endpoint descriptions](/docs-images/swui-endpoint-description.png)

ओएएस इस बदलाव को भी दर्शाता है, और इसलिए उस स्पेक से दिए गए प्रलेखन को होगा!

## पैरामीटर विवरण

लेकिन क्यों वहाँ रुक? [JSDoc also offers parameter descriptions](https://jsdoc.app/tags-param.html), चलो देखते हैं कि कार्रवाई में:

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

## मॉडल विवरण

हम मॉडल स्तर पर विवरण भी प्रदान कर सकते हैं (मॉडल इंटरफेस या कक्षाएं या प्रकार के आलियास हैं):

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
में टाइप उपनाम की शुरूआत के साथ tsoa 3, आप इसे एक बहुत शक्तिशाली पैटर्न के रूप में इस्तेमाल कर सकते हैं।
चलो एक सेकंड के लिए मान लें कि हमारा एपीआई संभालती है उपयोगकर्ता द्वारा पहचाने गए UUID।
आमतौर पर, यूआईडी को स्ट्रिंग्स के रूप में भेजा जाता है, हालांकि, आदर्श रूप से, हम यह सुनिश्चित करना चाहते हैं कि हम यूआईडी कहते हैं जब हम यूआईडी चाहते हैं।
उस ने कहा, पूरे कोड पर विवरण दोहराना बहुत प्रयास है, आइए देखें कि हम कैसे बेहतर कर सकते हैं:

```ts {1,2,3,4,5}
/**
 * Stringified UUIDv4.
 * See [RFC 4112](https://tools.ietf.org/html/rfc4122)
 * @pattern [0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}
 * @format uuid
 */
export type UUID = string;
```

<details><summary>हम अपने उपयोगकर्ता में इसका पुन: उपयोग कर सकते हैं</summary>

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

अब हम परिभाषित करते हैं `UUID` एक पुन: प्रयोज्य प्रकार उपनाम के रूप में।
आधुनिक संपादक अच्छी तरह से सूचना पाठ प्रदर्शित करेंगे जब हम संदर्भों पर होवर करते हैं

![JSDoc Type Alias](/docs-images/jsdoc-alias.png)

tsoa यह एक पुन: प्रयोज्य घटक के लिए अनुवाद करेगा जिसे हर बार जब आप उस प्रकार के उपनाम का उपयोग करते हैं तो संदर्भित किया जा सकता है:

<details><summary>OpenAPI नमूना</summary>

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

जो इस तरह दिखेगा जब प्रस्तुत किया गया है:

<details>

![Rendered](/docs-images/swui-alias.png)

</details>

<br>
:::

## संपत्ति विवरण

::: warning
आप के लिए एक विवरण देखने की उम्मीद कर सकते हैं `id` यदि आप एक सेट करते हैं।
हालांकि, चूंकि इसे एक संदर्भ में परिवर्तित किया जाएगा UUID स्कीमा, विवरण को अनदेखा किया जाना चाहिए,
चूंकि किसी भी गुण को आगे रखा जाता है _ \$ref_ (a)OpenAPIको जोड़ने के लिए तंत्र UUID स्कीमा को अनदेखा किया जाना चाहिए।

अधिक जानकारी के लिए, प्रासंगिक भागों की जाँच करें [OpenAPI Specification](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#schemaObject) और [JSON Schema Core](https://tools.ietf.org/html/draft-wright-json-schema-00#section-7)

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

## सारांश

tsoa द्वारा प्रदान किए गए संक्षिप्त विवरणों का उपयोग करता है JSDoc ![`@summary`](https://jsdoc.app/tags-summary.html) एनोटेशन और इसका उपयोग सारांश के रूप में करेगा OpenAPI doc:

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
