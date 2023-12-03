import { createSlice } from "@reduxjs/toolkit";
import { collection, addDoc, query, getDocs, where, serverTimestamp } from "firebase/firestore";
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
   },
  },
  childDetail: [],
 
  files: [],
  status: 'Todo',
  timestamp: serverTimestamp()
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
           cityOfBirth: action.payload.cityOfBirth,
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
        },

        familyDetails: (state, action) =>{
          state.user = { ...state.user, 
           family: {
            maritalStatus: action.payload.maritalStatus,
            spouseName: action.payload.spouseName,
            spouseDob: action.payload.spouseDob,
            marriageDate: action.payload.marriageDate,
            divorceDate: action.payload.divorceDate,
            spouseOccupation: action.payload.spouseOccupation,

            father: {
              name: action.payload.fatherName,
              dateOfBirth: action.payload.fatherDob,
              occupation: action.payload.fatherOccupation,
              address: action.payload.fatherAddress
            },

            mother: {
              name: action.payload.motherName,
              dateOfBirth: action.payload.motherDob,
              occupation: action.payload.motherOccupation,
              address: action.payload.motherAddress
            } 
           }           
          }
        },

        childDetails: (state, action) =>{
          state.user = { ...state.user,
            childDetail: [...state.user.childDetail, 
              {
                childName: action.payload.childName,
                childDob: action.payload.childDob,
                childGender:  action.payload.childGender 
              }
            ]
          }
        },


        filesFunc: (state, action) =>{
          state.user = {...state.user, 
           files: [...state.user.files, 
            {
             url: action.payload.url, 
             ext: action.payload.ext
            }
          ]
         }
        } 
      }
})

export const {  started, personal,
                application, travels,
                eductionHistory,
                occupation,
                familyDetails,
                filesFunc,
                childDetails
               } = Database.actions
export default Database.reducer


