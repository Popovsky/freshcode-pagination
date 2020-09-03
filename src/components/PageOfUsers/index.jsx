import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from './PageOfUsers.module.scss';
import classNames from 'classnames';
import getUsers from '../api';
import UserCard from './UserCard';

class PageOfUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            users: [],
        };
    }

    load = () => {
        this.setState({
            isLoaded: false,
        });
        const {currentPage} = this.props;
        getUsers({page: currentPage})
            .then(
                (res) => {
                    this.setState({
                        isLoaded: true,
                        users: res.results
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    componentDidMount() {
        this.load();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {currentPage} = this.props;
        if (currentPage !== prevProps.currentPage) {
            this.load();
        }
    }

    render() {
        const {error, isLoaded, users} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        }
        if (!isLoaded) {
            const loaderClasses = classNames('loader', styles.loader);
            return <div className={loaderClasses}/>;
        }
        return (
            <>
                <ul className={styles.container}>
                    {users.map(user => (
                        <li key={user.email}>
                            <UserCard user={user}/>
                        </li>
                    ))}
                </ul>

            </>
        );
    }
}

PageOfUsers.propTypes = {
    currentPage: PropTypes.number,
};

PageOfUsers.defaultProps = {
    currentPage: 1,
};

export default PageOfUsers;