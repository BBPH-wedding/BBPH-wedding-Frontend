interface ContainerTextProps {
  h?: string;
  w?: string;
  children?: React.ReactNode;
}

const ContainerText: React.FC<ContainerTextProps> = ({ h, w, children}) => { 
  return (
<>
<div className="flex items-center justify-center w-auto h-auto p-5 border border-primaryGreen rounded-xl">  
 <div className={`${w ? w : ""} ${h ? h : ""} bg-white/70 rounded-xl`}>
    {children}
 </div>
</div>
</>
  );
};

export default ContainerText;