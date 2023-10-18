import baseAPi from "../baseApi/baseApi";
import { tagTypes } from "../tagTypes";

const CART_URL = "/carts";

const cartApi = baseAPi.injectEndpoints({
  endpoints: (builder) => ({
    addToCart: builder.mutation({
      query: (data) => ({
        url: `${CART_URL}/add-to-cart`,
        method: "POST",
        data,
      }),
    }),
  }),
});

export const { useAddToCartMutation } = cartApi;
