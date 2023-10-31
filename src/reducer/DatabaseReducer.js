import { createSlice } from "@reduxjs/toolkit";
import { collection, addDoc, query, getDocs, where } from "firebase/firestore";
import db from '../firebaseConfig';


let data = {
  passportNumber:null,
  issueDate: null,
  expiryDate:null,
  fullName: null,
  phone: null,
  dob: null,
  gender: null,
  cityOfBirth: null,
  address: null,
  applicationHistory: {
    applications: []
  },
  travelDetails: [],
    //  [
    //   {
    //    country: null,
    //    purpose: null,
    //    from: null,
    //    to: null
    // }]
   education: [],
   jobs: [], 
   family: {
    maritalStatus: null,
    spouseName: null,
    spouseDob: null,
    marriageDate: null,
    divorceDate: null,
    spouseOccupation: null,
    numberOfChildren: null,
    children: []
    //  [{
    //   name: null,
    //   dateOfBirth: null,
    //   relationship: null
    // }]
    ,
    father: {
     name: null,
     dateOfBirth: null,
     occupation: null,
     address: null
    },
 
    mother: {
     name: null,
     dateOfBirth: null,
     occupation: null,
     address: null
   }
 },
 
 files: []
};


export const Database = createSlice({
    name: 'Firestore Database',
    initialState: {user: data},
    reducers: {
        started: (state, action) =>{
          state.user.passportNumber = action.payload.passportNumber;
          state.user.issueDate = action.payload.issueDate;
          state.user.expiryDate = action.payload.expiryDate;
         
        },

        personal: (state, action) =>{
          state.user = { ...state.user,
           fullName:  action.payload.fullname,
           phone:  action.payload.phone,
           dob: action.payload.dob,
           gender: action.payload.gender,
           cityOfBirth: action.payload.placeofBirth,
           address: action.payload.address
          }
        },

        application: (state, action) =>{
          state.user = { ...state.user,
            applicationHistory: {
              applications : [ ...state.user.applicationHistory.applications, 
                {
                  country: action.payload.country,
                  dateOfApplication: action.payload.applicationDate,
                  status: action.payload.status,
                  issueDate: action.payload.issueDate,
                  expiryDate: action.payload.expiryDate,
                  denialDate: action.payload.denialDate,
                  reason: action.payload.reason
              
                }]
              }
          }
          console.log('Inserted');
        },

        
        travels: (state, action) =>{
          state.user = { ...state.user,
            travelDetails: [...state.user.travelDetails, 
              {
                  country: action.payload.country,
                  purpose: action.payload.purpose,
                  from: action.payload.from,
                  to: action.payload.to
              }
            ]
          }
        },

        eductionHistory: (state, action) =>{
          state.user = { ...state.user,
            education: [...state.user.education, 
              {
                  school: action.payload.school,
                  certification: action.payload.certification,
                  course: action.payload.course,
                  from: action.payload.from,
                  to: action.payload.to
              }
            ]
          }
        },

        occupation: (state, action) =>{
          state.user = { ...state.user,
            jobs: [...state.user.jobs, 
              {
                  company: action.payload.company,
                  position: action.payload.position,
                  jobTitle: action.payload.jobTitle,
                  from: action.payload.from,
                  to: action.payload.to,
                  address: action.payload.jobAddress
              }
            ]
          }
        }




    }
})

export const {  started, personal,
                application, travels,
                eductionHistory,
                occupation } = Database.actions
export default Database.reducer


