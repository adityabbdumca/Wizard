import { configureStore } from "@reduxjs/toolkit";
import policyWizardReducer from "../features/policyWizard/policyWizardSlice";

export const store = configureStore({
  reducer: {
    policyWizard: policyWizardReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "policyWizard/submitFormAsync/pending",
          "policyWizard/submitFormAsync/fulfilled",
          "policyWizard/submitFormAsync/rejected",
        ],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
