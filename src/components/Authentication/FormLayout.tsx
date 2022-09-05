type FormLayoutProps = {
  children: JSX.Element | JSX.Element[];
  title: string;
};

const FormLayout = ({ children, title }: FormLayoutProps) => {
  return (
    <div className="bg-[#a7bcff] min-h-screen flex items-center justify-center">
      <div className="bg-white py-5 px-16 flex flex-col items-center rounded-lg gap-y-3">
        <span className="text-[#5d5b8d] text-2xl font-bold">Khao Chat</span>
        <h2 className="text-[#5d5b8d] text-base">{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default FormLayout;
