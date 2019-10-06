declare let process: {
  env: {
    REACT_APP_API_URL: string;
    REACT_APP_LOCAL_STORAGE_ITEM_NAME: string;
  };
};

export const apiURL = process.env.REACT_APP_API_URL;
export const localStorageItemName = process.env.REACT_APP_LOCAL_STORAGE_ITEM_NAME;
