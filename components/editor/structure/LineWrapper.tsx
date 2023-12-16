const LineWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col gap-4">{children}</div>
  );
}

export default LineWrapper;