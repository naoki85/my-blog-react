import {Category} from "../entities/category";
import {apiURL, localStorageItemName} from "../config/const";
import axios from "axios";

interface CategoryParams {
  identifier: string;
  jpName: string;
  color: string;
}

export class CategoryRepository {
  static async All(): Promise<Category[]> {
    const header = this.buildHeader();
    const categories: Category[] = [];

    try {
      const response = await axios.get(`${apiURL}/categories`, {
        data: {},
        headers: header,
      });
      if (response.data.Categories.length > 0) {
        response.data.Categories.forEach((d: any) => {
          const c = new Category(d);
          categories.push(c);
        })
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e.message);
    }

    return categories;
  }

  static async FindByIdentifier(identifier: string): Promise<Category> {
    try {
      const response = await axios.get(`${apiURL}/categories/${identifier}`, {
        data: {}, headers: {},
      });

      return new Category(response.data);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e.message);
    }

    return Category.buildDefault();
  }

  static async Save(params: CategoryParams): Promise<boolean> {
    const header = this.buildHeader();

    try {
      await axios.post(`${apiURL}/categories`, JSON.stringify(params),
        { headers: header });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e.message);

      return false;
    }

    return true;
  }

  static async Update(params: CategoryParams): Promise<boolean> {
    const header = this.buildHeader();

    try {
      await axios.put(`${apiURL}/categories/${params.identifier}`, JSON.stringify(params),
        { headers: header });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e.message);

      return false;
    }

    return true;
  }

  static async Delete(identifier: string): Promise<boolean> {
    const header = this.buildHeader();

    try {
      await axios.delete(`${apiURL}/categories/${identifier}`,
        { headers: header });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e.message);

      return false;
    }

    return true;
  }

  static buildHeader(): { Authorization: string } {
    const token = localStorage.getItem(localStorageItemName);

    return Object.assign(Object.assign({}, {}), {
      Authorization: 'Bearer ' + token,
    });
  }
}
