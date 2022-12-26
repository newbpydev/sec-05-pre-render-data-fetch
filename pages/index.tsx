import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import { Fragment } from "react";

const inter = Inter({ subsets: ["latin"] });

interface Product {
  id: string;
  title: string;
}

interface Props {
  products: Product[];
}

export default function Home({ products }: Props) {
  return (
    <Fragment>
      <ul>
        <li>Product 1</li>
        <li>Product 2</li>
        <li>Product 3</li>
      </ul>
    </Fragment>
  );
}

export async function getStaticProps() {
  return {
    props: {
      products: [{ id: "p1", title: "Product 1" }],
    },
  };
}
