const Names = ({sizeH1 = "text-6xl",  sizeSpan = "text-[4rem]"}) => { 
  return (
    <>
      <h1 className={`${sizeH1} font-[Slik] text-black`}>
        Bekky<span className={`font-[Destiny] ${sizeSpan} ml-[-10px]`}> & </span>
        Nicolas
      </h1>
    </>
  );
};

export default Names;
