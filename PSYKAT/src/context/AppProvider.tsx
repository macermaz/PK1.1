// src/context/AppProvider.tsx

const initialState = {
  // ... otros campos ...
+ clinicalHistory: [] as SessionInfo[], 
};

type Action =
  // ... otras acciones ...
+ | { type: 'ADD_SESSION', payload: SessionInfo };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    // ... otros casos ...
+   case 'ADD_SESSION':
+     return {
+       ...state,
+       clinicalHistory: [...state.clinicalHistory, action.payload]
+     };
    default:
      return state;
  }
}

// En tu proveedor, añade el método dispatch para agregar sesiones:
export const AppProvider: React.FC = ({ children }) => {
  // ... setup del contexto ...
+ const addSessionToHistory = (session: SessionInfo) => {
+   dispatch({ type: 'ADD_SESSION', payload: session });
+ };
  return (
    <AppContext.Provider value={{
      // ... otros valores ...
+     addSessionToHistory
    }}>
      {children}
    </AppContext.Provider>
  );
};
