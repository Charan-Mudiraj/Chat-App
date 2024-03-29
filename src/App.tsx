import AddUser from "./Components/AddUser";
import Chat from "./Screens/Chat";
import ChatsList from "./Screens/ChatsList";
import About from "./Screens/About";
import Loader from "./Components/Loader";
import { useRecoilValue } from "recoil";
import { globalLoaderAtom } from "./atoms/atom";
import { sideScreenAtom } from "./atoms/atom";
import { SideScreenSchema } from "./Components/types";

function SideScreen({ Screen }: any) {
  return (
    <>
      <div className="bg-zinc-700 bg-opacity-60 w-0.5 hidden md:block"></div>
      {Screen}
    </>
  );
}
export default function App() {
  const isLoading = useRecoilValue(globalLoaderAtom);
  const currentSideScreen = useRecoilValue<SideScreenSchema>(sideScreenAtom);
  return (
    <>
      {isLoading && <Loader />}
      {window.localStorage.getItem("chatapp-user-id") == null && <AddUser />}
      <div className="md:flex md:w-screen overflow-hidden">
        <ChatsList classes="md:w-5/12" />

        <SideScreen
          Screen={
            currentSideScreen.listId ? (
              <Chat classes="hidden md:flex" />
            ) : (
              <About classes="hidden md:flex" />
            )
          }
        />
      </div>
    </>
  );
}
