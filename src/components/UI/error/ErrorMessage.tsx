type IProps = {
  errorMessage: string;
  errorMessages?: {
    message?: string;
    path?: string;
  }[];
};

const ErrorMessage = ({ errorMessage, errorMessages }: IProps) => {
  if (!errorMessage) {
    return null;
  }

  return (
    <>
      <small className="text-red-500 text-xs mt-0.5 lg:text-sm">
        {errorMessage}
      </small>
      {errorMessages?.length && (
        <ul>
          {errorMessages.map((err) => (
            <li key={err.message}>
              <small className="text-red-500 text-xs mt-0.5 lg:text-sm">
                {err.message}
              </small>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default ErrorMessage;
