import React, {useState} from 'react';
import PageOfUsers from './components/PageOfUsers';
import Pagination from './components/Pagination';

function App() {
    const [currentPage, setCurrentPage] = useState(1);
    return (
        <>
            <Pagination currentPage={currentPage} setPage={setCurrentPage}/>
            <PageOfUsers currentPage={currentPage}/>
        </>
    );
}

export default App;
