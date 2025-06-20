import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    parentToAdd: null,
    parentsToAdd:null,
    studentToAdd:null,
    studentsToAdd:null,
    additionServices:[] ,
};

const customersSlice = createSlice({
    name: "customers",
    initialState,
    reducers: {
        addParent: (state, action) => {
            // state.parentToAdd = action.payload
            if (!state.parentToAdd) {
                state.parentToAdd = [action.payload];
            } else {
                state.parentToAdd.push(action.payload);

                console.log('parent to add', state.parentToAdd);
                console.log('parent to add', action.payload);
            }
        },
        setParentToAdd: (state, action) => {
            state.parentToAdd = action.payload;
        },
        addStudent: (state, action) =>{
            if (!state.studentsToAdd) {
                state.studentsToAdd = [action.payload];
            } else {
                state.studentsToAdd.push(action.payload);
            }
        },
        storeStudent:(state, action) =>{
            state.studentToAdd = action.payload
        },
        clearStudentStore:(state, action) =>{
            state.studentToAdd = null
        },
        addStudentsServices:(state, action) =>{
            // if (!state.additionServices) {

                // state.additionServices = [action.payload];
                const newObj = {...action.payload}
                console.log("state.additionServices" , state.additionServices);
                state.additionServices = [...state.additionServices, newObj]
            // } else {
            //     state.additionServices.push(action.payload);
            //     console.log('debugging' ,action.payload);

            // }
        },
        removeServiceFromStudent:(state,action) =>{
            let index = action.payload.index;
            if (index > -1) {
                state.additionServices.splice(index, 1);
            }
        },
        clearAdditions:(state, action) =>{
            state.parentsToAdd = null;
            state.studentsToAdd = null;
            state.additionServices = [];
            state.parentToAdd = null;
            state.studentToAdd = null;
        },
        removeFromStudentsToAdd:(state, action) =>{
            let index = action.payload.index;
            if (index > -1) {
                state.studentsToAdd.splice(index, 1);
            }
        }
    },
});

export const {addParent, setParentToAdd, addStudent,storeStudent,clearStudentStore,addStudentsServices, removeServiceFromStudent,clearAdditions,removeFromStudentsToAdd} = customersSlice.actions;

export default customersSlice.reducer;
