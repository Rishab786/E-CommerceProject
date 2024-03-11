import React from "react";
import Card from "../components/Card";

import { useQuery } from "@apollo/client";
import { GET_ALL_PRODUCTS } from "../gqlOperations/queries";

const Home = () => {
  const { loading, error, data } = useQuery(GET_ALL_PRODUCTS);

  if (loading) return <h1>Loading Please wait</h1>;
  if (error) return <h1>Something went wrong</h1>;

  return (
    <div>
      <div className="homeroot">
        {data.products.map(({ name, url, price, description, _id }) => {
          return (
            <Card
              key={_id}
              id={_id}
              name={name}
              price={price}
              description={description}
              img={url}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
