import {Category} from "../entities/category";
import React from "react";

export enum TypeKeys {
  FETCH_CATEGORIES = 'FETCH_CATEGORIES',
  FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS',
  FETCH_CATEGORIES_FAIL = 'FETCH_CATEGORIES_FAIL',
  CREATE_CATEGORY = 'FETCH_CREATE_CATEGORY',
  CREATE_CATEGORY_SUCCESS = 'FETCH_CREATE_CATEGORY_SUCCESS',
  CREATE_CATEGORY_FAIL = 'FETCH_CREATE_CATEGORY_FAIL',
  DELETE_CATEGORY = 'DELETE_CATEGORY',
  DELETE_CATEGORY_SUCCESS = 'DELETE_CATEGORY_SUCCESS',
  DELETE_CATEGORY_FAIL = 'DELETE_CATEGORY_FAIL',
}

interface IStore {
  categories: Category[] | undefined;
  isLoading: boolean;
}

interface IAction {
  type: TypeKeys;
  payload?: Category[];
}

export const initialState = {
  categories: [],
  isLoading: false,
};

export const Reducer: React.Reducer<IStore, IAction> = (state = initialState, action) => {
  switch (action.type) {
    case TypeKeys.FETCH_CATEGORIES:
    case TypeKeys.CREATE_CATEGORY:
    case TypeKeys.DELETE_CATEGORY:
      return { ...state, isLoading: true };
    case TypeKeys.FETCH_CATEGORIES_SUCCESS:
      return { ...state, categories: action.payload, isLoading: false };
    case TypeKeys.FETCH_CATEGORIES_FAIL:
    case TypeKeys.CREATE_CATEGORY_SUCCESS:
    case TypeKeys.CREATE_CATEGORY_FAIL:
    case TypeKeys.DELETE_CATEGORY_SUCCESS:
    case TypeKeys.DELETE_CATEGORY_FAIL: {
      return {...state, isLoading: false};
    }
    default: {
      return state;
    }
  }
};
