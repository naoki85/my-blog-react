export class Book {
  readonly title: string;
  readonly url: string;
  readonly imageUrl: string;

  constructor(params: { title: string; url: string; imageUrl: string }) {
    this.title = params.title;
    this.url = params.url;
    this.imageUrl = params.imageUrl;
  }
}
