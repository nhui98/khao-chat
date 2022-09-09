type FormLayoutProps = {
  children: JSX.Element | JSX.Element[];
  title: string;
};

const FormLayout = ({ children, title }: FormLayoutProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#a7bcff]">
      <div className="flex flex-col items-center gap-y-3 rounded-lg bg-white py-5 px-16">
        <span className="text-2xl font-bold text-[#5d5b8d]">Khao Chat</span>
        <h2 className="text-base text-[#5d5b8d]">{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default FormLayout;
