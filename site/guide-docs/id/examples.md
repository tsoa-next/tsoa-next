---
lastUpdated: 2026-04-17T20:53:42.040Z
---
# Contoh

Referensi API Relevant: [`@Example`](./reference/tsoa-next/functions/Example.md), [`@Response`](./reference/tsoa-next/functions/Response.md), [`@SuccessResponse`](./reference/tsoa-next/functions/SuccessResponse.md), dan [`Controller`](./reference/tsoa-next/classes/Controller.md).

## Aplikasi contoh yang dapat dijalankan

Untuk aplikasi contoh end- to-end dan framework- setup spesifik, gunakan pendamping [tsoa-next/playground](https://github.com/tsoa-next/playground) repositori.
Repo itu adalah rumah yang didedikasikan untuk lari `tsoa-next` skenario di beberapa integrasi server sebagai contoh ditambahkan di sana.

Panduan ini berfokus pada OpenAPI contoh dan JSDoc contoh metadata dalam sebuah codebase.
Reach for the playlist repo when you want a full application you can clone, install, and run.

Studi demi studi menunjukkan bahwa contoh adalah bagian penting dari mempelajari APIs baru ([1](https://www.cs.mcgill.ca/~martin/papers/software2009a.pdf), [2](https://sigdoc.acm.org/cdq/how-developers-use-api-documentation-an-observation-study/), [3](https://ase.cpsc.ucalgary.ca/wp-content/uploads/2018/05/A-Study-of-the-Effectiveness-of-Usage-Examples-in-REST-API-Documentation.pdf)).
Sementara isu-isu tertentu, seperti jenis ketidakcocokan dapat dihindari dengan memasukkan contoh dari JSON Skema (seperti contoh SwaggerUI secara otomatis menghasilkan\ *), itu sering lebih intuitif jika kita memberikan contoh tertentu diri kita sendiri.

\ * Yang juga terbatas, misalnya pola akan diabaikan, dan hanya mengirim string "string" setiap kali agak suboptimal jika string itu benar-benar membawa makna.

::: tip
tsoa belum memeriksa anda JSDoc Contoh.
Contoh tidak benar tidak akan mematahkan kompilasi Anda, karena OpenAPI [explicitly allows anything](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#fixed-fields-20).
Anda mungkin juga hanya ingin menunjukkan tsoavalidasi: seringai:

Kami menyarankan menggunakan penghubung
(kita cinta [Spectral](https://stoplight.io/open-source/spectral)) untuk memastikan spesifikasi Anda tidak hanya benar,
tetapi juga mengandung [descriptions](./descriptions) dan contoh yang benar.
:::

::: warning
OpenAPI 2 hanya memungkinkan satu contoh per model / properti / parameter.
Jika Anda mendefinisikan lebih dari satu contoh dalam OpenAPI 2, tsoa Hanya akan menerapkan pertama sebagai nilai.
OpenAPI 3 contoh sekarang didukung!
:::

## Contoh respon

Untuk memberikan sebuah contoh respon, tsoa menawarkan [`@Example()`](./reference/tsoa-next/functions/Example.md) Dekorator.

::: tip
Menyediakan tipe Anda menulis contoh untuk sebuah argumen tipe `T` ke

```ts
@Example<T>(example: T)
```

tidak perlu, tetapi dapat membantu Anda menangkap bug.
:::

Dekorator ini digunakan untuk menspesifikasikan sebuah respon untuk jawaban baku,
tetapi Anda dapat menambahkan contoh untuk tanggapan lain ([`@Response()`](./reference/tsoa-next/functions/Response.md), digunakan untuk tambahan tanggapan, sering disebabkan oleh [errors](./error-handling#specifying-error-response-types-for-openapi) dengan memberikan mereka sebagai argumen ketiga juga.

### Respon bawaan

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

### Respon Tambahan

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

## Contoh parameter

::: warning
Anda mungkin mengharapkan untuk melihat contoh untuk tipe referensi (ke tipe alias, antar muka, atau kelas) jika Anda menset satu.
Namun, karena itu akan berubah menjadi referensi (_\ $ref _) untuk skema, contoh harus diabaikan,
karena setiap properti yang ditempatkan di sebelah _\ $ref _ (OpenAPImekanisme untuk menghubungkan ke skema UserCreationParams) harus diabaikan.

Untuk informasi lebih lanjut, memeriksa bagian yang relevan dari [OpenAPI Specification](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#schemaObject) dan [JSON Schema Core](https://tools.ietf.org/html/draft-wright-json-schema-00#section-7)

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

## Contoh model

::: warning
Keduanya OpenAPI 2 dan 3 hanya mendukung satu contoh dalam model.
Jika Anda menggunakan lebih dari satu contoh, itu hanya akan menerapkan yang pertama.
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
Contoh apapun dengan objek atau array harus berada dalam format JSON- yang benar.
Jika tidak, tsoa akan melemparkan kesalahan ketika menghasilkan OAS.
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

## Contoh properti

::: warning
Anda mungkin berharap untuk melihat contoh untuk `id` jika Anda menetapkan satu.
Namun, karena itu akan berubah menjadi referensi ke UUID skema, contoh harus diabaikan,
karena setiap properti yang ditempatkan di sebelah _\ $ref _ (OpenAPImekanisme untuk menghubungkan ke UUID skema) harus diabaikan.

Untuk informasi lebih lanjut, memeriksa bagian yang relevan dari [OpenAPI Specification](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#schemaObject) dan [JSON Schema Core](https://tools.ietf.org/html/draft-wright-json-schema-00#section-7)

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
