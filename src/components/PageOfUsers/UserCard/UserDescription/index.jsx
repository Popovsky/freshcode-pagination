import React from 'react';
import PropTypes from 'prop-types';
import styles from './UserDescription.module.scss';

const UserDescription = ({user: {name: {first, last}, dob: {age}, email}}) => {
    return (
        <div className={styles.container}>
            <h1 className={styles.fullName}>{`${first} ${last}`.trim()}</h1>
            <div className={styles.age}>{age}</div>
            <a href={email}>{email}</a>
        </div>
    );
};

UserDescription.propTypes = {
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
    }),
};

UserDescription.defaultProps = {
    user: {
        email: '',
        name: {
            first: '',
            last: '',
        },
        dob: {
            age: null,
        },
    }
};

export default UserDescription;