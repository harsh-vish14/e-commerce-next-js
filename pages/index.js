import { useSession } from "next-auth/client";
import { useEffect } from "react";
import Home from "../components/home/home";
import Main from "../components/main/main";
export default function HomePage() {
  const [session, loading] = useSession();
  useEffect(() => {
    console.log(session);
  }, [loading]);
  return (
    <>
      <Home />
      <Main />
    </>
  );
}
