import { AuthContext } from './src/context/AuthContext';
import { StateContext } from './src/context/StateContext';
import MainNavigator from './src/screens/MainNavigator';

export default function App() {

  return (
    <AuthContext>
      <StateContext>
        <MainNavigator />
      </StateContext>
    </AuthContext>
  );
}

