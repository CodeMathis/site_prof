import Image from "next/image";
import MenuBar from "../components/MenuBar";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <MenuBar></MenuBar>
        </main>
  );
}
