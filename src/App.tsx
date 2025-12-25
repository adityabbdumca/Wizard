import { Provider } from "react-redux";
import { store } from "./app/store";
import PolicyWizard from "./components/wizard/PolicyWizard";

const App = () => {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50">
        <PolicyWizard />
      </div>
    </Provider>
  );
};

export default App;
