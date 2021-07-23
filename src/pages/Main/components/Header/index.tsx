import React from 'react';
import style from './index.module.scss';

const Header: React.FC = ({ children }) => {
    return (
        <header className={style.header}>
            <div className={style['header-container']}>
                {children}
            </div>
        </header>
    );
};

export default Header;