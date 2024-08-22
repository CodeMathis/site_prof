"use client";
import React from 'react';

// Exemple de données des chapitres
const chapitres = [
    { id: 1, nom: 'Chapitre 1', image: 'https://via.placeholder.com/1000x800' },
    { id: 2, nom: 'Chapitre 2', image: 'https://via.placeholder.com/300x200' },
    { id: 3, nom: 'Chapitre 3', image: 'https://via.placeholder.com/300x200' },
    { id: 4, nom: 'Chapitre 4', image: 'https://via.placeholder.com/300x200' },
    { id: 5, nom: 'Chapitre 5', image: 'https://via.placeholder.com/300x200' },
    { id: 6, nom: 'Chapitre 6', image: 'https://via.placeholder.com/300x200' },
    { id: 7, nom: 'Chapitre 7', image: 'https://via.placeholder.com/300x200' },
    { id: 8, nom: 'Chapitre 8', image: 'https://via.placeholder.com/300x200' },
];

function Cours() {
    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Chapitres</h1>
            <div style={styles.grid}>
                {chapitres.map(chapitre => (
                    <div key={chapitre.id} style={{...styles.chapter, backgroundImage: `url(${chapitre.image})`}}>
                        <div style={styles.overlay}>
                            <h3 style={styles.text}>{chapitre.nom}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        padding: '20px',
    },
    heading: {
        textAlign: 'center',
        marginBottom: '38px',
    },
    grid: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        justifyContent: 'center',
    },
    chapter: {
        width: '400px',
        height: '300px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '8px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#ffffcc',
        fontWeight: 'bold',
        textAlign: 'center',
        padding: '10px',
    },
};

export default Cours;