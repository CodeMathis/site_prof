"use client";
import React, { useEffect, useState } from 'react';
import { faArrowLeft, faArrowRight, faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Accueil from "@/components/Accueil";
import Cours from "@/components/Cours";
import Quizz from "@/components/Quizz";
import EClasse from "@/components/EClasse";
import Contact from "@/components/Contact";
import Connexion from "@/components/Connexion";

function MenuBar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileView, setIsMobileView] = useState(false);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    const toggleMenu = () => {
        setIsCollapsed(!isCollapsed);
    };

    const handleSelectItem = (item: string) => {
        setSelectedItem(item);
    };

    // Monitor screen size to switch to mobile view
    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth < 1280);
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Check initial size on mount

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Set selected item based on the current anchor in the URL
    useEffect(() => {
        const currentAnchor = window.location.hash.substring(1); // Extract the anchor without the '#'

        // Match the current anchor with one of the menu items
        const allMenuItems = [...topMenuItems, ...bottomMenuItems];
        const matchedItem = allMenuItems.find(item => item.href.substring(1) === currentAnchor);

        if (matchedItem) {
            handleSelectItem(matchedItem.label);
        }
    }, []);

    // Split the items into top and bottom groups
    const topMenuItems = [
        { key: '0', label: '', href: '' },
        { key: '1', label: 'ACCUEIL', href: '#accueil' },
        { key: '2', label: 'COURS', href: '#cours' },
        { key: '3', label: 'QUIZZ', href: '#quizz' },
        { key: '4', label: 'E-CLASSE', href: '#eclasse' },
        { key: '5', label: '', href: '' },
    ];

    const bottomMenuItems = [
        { key: '0', label: '', href: '' },
        { key: '1', label: 'CONTACT', href: '#contact' },
        { key: '2', label: 'CONNEXION', href: '#connexion' },
        { key: '3', label: '', href: '' },
    ];

    return (
        <>
            <div style={{...styles.menuContainer, width: isCollapsed ? '75px' : isMobileView ? '100%' : '20%'}}>
                <nav style={styles.navBar}>
                    <div style={styles.iconContainer}>
                        <FontAwesomeIcon icon={faGraduationCap} style={styles.graduationIcon}/>
                    </div>
                    <ul style={{...styles.navList, display: isCollapsed ? 'none' : 'block'}}>
                        {topMenuItems.map((item, index) => {
                            const isSelected = selectedItem === item.label;
                            const isAboveSelected = selectedItem && topMenuItems[index + 1]?.label === selectedItem;
                            const isBelowSelected = selectedItem && topMenuItems[index - 1]?.label === selectedItem;

                            return (
                                <div key={item.key} style={{backgroundColor: '#ffffcc'}}>
                                    <li
                                        style={{
                                            ...styles.navItem,
                                            backgroundColor: isSelected ? '#ffffcc' : '#000',
                                            borderRadius: isAboveSelected ? '0 0 40px 0' : isBelowSelected ? '0 40px 0 0' : '0',
                                            textAlign: isMobileView ? 'center' : 'left',
                                            paddingLeft: isMobileView ? '0' : '40px',
                                        }}
                                    >
                                        {item.label === '' ?
                                            <a style={{
                                                ...styles.navLink,
                                                color: isSelected ? '#000' : '#ffffcc',
                                                padding: "10px 0"
                                            }}></a> :
                                            <a
                                                href={item.href}
                                                style={{
                                                    ...styles.navLink,
                                                    color: isSelected ? '#000' : '#ffffcc',
                                                }}
                                                onClick={() => handleSelectItem(item.label)}
                                            >
                                                {item.label}
                                            </a>}
                                    </li>
                                </div>
                            );
                        })}
                    </ul>

                    <div style={{flex: 1}}></div>
                    {/* Spacer to push the bottom items down */}

                    {/* Bottom items */}
                    <ul style={{...styles.navList, display: isCollapsed ? 'none' : 'block'}}>
                        {bottomMenuItems.map((item, index) => {
                            const isSelected = selectedItem === item.label;
                            const isAboveSelected = selectedItem && bottomMenuItems[index + 1]?.label === selectedItem;
                            const isBelowSelected = selectedItem && bottomMenuItems[index - 1]?.label === selectedItem;

                            return (
                                <div key={item.key} style={{backgroundColor: '#ffffcc'}}>
                                    <li
                                        style={{
                                            ...styles.navItem,
                                            backgroundColor: isSelected ? '#ffffcc' : '#000',
                                            borderRadius: isAboveSelected ? '0 0 40px 0' : isBelowSelected ? '0 40px 0 0' : '0',
                                            textAlign: isMobileView ? 'center' : 'left',
                                            paddingLeft: isMobileView ? '0' : '40px',
                                        }}
                                    >
                                        {item.label === '' ?
                                            <a style={{
                                                ...styles.navLink,
                                                color: isSelected ? '#000' : '#ffffcc',
                                                padding: "10px 0"
                                            }}></a> :
                                            <a
                                                href={item.href}
                                                style={{
                                                    ...styles.navLink,
                                                    color: isSelected ? '#000' : '#ffffcc',
                                                }}
                                                onClick={() => handleSelectItem(item.label)}
                                            >
                                                {item.label}
                                            </a>}
                                    </li>
                                </div>
                            );
                        })}
                    </ul>
                </nav>

                <div style={styles.toggleButton} onClick={toggleMenu}>
                    {isCollapsed ? <FontAwesomeIcon icon={faArrowRight}/> : <FontAwesomeIcon icon={faArrowLeft}/>}
                </div>
            </div>
            {selectedItem === 'ACCUEIL' && <Accueil></Accueil>}
            {selectedItem === 'COURS' && <Cours></Cours>}
            {selectedItem === 'QUIZZ' && <Quizz></Quizz>}
            {selectedItem === 'E-CLASSE' && <EClasse></EClasse>}
            {selectedItem === 'CONTACT' && <Contact></Contact>}
            {selectedItem === 'CONNEXION' && <Connexion></Connexion>}
        </>

    );
}

const styles: { [key: string]: React.CSSProperties } = {
    menuContainer: {
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        left: 0,
        top: 0,
        height: '100vh',
        backgroundColor: 'black',
        transition: 'width 0.5s ease',
    },
    navBar: {
        padding: '10px 0 0 0',
        display: 'flex',
        flexDirection: 'column',
        height: '100%', // Ensure the navbar takes the full height
    },
    iconContainer: {
        textAlign: 'center',
        marginBottom: '20px',
    },
    graduationIcon: {
        color: '#ffffcc',
        fontSize: '50px',
    },
    navList: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
    },
    navItem: {
        padding: '10px',
        transition: 'background-color 0.3s ease, border-radius 0.3s ease',
    },
    navLink: {
        textDecoration: 'none',
        fontSize: '38px',
        display: 'block',
        transition: 'color 0.3s ease',
    },
    toggleButton: {
        backgroundColor: '#333333',
        color: '#ffffcc',
        padding: '10px',
        cursor: 'pointer',
        textAlign: 'center',
        fontSize: '30px',
    }
};

export default MenuBar;