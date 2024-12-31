function delay<T>(ms: number, value: T): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(value);
    }, ms);
  });
}

type Product = {
  id: number;
  name: string;
  price: number;
};

const products: Product[] = [
  { id: 1, name: "foo", price: 100 },
  { id: 2, name: "bar", price: 200 },
  { id: 3, name: "baz", price: 300 },
  { id: 4, name: "qux", price: 400 },
  { id: 5, name: "quux", price: 500 },
];

type Result<Data, Error> =
  | {
      success: true;
      data: Data;
      error: null;
    }
  | {
      success: false;
      data: null;
      error: Error;
    };

async function* getProductBatch(
  batchSize: number
): AsyncGenerator<Result<Product[], { message: string }>> {
  let currentIndex = 0;

  while (currentIndex < products.length) {
    const batch = products.slice(currentIndex, currentIndex + batchSize);
    if (batch.length === 0) {
      yield {
        success: false,
        data: null,
        error: { message: "No more products available" },
      };
    }

    yield await delay(1000, {
      success: true,
      data: batch,
      error: null,
    });

    currentIndex += batchSize;
  }
}

(async function main() {
  const batchSize = 2;
  const productBatches = getProductBatch(batchSize);
  const startTime = Date.now();

  console.log("Starting batch retrieval...");
  for await (const batch of productBatches) {
    const elapsedSeconds = (Date.now() - startTime) / 1000;
    if (batch.success) {
      console.log(
        `[${elapsedSeconds.toFixed(1)}초] products: ${batch.data.map((p) => p.name).join(", ")}`
      );
    } else {
      console.log(
        `[${elapsedSeconds.toFixed(1)}초] error: ${batch.error.message}`
      );
    }
  }
})();
