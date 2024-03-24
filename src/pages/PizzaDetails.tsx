import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

type TPizzaObj = {
  imageUrl: string;
  title: string;
  price: number;
};

const PizzaDetails: React.FC = () => {
  const { id } = useParams();
  const [pizza, setPizza] = useState<TPizzaObj>({
    imageUrl: '',
    title: '',
    price: 0,
  });

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get('https://65b69bf5da3a3c16ab00f9b4.mockapi.io/items/' + id);
        setPizza(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchPizza();
  }, []);

  if (!pizza) {
    return <>Loading...</>;
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price}$</h4>
    </div>
  );
};

export default PizzaDetails;
