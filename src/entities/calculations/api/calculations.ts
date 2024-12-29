import { emptySplitApi } from "../../../shared/api";
export const addTagTypes = ["calculations"] as const;

const injectedRtkApi = emptySplitApi
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      createCalculation: build.mutation({
        query: (body) => ({
          url: "/calculations",
          method: "POST",
          body,
        }),
        invalidatesTags: ["calculations"],
      }),
    }),
  });

export const { useCreateCalculationMutation } = injectedRtkApi;
