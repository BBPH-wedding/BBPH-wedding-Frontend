import Button from "@/components/Button";
import Titles from "@/components/Titles";

const RSVP = () => {
  return (
    <>
      <section className="flex flex-col items-center justify-center h-auto py-24 text-center bg-primaryGreen px-10">
        <div>
          <Titles title="RSVP" color="text-white" size="large" />
          <p className="mt-10 text-sm md:text-xl">
            We want to share this long-awaited moment with you! Please help us
            by RSVPing before March 1, 2025.
          </p>
        </div>

        <div className="mt-10 flex flex-col justify-center">
          <p className="text-sm md:text-lg max-w-lg md:max-w-5xl mx-auto">
            Please use this form to confirm your attendance at the event. If you
            have not yet made a reservation, select the &quot;Reserve&quot; button to
            register. If you have already made a reservation but need to change
            your information, choose &quot;Edit Reservation.&quot; We look forward to
            seeing you!
          </p>

          <div className="flex flex-wrap justify-center w-full mt-16 gap-7 md:mt-20 md:gap-20">
            <Button className="w-full">Reserve</Button>
            <Button className="w-full">Edit Reservation</Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default RSVP;