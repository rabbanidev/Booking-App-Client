"use client";

import BackButton from "@/components/UI/button/BackButton";
import NavigateButton from "@/components/UI/button/BackButton";
import ErrorMessage from "@/components/UI/error/ErrorMessage";
import CardLoading from "@/components/UI/loading/CardLoading";
import withAuth from "@/components/auth/WithAuth";
/* eslint-disable @next/next/no-img-element */
import {
  useDeleteFromCartMutation,
  useGetCartItemsQuery,
} from "@/redux/features/cart/cartApi";

const CartPage = () => {
  const [deleteFromCart] = useDeleteFromCartMutation();
  const { isLoading, isError, error, data } = useGetCartItemsQuery(undefined);

  const deleteHandler = (id: string) => {
    deleteFromCart(id);
  };

  //Decide what to render
  let content = null;
  if (isLoading) {
    content = (
      <>
        <CardLoading />
        <CardLoading />
      </>
    );
  } else if (!isLoading && isError) {
    content = (
      <div className="mt-20 md:flex justify-center flex-col items-center">
        <ErrorMessage errorMessage={(error as any).message} />
        <BackButton />
      </div>
    );
  } else if (!isLoading && !isError && !data?.cartItems?.length) {
    content = (
      <div className="mt-20 md:flex justify-center flex-col items-center">
        <ErrorMessage errorMessage="Cart is empty" />
        <BackButton />
      </div>
    );
  } else {
    content = data?.cartItems?.map((cartItem) => {
      const { id: cartItemId, service } = cartItem;
      const { category, name, price } = service;
      return (
        <li
          key={cartItemId}
          className="flex flex-col py-6 px-6 items-center shadow rounded-lg sm:flex-row sm:justify-between"
        >
          <div className="flex gap-x-3 ">
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
              <img
                src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg"
                alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                className="h-full w-full object-cover object-center"
              />
            </div>

            <div>
              <h3>{name}</h3>
              <p className="mt-1">BDT {price}</p>
              <p className="mt-1 text-sm text-gray-500">{category}</p>
              <button
                type="button"
                className="font-medium text-red-600 hover:text-red-500"
                onClick={() => deleteHandler(cartItemId)}
              >
                Remove
              </button>
            </div>
          </div>

          <button className="mt-2 text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-300 font-medium rounded text-sm px-5 py-2 text-center sm:mt-0">
            Book
          </button>
        </li>
      );
    });
  }

  return (
    <section className="mt-10">
      <div className="container">
        <ul className="divide-y divide-gray-200 flex flex-col gap-y-5 lg:mx-40">
          {content}
        </ul>
      </div>
    </section>
  );
};

export default withAuth(CartPage);
