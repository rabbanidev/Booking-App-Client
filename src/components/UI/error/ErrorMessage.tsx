type IProps = {
  errorMessage: string;
};

const ErrorMessage = ({ errorMessage }: IProps) => {
  if (!errorMessage) {
    return null;
  }

  return (
    <small className="text-red-500 text-xs mt-0.5 lg:text-lg">
      {errorMessage}
    </small>
  );
};

export default ErrorMessage;
