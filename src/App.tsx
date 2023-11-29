import React from "react";
import { createRoot } from "react-dom/client";
import { CustomButton } from "./Components/Buttons";
import { CustomTextField, FieldInput } from "./Components/Inputs";
import { useForm } from "react-hook-form";
import { inputsType } from "./utils";
import MainSkeleton from "./Components/Loaders/ContentSkeleton";

const App = () => {
  const {
    watch,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({ defaultValues: { email: "" } });
  return (
    <div className="">
      <div>Name: UI</div>
      <CustomButton
        variant="contained"
        color="success"
        sx={{ backgroundColor: "blueviolet" }}
      >
        Hello
      </CustomButton>
      <CustomTextField label="Test Input" error={true} />
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        <FieldInput
          type={inputsType.EMAIL}
          fullWidth
          label="Email address"
          isError={!!errors?.email?.message}
          control={control}
          register={register}
          helperText={errors?.email?.message}
          registerWith={inputsType.EMAIL}
          
        />
        <input type="submit" />
      </form>
      <MainSkeleton />
    </div>
  );
};

const container = document.getElementById("app");
const root = createRoot(container!);
root.render(<App />);
