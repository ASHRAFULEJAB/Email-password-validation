import React from 'react';
import {Link,Outlet} from 'react-router-dom'

const Main = () => {
    return (
        <div className='text-center fs-2'>
            <nav className='mr-5'>
                <Link className='mr-5' to='/login'>Login</Link>
                <Link to='/register'>Register</Link>
            </nav>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;