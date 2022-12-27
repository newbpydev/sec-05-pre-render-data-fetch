import path from "path";
import fs from "fs/promises";
import {
  GetStaticProps,
  GetStaticPropsResult,
  GetStaticPropsContext,
} from "next";

import styles from "../styles/Home.module.css";
import { Fragment } from "react";
import Link from "next/link";

export interface Product {
  id: string;
  title: string;
  description: string;
}

interface Props {
  products: Product[];
}

export default function Home({ products }: Props) {
  return (
    <Fragment>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link href={product.id}>{product.title}</Link>
          </li>
        ))}
      </ul>
    </Fragment>
  );
}

// export const getStaticProps: GetStaticProps = async (context) => {
// }

export async function getStaticProps(context: any) {
  // export async function getStaticProps(context) {

  // export async function getStaticProps(
  //   context
  // ): Promise<GetStaticPropsResult<Props>> {
  // export const getStaticProps = async ({
  //   params,
  // }: GetStaticPropsContext): Promise<GetStaticPropsResult<Props>> => {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData.toString());

  // console.log(context);
  console.log(data.products);

  if (!data) {
    return {
      redirect: {
        destination: "/some-route",
        permanent: false,
      },
    };
  }

  if (data.products.length === 0) {
    return { notFound: true };
  }

  return {
    props: {
      products: data.products,
    },

    // ! this will enable ISR: Incremental Static Regeneratrion
    revalidate: 10,

    // ! this will send the client to the 404 not found page
    // notFound: true,

    // ! this will redirect the user
    // redirect: {destination: '/no-data'}
  };
}
