import MenuBar from "@/components/MenuBar";
import Chapitre from "@/components/Chapitre";

export default async function Page({ params }: { params: { chapitreId: number } }) {
    return (
        <main className={'lilita-one-regular'}>
            <MenuBar></MenuBar>
            <Chapitre chapitreId={params.chapitreId}></Chapitre>
        </main>
    );
}