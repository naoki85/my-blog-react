import React, {useEffect, useReducer} from 'react';
import Select from '@material-ui/core/Select';
import {Reducer, TypeKeys} from "../../../reducers/category";
import {CategoryRepository} from "../../../repositories/category_repository";
import {Category} from "../../../entities/category";

interface CategoriesSelectBoxProps {
  handleChange: (event: React.ChangeEvent<{ name?: string; value: unknown }>) => void;
  category: string;
}

const CategoriesSelectBox: React.FC<CategoriesSelectBoxProps> = (props) => {
  const [state, dispatch] = useReducer(Reducer, {
    categories: [new Category({Identifier: 'other', JpName: 'Other', Color: ''})],
    isLoading: false,
  });

  useEffect(() => {
    const fetchCategory = async () => {
      dispatch({type: TypeKeys.FETCH_CATEGORIES});

      try {
        const result = await CategoryRepository.All();
        dispatch({type: TypeKeys.FETCH_CATEGORIES_SUCCESS, payload: result});
      }catch (error) {
        dispatch({type: TypeKeys.FETCH_CATEGORIES_FAIL});
      }
    };

    fetchCategory();
  }, []);

  return <>
    <Select
      native
      onChange={props.handleChange}
      inputProps={{
        name: 'category',
        id: 'category-native-simple',
      }}
      displayEmpty
      value={props.category}
    >
      {(state.categories ?? []).map(c => (
        <option key={c.identifier} value={c.identifier}>{c.jpName}</option>
      ))}
    </Select>
  </>;
};

export default CategoriesSelectBox;
