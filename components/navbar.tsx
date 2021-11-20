import styles from '../styles/components/Navigation.module.scss'

import { AnimateSharedLayout, motion } from 'framer-motion';
import { useState } from 'react';

interface NavBarProps{
    onBurgerMenuClick: () => void
}

export default function Navigation({ onBurgerMenuClick }: NavBarProps) {
    // const [selected, setSelected] = useState("home");

    return (
        <nav id="navbar" className={styles.nav}>
            <div className={styles.container}>
                <h1>Arda Fevzi Armutcu</h1>
                <AnimateSharedLayout>
                    <ul className={styles.linkWrap}>
                        <NavigationItem label="About" href="/"/>
                        <NavigationItem label="Works" href="/"/>
                    </ul>
                </AnimateSharedLayout>
                <a onClick={onBurgerMenuClick} className={styles.burgerNav}><i className={"bx bx-menu"} /></a>
            </div>
        </nav>
    );
}

interface NavigationItemProps{
    label: string,
    isSelected?: boolean,
    href: string,

}

function NavigationItem({ label, isSelected, href }: NavigationItemProps) {

    return (
        <li className={styles.item}>
            {isSelected && (
                <motion.div
                    className={styles.underline}

                    layoutId="underline"
                    initial={false}
                    transition={{ stiffness: 500 }}
                />
            )}
            <a aria-label={label} href={href}>
                {label}
            </a>
        </li>
    );
}