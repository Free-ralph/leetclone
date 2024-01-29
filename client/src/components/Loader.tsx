import { ScaleLoader } from "react-spinners";

const Loader = ({ color, height }: { color?: string; height?: number }) => {
  return (
    <span>
      <ScaleLoader height={height || 25} color={color || "rgb(255 161 22)"} />
    </span>
  );
};
export const LoaderPage = ({
  color,
  height,
}: {
  color?: string;
  height?: number;
}) => {
  return (
    <div className="w-full h-full flex justify-center align-center">
      <ScaleLoader height={height || 25} color={color || "rgb(255 161 22)"} />
    </div>
  );
};
export default Loader;
