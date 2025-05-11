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

type User = {
  id: number;
  name: string;
  email: string;
};

type PaginatedResponse<T> = {
  data: T[];
  page: number;
  totalPages: number;
  hasMore: boolean;
};

async function fetchUserPage(
  page: number,
  limit: number
): Promise<PaginatedResponse<User>> {
  const totalUsers = 25;
  const startIndex = (page - 1) * limit;
  const endIndex = Math.min(startIndex + limit, totalUsers);
  const totalPages = Math.ceil(totalUsers / limit);

  const users: User[] = [];
  for (let i = startIndex; i < endIndex; i++) {
    users.push({
      id: i + 1,
      name: `사용자${i + 1}`,
      email: `user${i + 1}@example.com`,
    });
  }

  return await delay(1500, {
    data: users,
    page,
    totalPages,
    hasMore: page < totalPages,
  });
}

async function* fetchAllUsers(pageSize: number): AsyncGenerator<User[]> {
  let currentPage = 1;
  let hasMore = true;

  while (hasMore) {
    const response = await fetchUserPage(currentPage, pageSize);
    yield response.data;

    hasMore = response.hasMore;
    currentPage++;
  }
}

async function main() {
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
}

async function runPaginationExample() {
  console.log("\n페이지네이션 API 예제 시작...");
  const pageSize = 5;
  const userGenerator = fetchAllUsers(pageSize);
  let pageNum = 1;

  for await (const users of userGenerator) {
    console.log(`페이지 ${pageNum}: ${users.map((u) => u.name).join(", ")}`);
    pageNum++;
  }

  console.log("모든 사용자 데이터를 가져왔습니다.");
}

(async function () {
  await main();
  await runPaginationExample();
})();
