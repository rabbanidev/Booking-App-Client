import { TrashIcon } from "@heroicons/react/24/outline";

const DeleteButton = ({
  deleteId,
  deleteHandler,
}: {
  deleteId: string;
  deleteHandler: (id: string) => void;
}) => {
  const onClickHandler = () => {
    let text = "Are you sure you want to delete this service!";
    if (confirm(text) == true) {
      deleteHandler(deleteId);
    }
  };

  return (
    <button
      className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-2"
      onClick={onClickHandler}
    >
      <TrashIcon className="w-4 h-4" />
    </button>
  );
};

export default DeleteButton;
