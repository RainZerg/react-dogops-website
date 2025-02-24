import { Spinner } from "@nextui-org/react";
import PropTypes from 'prop-types';

const LoadingSpinner = ({
  size = "lg",
  color = "primary",
  label = "Loading..."
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 h-full w-full">
      <Spinner
        size={size}
        color={color}
        labelColor={color}
        aria-label="Loading"
        className="[&_circle]:opacity-50"
      />
      {label && (
        <span className={`text-${color} text-sm font-medium`}>
          {label}
        </span>
      )}
    </div>
  );
};

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "warning",
    "danger",
    "default"
  ]),
  label: PropTypes.string
};

export default LoadingSpinner;
