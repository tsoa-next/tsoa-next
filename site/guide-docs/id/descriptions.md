---
lastUpdated: 2026-04-20T00:28:55.920Z
---
# Deskripsinya

Sementara tsoa dapat mengekstrak banyak informasi dari Anda TypeScript tipe gangguan, yang hanya bisa membawa kita sejauh ini dalam hal mendokumentasikan kode kita.
Dalam rangka tetap setia pada upaya kita untuk menghindari duplikasi kode, tsoa gunakan JSDoc based annotasi whenever we want to describe information which is not part of the type system.

::: tip
tsoa tidak memeriksa apakah Anda memberikan deskripsi.

Kami menyarankan menggunakan penghubung
(kita cinta [Spectral](https://stoplight.io/open-source/spectral)) untuk memastikan spesifikasi Anda tidak hanya benar,
tetapi juga berisi deskripsi dan benar [examples](./examples).
:::

Contoh yang bagus untuk ini adalah deskripsi. Anda kemungkinan besar setuju bahwa deskripsi titik akhir baik dalam teks atau markdown sangat membantu bagi konsumen mendapatkan rasa yang lebih baik dari API Endpoint melalui deskripsi pendek sebagai bagian dari dokumentasi yang diberikan.
Tapi pengembang seperti Anda juga manfaat dari JSDoc, yang sering ditampilkan langsung di penyunting Anda ketika melayang di atas metode Anda mungkin tidak akrab dengan.
Spoiler: tsoa membuat kedua hal ini mungkin.

## Keterangan titik akhir

Salah satu deskripsi yang paling membantu adalah deskripsi metode, atau, dalam terminologi HTTP, deskripsi titik akhir.

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

Dengan menggunakan nama metodenya, kita sudah dapat melihat hasilnya di penyunting kita:

![Method description](/docs-images/jsdoc-method.png)

Tapi itu hanya setengah dari keuntungan:

![SwaggerUI endpoint descriptions](/docs-images/swui-endpoint-description.png)

OAS mencerminkan perubahan ini juga, dan begitu juga dokumentasi yang diberikan dari spesifikasi itu!

## Deskripsi parameter

Tapi kenapa berhenti di sana? [JSDoc also offers parameter descriptions](https://jsdoc.app/tags-param.html), mari kita lihat bahwa dalam tindakan:

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

## Deskripsi model

Kita juga dapat membuat deskripsi pada tingkat model (model adalah antarmuka atau kelas atau tipe alias):

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
Dengan pengenalan Alias Tipe dalam tsoa 3, Anda dapat menggunakan ini sebagai pola yang sangat kuat.
Mari kita asumsikan sebentar bahwa kami menangani API Pengguna diidentifikasi oleh UUID.
Biasanya, uuid dikirim sebagai string, bagaimanapun, idealnya, kami ingin memastikan kita mengatakan uuid ketika kita ingin uuid.
Yang mengatakan, menduplikasi deskripsi di seluruh kode adalah banyak upaya, mari kita lihat bagaimana kita bisa berbuat lebih baik:

```ts {1,2,3,4,5}
/**
 * Stringified UUIDv4.
 * See [RFC 4112](https://tools.ietf.org/html/rfc4122)
 * @pattern [0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}
 * @format uuid
 */
export type UUID = string;
```

<details><summary>Kita dapat menggunakannya kembali pada Pengguna kita</summary>

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

Now, we define `UUID` sebagai tipe alias yang dapat digunakan ulang.
Editor modern akan menampilkan dengan baik teks informasi ketika kita hover atas referensi

![JSDoc Type Alias](/docs-images/jsdoc-alias.png)

tsoa akan menerjemahkan ini ke komponen dapat digunakan kembali yang dapat direferensikan setiap kali Anda menggunakan tipe alias:

<details><summary>OpenAPI Spec</summary>

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

Yang akan terlihat seperti ini ketika dirender:

<details>

![Rendered](/docs-images/swui-alias.png)

</details>

<br>
:::

## Deskripsi properti

::: warning
Anda mungkin berharap untuk melihat deskripsi untuk `id` jika Anda menetapkan satu.
Namun, karena itu akan berubah menjadi referensi ke UUID skema, deskripsi harus diabaikan,
karena setiap properti yang ditempatkan di sebelah _\ $ref _ (OpenAPImekanisme untuk menghubungkan ke UUID skema) harus diabaikan.

Untuk informasi lebih lanjut, memeriksa bagian yang relevan dari [OpenAPI Specification](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#schemaObject) dan [JSON Schema Core](https://tools.ietf.org/html/draft-wright-json-schema-00#section-7)

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

## Ringkasan

tsoa menggunakan deskripsi pendek yang disediakan melalui JSDoc ![`@summary`](https://jsdoc.app/tags-summary.html) anotasi dan akan menggunakannya sebagai ringkasan dalam OpenAPI doc:

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
