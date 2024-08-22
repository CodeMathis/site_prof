"use client";

import React, { useEffect, useState, CSSProperties, Suspense, lazy } from 'react';
import { faArrowLeft, faArrowRight, faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';

// Dynamically import components
const Accueil = lazy(() => import('@/components/Accueil'));
const Cours = lazy(() => import('@/components/Cours'));
const Quizz = lazy(() => import('@/components/Quizz'));
const EClasse = lazy(() => import('@/components/EClasse'));
const Contact = lazy(() => import('@/components/Contact'));
const Connexion = lazy(() => import('@/components/Connexion'));

const topMenuItems = [
    { key: '0', label: '', path: '' },
    { key: '1', label: 'ACCUEIL', path: '/' },
    { key: '2', label: 'COURS', path: '/cours' },
    { key: '3', label: 'QUIZZ', path: '/quizz' },
    { key: '4', label: 'E-CLASSE', path: '/eclasse' },
    { key: '5', label: '', path: '' },
];

const bottomMenuItems = [
    { key: '0', label: '', path: '' },
    { key: '1', label: 'CONTACT', path: '/contact' },
    { key: '2', label: 'CONNEXION', path: '/connexion' },
    { key: '3', label: '', path: '' },
];

function MenuBar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileView, setIsMobileView] = useState(false);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    const location = useLocation();

    // Détection de l'onglet sélectionné en fonction de l'URL actuelle
    useEffect(() => {
        const path = location.pathname;
        const allMenuItems = [...topMenuItems, ...bottomMenuItems];
        const matchedItem = allMenuItems.find(item => item.path === path);
        if (matchedItem) {
            setSelectedItem(matchedItem.label);
        }
    }, [location]);

    useEffect(() => {
        const handleResize = () => setIsMobileView(window.innerWidth < 1280);
        window.addEventListener('resize', handleResize);
        handleResize(); // Check initial size on mount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Render menu items
    const renderMenuItems = (items: typeof topMenuItems | typeof bottomMenuItems) =>
        items.map((item, index) => {
            const isSelected = selectedItem === item.label;
            const isAboveSelected = selectedItem && items[index + 1]?.label === selectedItem;
            const isBelowSelected = selectedItem && items[index - 1]?.label === selectedItem;

            return (
                <div key={item.key} style={{ backgroundColor: "#ffffcc" }}>
                    <li style={{
                        ...styles.navItem,
                        backgroundColor: isSelected && item.label !== '' ? '#ffffcc' : '#000',
                        borderRadius: isAboveSelected ? (isMobileView ? '0 0 20px 0' : '0 0 40px 0') : isBelowSelected ? (isMobileView ? '0 20px 0 0' : '0 40px 0 0') : '0',
                        textAlign: isMobileView ? 'center' : 'left',
                        paddingLeft: isMobileView ? '0' : '40px',
                    }}>
                        {item.label === '' ? (
                            <p style={{ ...styles.navLink, color: '#000', padding: isMobileView ? '0' : '10px 0' }}></p>
                        ) : (
                            <Link
                                to={item.path}
                                style={{
                                    ...styles.navLink,
                                    color: isSelected ? '#000' : '#ffffcc',
                                    fontSize: isMobileView ? '24px' : '38px',
                                }}
                                onClick={() => setSelectedItem(item.label)}
                            >
                                {item.label}
                            </Link>
                        )}
                    </li>
                </div>
            );
        });

    return (
        <div style={styles.mainContainer}>
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
                <div style={styles.toggleButton} onClick={() => setIsCollapsed(!isCollapsed)}>
                    <FontAwesomeIcon icon={isCollapsed ? faArrowRight : faArrowLeft} />
                </div>
            </div>
            <div style={{ ...styles.contentContainer, marginLeft: isCollapsed ? '75px' : isMobileView ? '0' : '20%' }}>
                <Suspense fallback={<div style={styles.loading}>Loading...</div>}>
                    <Routes>
                        <Route path="/" element={<Accueil />} />
                        <Route path="/cours" element={<Cours />} />
                        <Route path="/quizz" element={<Quizz />} />
                        <Route path="/eclasse" element={<EClasse />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/connexion" element={<Connexion />} />
                    </Routes>
                </Suspense>
            </div>
        </div>
    );
}

const styles: { [key: string]: CSSProperties } = {
    mainContainer: {
        display: 'flex',
        height: '100vh',
        backgroundColor: '#ffffcc',
    },
    menuContainer: {
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        left: 0,
        top: 0,
        height: '100%',
        backgroundColor: 'black',
        transition: 'width 0.5s ease',
        zIndex: 999,
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
    },
    contentContainer: {
        flex: 1,
        padding: '20px',
        overflowY: 'auto',
        transition: 'margin 0.5s ease',
    },
    loading: {
        fontSize: '38px',
    }
};

export default function App() {
    return (
        <Router>
            <MenuBar />
        </Router>
    );
}