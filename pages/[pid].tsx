import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next";
import { Fragment } from "react";
import fs from "fs/promises";
import path from "path";

import { Product } from ".";

interface PageParams {
  pid: string;
}

interface Data {
  products: Product[];
}

interface Props {
  loadedProduct: Product | undefined;
}

export default function ProductDetailPage({ loadedProduct }: Props) {
  // console.log(loadedProduct);

  if (!loadedProduct) return <p>Loading...</p>;

  return (
    <div>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </div>
  );
}

// @ getData()
async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data: Data = JSON.parse(jsonData.toString());

  return data;
}

// @ getStaticProps()
export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<Props>> {
  const data = await getData();
  const products: Product[] = data.products;

  const { params } = context;
  // console.log(context);

  const productId = params?.pid;

  const product: Product | undefined = products.find(
    (product) => product.id === productId
  );

  return {
    props: {
      loadedProduct: product,
    },
  };
}

// @ getStaticPaths()
export async function getStaticPaths() {
  const data = await getData();

  const ids = data.products.map((product) => product.id);
  const pathsWithParams = ids.map((id) => ({ params: { pid: id } }));

  return {
    paths: pathsWithParams,
    // paths: [
    // { params: { pid: "p1" } },
    // { params: { pid: "p2" } },
    // { params: { pid: "p3" } },
    // ],
    fallback: false,
    // fallback: true,
  };
}
