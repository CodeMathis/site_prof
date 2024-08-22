"use client";

interface ChapitreProps {
    chapitreId: number;
}

function Chapitre({ chapitreId } : ChapitreProps) {
    //takes the chapter id from the URL
    return (
        <div>
            <h1>Chapitre {chapitreId}</h1>
        </div>
    );
}

export default Chapitre;