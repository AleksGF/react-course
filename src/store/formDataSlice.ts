import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import { FORM_FIELDS_LABELS, type FormFields } from '@/constants/formSchema';
import { TIME_DATA_TO_BE_NEW } from '@/constants/constants';

interface ImageFile {
  name: string;
  content: string;
}

interface DataItem extends Omit<FormFields, FORM_FIELDS_LABELS.IMAGE> {
  [FORM_FIELDS_LABELS.IMAGE]: ImageFile;
}

export interface FormData {
  isNew: boolean;
  data: DataItem;
}

export const addFormData = createAsyncThunk(
  'formData/addFormData',
  async (data: DataItem) => {
    const promise = () =>
      new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, TIME_DATA_TO_BE_NEW);
      });

    await promise();

    return data;
  },
);

const initialState: FormData[] = [];

export const formDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addFormData.pending, (state, action) => {
        const { arg: data } = action.meta;

        return [...state, { data, isNew: true }];
      })
      .addCase(
        addFormData.fulfilled,
        (state, action: PayloadAction<DataItem>) => {
          const targetElement = state.find(
            (el) =>
              JSON.stringify(el.data) === JSON.stringify(action.payload) &&
              el.isNew === true,
          );

          if (!targetElement) return state;

          return [
            ...state.filter((el) => el !== targetElement),
            { ...targetElement, isNew: false },
          ];
        },
      );
  },
});

export default formDataSlice.reducer;
