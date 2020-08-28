import React, {Component} from 'react';
import styles from './PageOfUsers.module.scss';
import getUsers from '../api';
import UserCard from './UserCard';
import Pagination from './Pagination';

class PageOfUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            users: [],
            currentPage: 1,
        };
    }

    setPage = currentPage => {
        this.setState({
            currentPage,
        });
    };

    load = () => {
        const {currentPage} = this.state;
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
        const {currentPage} = this.state;
        if (currentPage !== prevState.currentPage) {
            this.load();
        }
    }

    render() {
        const {error, isLoaded, users, currentPage} = this.state;
        if (error) {
            return <div>Ошибка: {error.message}</div>;
        }
        if (!isLoaded) {
            return <div>Загрузка...</div>;
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
                <Pagination currentPage={currentPage} setPage={this.setPage}/>
            </>
        );
    }
}

PageOfUsers.propTypes = {};

export default PageOfUsers;