type IProps = {
  errorMessage: string;
};

const ErrorMessage = ({ errorMessage }: IProps) => {
  if (!errorMessage) {
    return null;
  }

  return <small className="text-red-500 text-sm">{errorMessage}</small>;
};

export default ErrorMessage;
