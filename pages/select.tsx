import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type SelectEnum = "one" | "two" | "three";

type RequestBody = {
  select: SelectEnum;
};

interface FormData {
  select: HTMLSelectElement["value"];
}

const schema: yup.ObjectSchema<RequestBody> = yup.object().shape({
  select: yup
    .string()
    .oneOf(["one", "two", "three"] as const)
    .defined(),
});

interface Schema extends yup.InferType<typeof schema> {}

export default function TextInput() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: Schema) => {
    console.log(data);
  };

  return (
    <>
      <main>
        {/* @ts-ignore c.f. https://github.com/react-hook-form/react-hook-form/issues/9600 */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <select {...register("select")} defaultValue="">
            <option value="">Please Select</option>
            <option value="one">One</option>
            <option value="two">Two</option>
            <option value="three">Three</option>
          </select>
          {errors.select && <p>{errors.select.message}</p>}
          <button type="submit">Submit</button>
        </form>
      </main>
    </>
  );
}
