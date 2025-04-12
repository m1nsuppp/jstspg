import { z } from "zod";

function createAPISuccessResponseSchema<Result extends z.ZodTypeAny>(
  resultSchema: Result
): z.ZodObject<{
  success: z.ZodLiteral<true>;
  result: Result;
}> {
  return z
    .object({
      success: z.literal(true),
      result: resultSchema,
    })
    .strict();
}

const apiErrorResponseSchema = z
  .object({
    success: z.literal(false),
    message: z.string(),
    code: z.number(),
  })
  .strict();

function createAPIResponseSchema<Result extends z.ZodTypeAny>(
  resultSchema: Result
): z.ZodDiscriminatedUnion<
  "success",
  [
    ReturnType<typeof createAPISuccessResponseSchema<Result>>,
    typeof apiErrorResponseSchema,
  ]
> {
  return z.discriminatedUnion("success", [
    createAPISuccessResponseSchema(resultSchema),
    apiErrorResponseSchema,
  ]);
}

type ExtractAPISuccessResponse<Result> = Extract<Result, { success: true }>;

const somethingAPIResponseSchema = createAPIResponseSchema(z.string());

type SomethingAPIResponse = ExtractAPISuccessResponse<
  z.infer<typeof somethingAPIResponseSchema>
>;

class APIError extends Error {
  code: number;
  protected __isAPIError = true;

  constructor(message: string, code: number) {
    super(message);
    this.name = "APIError";
    this.code = code;
  }

  toJSON(): { name: string; message: string; code: number; stack?: string } {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      stack: this.stack,
    };
  }
}

function isAPIError(error: unknown): error is APIError {
  return typeof error === "object" && error !== null && "__isAPIError" in error;
}

function initApp(): void {
  const somethingAPIResponse1 = somethingAPIResponseSchema.parse({
    success: true,
    result: "Hello, World!",
  });

  console.log(somethingAPIResponse1);

  const somethingAPIResponse2 = somethingAPIResponseSchema.parse({
    success: false,
    message: "Something went wrong",
    code: 500,
  });

  try {
    if (somethingAPIResponse2.success) {
      console.log(somethingAPIResponse2.result);
    } else {
      throw new APIError(
        somethingAPIResponse2.message,
        somethingAPIResponse2.code
      );
    }
  } catch (error) {
    if (isAPIError(error)) {
      console.log(error.toJSON());
    } else {
      console.log(error);
    }
  }

  const somethingAPIResponse3 = {
    success: false,
    result: "Hello, World!",
    message: "Something went wrong",
    code: 500,
  };

  try {
    const somethingAPIResponse4 = somethingAPIResponseSchema.parse(
      somethingAPIResponse3
    );

    console.log(somethingAPIResponse4);
  } catch (error) {
    console.log(error);
  }
}

document.addEventListener("DOMContentLoaded", initApp);
