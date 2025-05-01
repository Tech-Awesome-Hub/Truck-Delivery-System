import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [trucks, setTrucks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost/dtms/api/trucks.php')  // Update with your PHP API
      .then(response => {
        setTrucks(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading trucks...</p>;
  if (error) return <p>Error loading trucks: {error}</p>;

  return (
    <div>
      <h1>Truck List</h1>
      <ul>
        {trucks.map(truck => (
          <li key={truck.id}>
            <Link to={`/truck/${truck.id}`}>{truck.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
