const Assistant = ({ isVisible, assistantLogo, isLoading, questions }) => {
  if (!isVisible) return null;

  return (
    <div className="absolute left-1/4 flex h-screen items-center z-10 overflow-auto">
      <div className="bg-gray-100 border-8 border-white rounded-xl shadow-inner p-4 w-1/2">
        <div className="flex justify-between items-center shadow-md">
          <div className="flex items-center">
            <img alt="logo" src={assistantLogo} className="h-20 w-20" />
            <h1 className="text-2xl font-semibold text-teal-600">
              CLAW AI Assistant
            </h1>
          </div>
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center p-20">
            <img src={assistantLogo} alt="loader" className="h-32 w-32" />
          </div>
        ) : (
          <textarea
            readOnly
            className="w-full h-[350px] bg-transparent text-black p-2 resize-none outline-none"
            value={questions}
          />
        )}
      </div>
    </div>
  );
};

export default Assistant;
