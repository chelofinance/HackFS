import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import type {NextPage} from "next";
import clsx from "clsx";
import {useForm} from "react-hook-form";
import {Input} from "@components/common/form/input";
import {Button} from "@components/common/button";

const ContactUs: NextPage = () => {
  // const { addToast } = useToasts();
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({mode: "onChange"});
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
  };

  const rules = {
    fullName: {
      required: {value: true, message: "This is required"},
    },
    lastname: {
      required: {value: true, message: "This is required"},
    },
    email: {
      required: {value: true, message: "This is required"},
    },
    phoneNumber: {
      required: {value: true, message: "This is required"},
    },
    message: {
      required: {value: true, message: "This is required"},
    },
  };

  React.useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center relative min-h-screen">
      <div className="w-full h-full absolute bottom-0 bg-gradient-to-bl via-black from-blue-900/60 to-black"></div>
      <div
        className="w-4/5 flex flex-col items-center gap-10 pt-16 pb-10"
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
        data-aos-once="false"
      >
        <div>
          <h2 className="text-3xl font-bold text-white">Contact Us</h2>
        </div>
        <div
          className={clsx(
            "flex flex-col items-center justify-center w-full h-full sm:px-10 px-4 pb-10"
          )}
        >
          <form
            className="w-2/3 flex flex-col gap-6 items-center justify-center relative"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              name="fullName"
              title="Full name *"
              placeholder="John Doe"
              register={register}
              rules={rules.fullName}
              error={errors.fullName}
              classNameContainer="md:max-w-[472px f-22 w-full"
            />
            <Input
              name="phoneNumber"
              title="Phone Number *"
              placeholder="+1 123 456 789"
              register={register}
              rules={rules.fullName}
              error={errors.fullName}
              classNameContainer="md:max-w-[472px f-22 w-full"
            />{" "}
            <Input
              name="email"
              title="Email *"
              placeholder="jonhdoe@mail.com"
              register={register}
              rules={rules.fullName}
              error={errors.fullName}
              classNameContainer="md:max-w-[472px f-22 w-full"
            />{" "}
            <Input
              name="message"
              title="Message *"
              placeholder="Message"
              register={register}
              rules={rules.fullName}
              error={errors.fullName}
              classNameContainer="md:max-w-[472px f-22 w-full"
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="p-4 text-white border border-white"
            >
              {isLoading ? "Loading" : "Send"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
