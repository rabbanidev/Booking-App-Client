import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import ReactPaginate from "react-paginate";

type IProps = {
  limit: number;
  total: number;
  handlePagination: (value: number) => void;
};

const Pagination = ({ limit, total, handlePagination }: IProps) => {
  if (Math.ceil(total / limit) === 1) {
    return null;
  }

  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    const currentValue = event.selected + 1;
    handlePagination(currentValue);
  };

  return (
    <ReactPaginate
      //   pageRangeDisplayed={3}
      marginPagesDisplayed={3}
      pageCount={Math.ceil(total / limit)}
      onPageChange={handlePageClick}
      renderOnZeroPageCount={null}
      breakLabel={"..."}
      activeClassName={"item active "}
      breakClassName={"item"}
      containerClassName={"pagination"}
      nextClassName={"item"}
      nextLabel={<ArrowRightIcon className="w-5 h-5" />}
      pageClassName={"item"}
      previousClassName={"item"}
      previousLabel={<ArrowLeftIcon className="w-75 h-5" />}
    />
  );
};

export default Pagination;
