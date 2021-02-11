import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import axios from "axios";
import {PROPS_NEWDATA} from "../types";

const adoptionUrlData = `${process.env.REACT_APP_DEV_ADOPTION_URL}adoption/dog_data/`;

// 登録された全ての保護犬のデータを取得する記述
export const fetchAsyncGetData = createAsyncThunk("dog_data/get",
    async () => {
        const res = await axios.get(adoptionUrlData, {
            headers: {
                "Authorization": `JWT ${localStorage.localJWT}`,
            },
        });
        return res.data;
    });

// 保護犬データを新規に登録する記述
export const fetchAsyncNewData = createAsyncThunk("dog_data/post",
    async (newData: PROPS_NEWDATA) => {
        const uploadData = new FormData();
        uploadData.append("dogName", newData.dogName);
        uploadData.append("gender", newData.gender);
        uploadData.append("age", newData.age);
        uploadData.append("height", newData.height);
        uploadData.append("observations", newData.observations);
        uploadData.append("color", newData.color);
        uploadData.append("hair", newData.hair);
        uploadData.append("reason_for_arrival", newData.reason_for_arrival);
        uploadData.append("procedure", "no");
        newData.photo && uploadData.append("photo", newData.photo, newData.photo.name);
        const res = await axios.post(adoptionUrlData, uploadData, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${localStorage.localJWT}`,
            },
        });
        return res.data;
    });

//保護犬のデータを削除する機能
export const fetchAsyncDeleteData = createAsyncThunk("dog_data/delete",
    async (id: any) => {
        const res = await axios.delete(`${adoptionUrlData}${id}/`, {
            headers: {
                "Authorization": `JWT ${localStorage.localJWT}`,
            }
        });
        return res.data;
    });

export const dog_dataSlice = createSlice({
    name: "dog_data",
    initialState: {
        isLoadingData: false,
        openNewData: false,
        openDetailData: false,
        data: [
            {
                id: 0,
                dogName: "",
                gender: "",
                age: "",
                height: "",
                observations: "",
                color: "",
                hair: "",
                reason_for_arrival: "",
                photo: "",
                procedure: "",
                companyPost: 0,
                registered_at: "",
                updated_at: "",
            },
        ],
    },
    reducers: {
        fetchDataStart(state) {
            state.isLoadingData = true;
        }
        ,
        fetchDataEnd(state) {
            state.isLoadingData = false;
        }
        ,
        setOpenNewData(state) {
            state.openNewData = true;
        }
        ,
        resetOpenNewData(state) {
            state.openNewData = false;
        }
    },

    extraReducers: (builder) => {
        builder.addCase(fetchAsyncGetData.fulfilled, (state, action) => {
            return {
                ...state, data: action.payload,
            };
        });
        builder.addCase(fetchAsyncNewData.fulfilled, (state, action) => {
            return {
                ...state, data: [...state.data, action.payload],
            };
        });
        builder.addCase(fetchAsyncDeleteData.fulfilled, (state, action) => {
            delete state.data[action.payload]
            return state
        });
    },
});

export const {
    fetchDataStart, fetchDataEnd, setOpenNewData, resetOpenNewData,
} = dog_dataSlice.actions;

export const selectIsLoadingData = (state: RootState) => state.dog_data.isLoadingData;
export const selectOpenNewData = (state: RootState) => state.dog_data.openNewData;
export const selectData = (state: RootState) => state.dog_data.data;

export const toCharUppercase = (dogName: string) => dogName.toUpperCase();

export default dog_dataSlice.reducer;
