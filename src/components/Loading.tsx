type Props = {};

const Loading = (props: Props) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex gap-2 items-center justify-center">
        <div className="w-5 h-5 rounded-full animate-pulse bg-blue-600"></div>
        <div className="w-5 h-5 rounded-full animate-pulse bg-blue-600"></div>
        <div className="w-5 h-5 rounded-full animate-pulse bg-blue-600"></div>
      </div>
    </div>
  );
};
export default Loading;
