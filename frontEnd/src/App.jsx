import { RouterProvider } from "react-router-dom";

import { router } from "./Routes/Routes";

function App() {
  return (
    <div className=" w-screen h-screen ">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
