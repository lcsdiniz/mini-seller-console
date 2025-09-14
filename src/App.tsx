import { Toaster } from "react-hot-toast"
import HomePage from "./pages/HomePage"

function App() {
  return (
    <>
      <HomePage />

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#fff",
            color: "#333",
            borderRadius: "8px",
            padding: "12px 16px",
          },
        }}
      />
    </>
  )
}

export default App
