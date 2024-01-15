export const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-amber-500 m-10"></div>
      <p className="text-amber-500">Cargando...</p>
    </div>
  );
};
