type IProps = {
  label?: string;
  value?: string;
};

const SectionTitle = ({ label, value }: IProps) => {
  return (
    <div className="mb-10 flex flex-col items-center">
      <h3 className="text-xl font-semibold tracking-tight text-slate-900 md:text-3xl xl:tex-4xl">
        {label} <span className="text-red-600">{value}</span>
      </h3>
      <div className="mt-1 w-28 h-1 bg-red-500 rounded ml-2 md:h-2"></div>
    </div>
  );
};

export default SectionTitle;
