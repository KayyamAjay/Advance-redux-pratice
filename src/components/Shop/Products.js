import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const dummy = [
  {
    id: "p1",
    price: 6,
    title: "first book",
    description: "my first book",
  },
  {
    id: "p2",
    price: 6,
    title: "second book",
    description: "my second book",
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {dummy.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
