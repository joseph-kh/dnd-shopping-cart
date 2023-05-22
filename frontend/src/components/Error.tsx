import { ErrorIcon } from "./icons";

const Error: React.FC = () => (
  <div className="flex h-[calc(100vh-80px)] items-center justify-center p-5 w-full bg-white">
    <div className="text-center">
      <div className="inline-flex rounded-full bg-red-100 p-4">
        <div className="rounded-full stroke-red-600 bg-red-200 p-4">
          <ErrorIcon />
        </div>
      </div>
      <h1 className="mt-5 text-[36px] font-bold text-slate-800 lg:text-[50px]">
        Oops!
      </h1>
      <p className="text-slate-600 mt-5 lg:text-lg">
        Something went wrong. Please Try to refresh this page
      </p>
    </div>
  </div>
);

export default Error;
