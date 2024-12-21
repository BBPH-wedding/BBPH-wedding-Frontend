const Note = () => {
  return (
    <>
      <section
        className="w-auto sm:h-[35rem] h-auto bg-[#f1f2ec] bg-cover"
        style={{
          backgroundImage: `url('/BEKKY WALL resized.png')`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-10 py-10 mx-10 text-sm text-center sm:text-2xl text-white font-[silk]">
          <p className="">
            Dear all, <br />
            Your presence at our wedding is the greatest gift we could ever ask
            for. <br /> Sharing this special day with you means so much to us.
          </p>
          <p className="">
            If you would like to honor us with a gift, we truly appreciate any
            contribution towards our future together. <br /> Thank you for being
            part of our celebration.
          </p>
          <p className="">
            We can’t wait to see you and create unforgettable memories together.
          </p>
        </div>
      </section>
    </>
  );
};

export default Note;
