import './App.css'
import { AuthProvider } from './features/auth'
import AppRouter from './router/AppRouter'

function App() {
  
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  )
}

export default App
