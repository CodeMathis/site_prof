"use client";
import React, { useEffect, useState, CSSProperties } from 'react';
import { faArrowLeft, faArrowRight, faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Accueil from "@/components/Accueil";
import Cours from "@/components/Cours";
import Quizz from "@/components/Quizz";
import EClasse from "@/components/EClasse";
import Contact from "@/components/Contact";
import Connexion from "@/components/Connexion";

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

function MenuBar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileView, setIsMobileView] = useState(window.innerWidth < 1280);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    // Toggle the menu bar
    const toggleMenu = () => setIsCollapsed(prev => !prev);
    const handleSelectItem = (item: string) => setSelectedItem(item);

    // Check if the window is resized to mobile view
    useEffect(() => {
        const handleResize = () => setIsMobileView(window.innerWidth < 1280);
        window.addEventListener('resize', handleResize);
        handleResize(); // Check initial size on mount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Check if the hash in the URL matches a menu item
    useEffect(() => {
        const hash = window.location.hash.substring(1);
        const allMenuItems = [...topMenuItems, ...bottomMenuItems];
        const matchedItem = allMenuItems.find(item => item.href.substring(1) === hash);
        if (matchedItem) handleSelectItem(matchedItem.label);
    }, []);

    // Render menu items
    const renderMenuItems = (items: typeof topMenuItems | typeof bottomMenuItems) =>
        items.map((item, index) => {
            const isSelected = selectedItem === item.label;
            const isAboveSelected = selectedItem && items[index + 1]?.label === selectedItem;
            const isBelowSelected = selectedItem && items[index - 1]?.label === selectedItem;

            return (
                <div key={item.key} style={{backgroundColor: '#ffffcc'}}>
                    <li style={{
                        ...styles.navItem,
                        backgroundColor: isSelected ? '#ffffcc' : '#000',
                        borderRadius: isAboveSelected ? (isMobileView ? '0 0 20px 0' : '0 0 40px 0') : isBelowSelected ? (isMobileView ? '0 20px 0 0' : '0 40px 0 0') : ('0'),
                        textAlign: isMobileView ? 'center' : 'left',
                        paddingLeft: isMobileView ? '0' : '40px',
                    }}>
                        {item.label === '' ?
                            <a style={{ ...styles.navLink, color: isSelected ? '#000' : '#ffffcc', padding: isMobileView ? '0' : '10px 0'}}></a> :
                            <a
                                href={item.href}
                                style={{ ...styles.navLink,
                                    color: isSelected ? '#000' : '#ffffcc',
                                    fontSize: isMobileView ? '24px' : '38px',}}
                                onClick={() => handleSelectItem(item.label)}
                            >
                                {item.label}
                            </a>
                        }
                    </li>
                </div>
            );
        });

    // Render the menu bar
    return (
        <>
            <div style={{ ...styles.menuContainer, width: isCollapsed ? '75px' : isMobileView ? '100%' : '20%' }}>
                <nav style={styles.navBar}>
                    <div style={styles.iconContainer}>
                        <FontAwesomeIcon icon={faGraduationCap} style={styles.graduationIcon} />
                    </div>
                    <ul style={{ ...styles.navList, display: isCollapsed ? 'none' : 'block' }}>
                        {renderMenuItems(topMenuItems)}
                    </ul>
                    <div style={{ flex: 1 }}></div>
                    <ul style={{ ...styles.navList, display: isCollapsed ? 'none' : 'block' }}>
                        {renderMenuItems(bottomMenuItems)}
                    </ul>
                </nav>
                <div style={styles.toggleButton} onClick={toggleMenu}>
                    <FontAwesomeIcon icon={isCollapsed ? faArrowRight : faArrowLeft} />
                </div>
            </div>
            {selectedItem === 'ACCUEIL' && <Accueil />}
            {selectedItem === 'COURS' && <Cours />}
            {selectedItem === 'QUIZZ' && <Quizz />}
            {selectedItem === 'E-CLASSE' && <EClasse />}
            {selectedItem === 'CONTACT' && <Contact />}
            {selectedItem === 'CONNEXION' && <Connexion />}
        </>
    );
}

const styles: { [key: string]: CSSProperties } = {
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
        height: '100%',
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