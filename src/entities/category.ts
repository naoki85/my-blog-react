export class Category {
  readonly identifier: string;
  readonly jpName: string;
  readonly color: string;

  constructor(params: { Identifier: string; JpName: string; Color: string }) {
    this.identifier = params.Identifier;
    this.jpName = params.JpName;
    this.color = params.Color;
  }

  static buildDefault(): Category {
    return new Category({ Identifier: '', JpName: '', Color: '' });
  }
}
