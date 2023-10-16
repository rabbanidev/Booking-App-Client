"use client";

type IProps = {
  value: any;
  changeHandler: (value: any) => void;
};

const Searchbar = ({ value, changeHandler }: IProps) => {
  return (
    <label
      className="bg-white max-w-xs flex  md:flex-row items-center justify-center border py-1 px-2 rounded-xl shadow"
      htmlFor="search-bar"
    >
      <input
        id="search-bar"
        placeholder="Search..."
        className="px-6 py-1 w-full rounded-md flex-1 outline-none bg-white"
        value={value}
        onChange={(e) => changeHandler(e.target.value)}
      />
      <button className="w-auto px-6 py-2 bg-red-500 border-red-500 text-white duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all">
        <div className="relative">
          <div className="flex items-center transition-all opacity-1">
            <span className="text-sm font-semibold whitespace-nowrap truncate mx-auto">
              Search
            </span>
          </div>
        </div>
      </button>
    </label>
  );
};

export default Searchbar;
