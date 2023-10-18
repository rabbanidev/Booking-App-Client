import { IMeta } from "@/types";
import baseAPi from "../baseApi/baseApi";
import { tagTypes } from "../tagTypes";
import { ICart } from "@/types/cart";

const CART_URL = "/carts";

const cartApi = baseAPi.injectEndpoints({
  endpoints: (builder) => ({
    getCartItems: builder.query({
      query: () => ({
        url: `${CART_URL}`,
        method: "GET",
      }),
      transformResponse: (response: { cartItems: ICart[] }, meta: IMeta) => {
        return {
          cartItems: response?.cartItems,
          meta,
        };
      },
      providesTags: [tagTypes.cart],
    }),
    addToCart: builder.mutation({
      query: (data) => ({
        url: `${CART_URL}/add-to-cart`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.cart],
    }),
    deleteFromCart: builder.mutation({
      query: (id) => ({
        url: `${CART_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.cart],
    }),
  }),
});

export const {
  useGetCartItemsQuery,
  useAddToCartMutation,
  useDeleteFromCartMutation,
} = cartApi;
