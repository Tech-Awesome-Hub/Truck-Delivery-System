import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TruckDetails = () => {
  const { id } = useParams();
  const [truck, setTruck] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    axios.get(`http://localhost/dtms/api/truck_details.php?id=${id}`)
      .then(response => {
        setTruck(response.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading truck details...</p>;
  if (!truck) return <p>No truck found.</p>;

  return (
    <div>
      <h1>{truck.name}</h1>
      <p>Capacity: {truck.capacity}</p>
      <p>Status: {truck.status ? 'Available' : 'Unavailable'}</p>
    </div>
  );
};

export default TruckDetails;
