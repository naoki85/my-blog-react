declare let process: {
  env: {
    REACT_APP_API_URL: string;
    REACT_APP_LOCAL_STORAGE_ITEM_NAME: string;
    REACT_APP_IMAGE_BASE_URL: string;
  };
};

export const apiURL = process.env.REACT_APP_API_URL;
export const localStorageItemName = process.env.REACT_APP_LOCAL_STORAGE_ITEM_NAME;
export const imageBaseUrl = process.env.REACT_APP_IMAGE_BASE_URL;
