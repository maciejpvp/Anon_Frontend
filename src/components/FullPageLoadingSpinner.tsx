export const FullPageLoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <span className="loading loading-spinner w-16 h-16 text-primary"></span>
    </div>
  );
};
