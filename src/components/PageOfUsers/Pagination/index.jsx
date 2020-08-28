import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styles from './Pagination.module.scss';
import classNames from 'classnames';
import Icon from '@mdi/react';
import {mdiDotsHorizontal} from '@mdi/js';

const getNewArrayOfItems = (pages) => (
    [...new Array(pages - 1)]
);

const Pagination = props => {
    const {currentPage, pages, setPage} = props;
    const [arrayOfItems, setArrayOfItems] = useState(getNewArrayOfItems(pages).map((item, index) => index + 2));

    const createItemClasses = (number) => classNames(styles.item, {
        [styles.currentItem]: currentPage === number,
    });

    const getArrayOfItems = () => arrayOfItems.map((item, index) => {
        if (index === 0 && item !== 2) {
            return getEllipsisItem(item);
        }
        return <li key={item} onClick={() => handleClick(item, index)} className={createItemClasses(item)}>{item}</li>
    });

    const getEllipsisItem = (key = null) => (
        <li key={key} className={styles.lastItem}>
            <Icon className={styles.ellipsis} path={mdiDotsHorizontal}/>
        </li>
    );

    const handleClick = (newCurrentPage, index) => {
        setPage(newCurrentPage);
        switch (index) {
            case undefined:
                setArrayOfItems(getNewArrayOfItems(pages).map((item, i) => i + 2));
                break;
            case arrayOfItems.length - 1:
                setArrayOfItems(getNewArrayOfItems(pages).map((item, i) => newCurrentPage + i - index + 1));
                break;
            case 1:
                newCurrentPage !== 3 && setArrayOfItems(getNewArrayOfItems(pages).map((item, i) => newCurrentPage + i - index - 1));
                break;
            default:
                return;
        }
    }

    return (
        <ul className={styles.container}>
            <li onClick={() => handleClick(1)} className={createItemClasses(1)}>1</li>
            {getArrayOfItems()}
            {getEllipsisItem()}
        </ul>
    );
};

Pagination.propTypes = {
    pages: PropTypes.number,
    currentPage: PropTypes.number.isRequired,
    setPage: PropTypes.func.isRequired,
};

Pagination.defaultProps = {
    pages: 10,
}

export default Pagination;