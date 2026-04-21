---
lastUpdated: 2026-04-17T20:53:42.040Z
---
# उदाहरण

प्रासंगिक एपीआई संदर्भ: [`@Example`](./reference/tsoa-next/functions/Example.md), [`@Response`](./reference/tsoa-next/functions/Response.md), [`@SuccessResponse`](./reference/tsoa-next/functions/SuccessResponse.md), और [`Controller`](./reference/tsoa-next/classes/Controller.md)।

## रनेबल उदाहरण ऐप

एंड-टू-एंड सैंपल ऐप्स और फ्रेमवर्क-विशिष्ट सेटअप के लिए, साथी का उपयोग करें [tsoa-next/playground](https://github.com/tsoa-next/playground) भंडार
कि रेपो रनेबल के लिए समर्पित घर है `tsoa-next` उदाहरणों के रूप में कई सर्वर एकीकरण में परिदृश्यों को जोड़ा जाता है।

इस गाइड पर केंद्रित है OpenAPI उदाहरण और JSDoc उदाहरण के लिए, एक कोडबेस के अंदर मेटाडाटा।
जब आप एक पूर्ण अनुप्रयोग चाहते हैं तो खेल का मैदान रेपो तक पहुंचें आप क्लोन, इंस्टॉल और रन कर सकते हैं।

अध्ययन के बाद अध्ययन से पता चलता है कि उदाहरण नए एपीआई सीखने का एक महत्वपूर्ण हिस्सा हैं।[1](https://www.cs.mcgill.ca/~martin/papers/software2009a.pdf), [2](https://sigdoc.acm.org/cdq/how-developers-use-api-documentation-an-observation-study/), [3](https://ase.cpsc.ucalgary.ca/wp-content/uploads/2018/05/A-Study-of-the-Effectiveness-of-Usage-Examples-in-REST-API-Documentation.pdf)).
जबकि कुछ मुद्दों, जैसे प्रकार की गलतियाँ JSON स्कीमा (जैसे उदाहरण) से उदाहरणों को प्रभावित करके बचा जा सकता है। SwaggerUI स्वचालित रूप से \* उत्पन्न करता है, यह अक्सर बहुत अधिक सहज है अगर हम खुद कुछ उदाहरण प्रदान करते हैं।

* जो भी सीमित है, यानी पैटर्न को नजरअंदाज कर दिया जाएगा और सिर्फ स्ट्रिंग "स्ट्रिंग" को हर बार भेजने के लिए कुछ हद तक suboptimal है अगर यह स्ट्रिंग वास्तव में अर्थ रखती है।

::: tip
tsoa नहीं (yet) अपनी जाँच JSDoc उदाहरण
गलत उदाहरण आपके संकलन को तोड़ नहीं देंगे क्योंकि OpenAPI [explicitly allows anything](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#fixed-fields-20)।
आप भी सिर्फ प्रदर्शन करना चाहते हैं tsoa's वैधता: smirk:

हम एक linter का उपयोग करने की सलाह देते हैं
प्यार [Spectral](https://stoplight.io/open-source/spectral)यह सुनिश्चित करने के लिए कि आपके विनिर्देश सही नहीं हैं,
लेकिन [descriptions](./descriptions) और सही उदाहरण।
:::

::: warning
OpenAPI 2 केवल प्रति मॉडल / property /parameter एक उदाहरण की अनुमति देता है।
यदि आप एक से अधिक उदाहरण में परिभाषित करते हैं OpenAPI 2, tsoa केवल पहले ही मूल्य के रूप में लागू होगा।
OpenAPI 3 उदाहरण अब समर्थित हैं!
:::

## प्रतिक्रिया उदाहरण

उदाहरण के लिए जवाब देने के लिए, tsoa प्रदान करता है [`@Example()`](./reference/tsoa-next/functions/Example.md) सजावट।

::: tip
वह प्रकार प्रदान करना जिसे आप एक प्रकार के तर्क के रूप में लिखते हैं `T` to

```ts
@Example<T>(example: T)
```

आवश्यक नहीं है, लेकिन आप बग को पकड़ने में मदद कर सकते हैं।
:::

इस सजावट का उपयोग डिफ़ॉल्ट प्रतिक्रिया के लिए प्रतिक्रिया निर्दिष्ट करने के लिए किया जाता है,
लेकिन आप अन्य प्रतिक्रियाओं के लिए उदाहरण जोड़ सकते हैं ()[`@Response()`](./reference/tsoa-next/functions/Response.md), अतिरिक्त प्रतिक्रियाओं के लिए उपयोग किया जाता है, अक्सर इसके कारण होता है [errors](./error-handling#specifying-error-response-types-for-openapi) उन्हें तीसरे तर्क के रूप में भी प्रदान करके।

### डिफ़ॉल्ट प्रतिक्रिया

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

### अतिरिक्त प्रतिक्रियाएं

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

## पैरामीटर उदाहरण

::: warning
यदि आप एक सेट करते हैं तो आप एक प्रकार के संदर्भ (एक प्रकार के आलिया, इंटरफ़ेस या एक वर्ग के लिए) के लिए एक उदाहरण देख सकते हैं।
हालांकि, चूंकि इसे स्कीमा में एक संदर्भ (_\$ref_) में बदल दिया जाएगा, उदाहरण को नजरअंदाज किया जाना चाहिए,
चूंकि किसी भी गुण को आगे रखा जाता है _ \$ref_ (a)OpenAPIउपयोगकर्ता क्रिएशन पाराम स्कीमा को जोड़ने के लिए 'प्रबंधन' को नजरअंदाज कर दिया जाना चाहिए।

अधिक जानकारी के लिए, प्रासंगिक भागों की जाँच करें [OpenAPI Specification](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#schemaObject) और [JSON Schema Core](https://tools.ietf.org/html/draft-wright-json-schema-00#section-7)

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

## उदाहरण

::: warning
दोनों OpenAPI 2 और 3 मॉडल में केवल एकल उदाहरण का समर्थन करता है।
यदि आप एक से अधिक उदाहरण का उपयोग करते हैं तो यह केवल पहले ही लागू होगा।
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
ऑब्जेक्ट या सरणी के साथ कोई भी उदाहरण सही JSON-format होना चाहिए।
अन्यथा, tsoa ओएएस उत्पन्न करते समय त्रुटि को फेंक देगा।
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

## संपत्ति उदाहरण

::: warning
आप के लिए एक उदाहरण देखने की उम्मीद कर सकते हैं `id` यदि आप एक सेट करते हैं।
हालांकि, चूंकि इसे एक संदर्भ में परिवर्तित किया जाएगा UUID स्कीमा, उदाहरण को नजरअंदाज किया जाना चाहिए,
चूंकि किसी भी गुण को आगे रखा जाता है _ \$ref_ (a)OpenAPIको जोड़ने के लिए तंत्र UUID स्कीमा को अनदेखा किया जाना चाहिए।

अधिक जानकारी के लिए, प्रासंगिक भागों की जाँच करें [OpenAPI Specification](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#schemaObject) और [JSON Schema Core](https://tools.ietf.org/html/draft-wright-json-schema-00#section-7)

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
