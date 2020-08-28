import React from 'react';
import PropTypes from 'prop-types';
import styles from './UserCard.module.scss';
import classNames from 'classnames';
import UserImage from './UserImage';
import getBackgroundImage from './getBackgroundImage';
import UserDescription from './UserDescription';

const UserCard = ({user}) => {
    const containerClasses = classNames(styles.container, styles[getBackgroundImage(user.dob.date)]);
    return (
        <div className={containerClasses}>
            <div className={styles.wrapper}>
                <UserImage user={user}/>
                <UserDescription user={user}/>
            </div>
        </div>
    );
}

UserCard.propTypes = {
    user: PropTypes.shape({
        email: PropTypes.string,
        gender: PropTypes.string,
        picture: PropTypes.shape({
            large: PropTypes.string,
            medium: PropTypes.string,
            thumbnail: PropTypes.string,
        }),
        name: PropTypes.shape({
            title: PropTypes.string,
            first: PropTypes.string,
            last: PropTypes.string,
        }),
        dob: PropTypes.shape({
            date: PropTypes.string,
            age: PropTypes.number,
        }),
    }).isRequired,
};


export default UserCard;