import Modal from "@/components/FirstModal";
import ModalLogin from "@/components/ModalLogin";
import Titles from "@/components/Titles";

const RSVP = () => {
  return (
    <>
      <section className="flex flex-col items-center justify-center h-auto px-10 py-24 text-center bg-primaryGreen">
        <div>
          <Titles title="RSVP" color="text-white" size="large" />
          <p className="mt-10 text-sm md:text-xl">
            We want to share this long-awaited moment with you! Please help us
            by RSVPing before March 1, 2025.
          </p>
        </div>

        <div className="flex flex-col justify-center mt-10">
          <p className="max-w-lg mx-auto text-sm md:text-lg md:max-w-5xl">
            Please use this form to confirm your attendance at the event. If you
            have not yet made a reservation, select the &quot;Reserve&quot;
            button to register. If you have already made a reservation but need
            to change your information, choose &quot;Edit Reservation.&quot; We
            look forward to seeing you!
          </p>

          <div className="flex flex-wrap justify-center w-full mt-16 gap-7 md:mt-20 md:gap-20">
            <Modal />
            <ModalLogin />
          </div>
        </div>
      </section>
    </>
  );
};

export default RSVP;
