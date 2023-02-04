import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type SelectEnum = "one" | "two" | "three";

type RequestBody = {
  text: string;
  number: number;
  select: SelectEnum;
};

interface FormData {
  text: HTMLInputElement["value"];
  number: HTMLInputElement["value"];
  select: HTMLSelectElement["value"];
}

const schema: yup.ObjectSchema<RequestBody> = yup.object().shape({
  text: yup.string().required("Text is required"),
  number: yup.number().required().typeError("Type a number"),
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
    console.log(data.number);
  };

  return (
    <>
      <main>
        {/* @ts-ignore https://github.com/react-hook-form/react-hook-form/issues/9600 */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input {...register("text")} />
            {errors.text && <p>{errors.text.message}</p>}
          </div>
          <div>
            <input {...register("number")} />
            {errors.number && <p>{errors.number.message}</p>}
          </div>
          <div>
            <select {...register("select")} defaultValue="">
              <option value="">Please Select</option>
              <option value="one">One</option>
              <option value="two">Two</option>
              <option value="three">Three</option>
            </select>
            {errors.select && <p>{errors.select.message}</p>}
          </div>
          <button type="submit">Submit</button>
        </form>
      </main>
    </>
  );
}
