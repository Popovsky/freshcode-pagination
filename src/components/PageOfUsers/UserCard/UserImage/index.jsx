import React from 'react';
import PropTypes from 'prop-types';
import styles from './UserImage.module.scss';
import classNames from 'classnames';
import stringToHexColor from './stringToHexColor';

class UserImage extends React.Component {
    constructor(props) {
        super(props);
        const img = new Image();
        img.addEventListener('load', this.handleLoad);
        img.addEventListener('error', this.handleError);
        this.state = {
            isLoaded: false,
            error: false,
            img,
        }
    }
    handleLoad = () => {
        this.setState({
            isLoaded: true,
        });
    };

    handleError = () => {
        this.setState({
            error: true,
        });
    };

    componentDidMount() {
        const {img} = this.state;
        const {user: {picture: {large}}} = this.props;
        if (large === '') {
            this.setState({
                isLoaded: true,
                error: false,
            });
        } else {
            img.src = large;
        }
    }

    render() {
        const {isLoaded, error} = this.state;
        const {user: {name: {first, last}, picture: {large}, gender}} = this.props;
        const containerClasses = classNames(styles.container, {
            [styles.male]: gender === 'male',
            [styles.female]: gender === 'female',
        });
        const userBackgroundColor = stringToHexColor(`${first}${last}` || 'default');
        return (
            <div className={containerClasses} style={{backgroundColor: userBackgroundColor}}>
                <div className={styles.initials}>{`${first[0] ?? ''}${last[0] ?? ''}`}</div>
                {isLoaded && !error && <img className={styles.image} src={large} alt=''/>}
            </div>
        );
    }
}

UserImage.propTypes = {
    user: PropTypes.shape({
        gender: PropTypes.string,
        picture: PropTypes.shape({
            large: PropTypes.string,
        }),
        name: PropTypes.shape({
            first: PropTypes.string,
            last: PropTypes.string,
        }),
    }),
};

UserImage.defaultProps = {
    user: {
        gender: '',
        picture: {
            large: '',
        },
        name: {
            first: '',
            last: '',
        },
    },
}

export default UserImage;