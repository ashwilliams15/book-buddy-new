import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h3>Do we have all the ingredients?</h3>
      <p>
        Click <Link to="/pantry">HERE</Link>  to find out
      </p>
    </div>
  )
}

export default Home;
