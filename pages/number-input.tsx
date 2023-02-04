import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type RequestBody = {
  number: number;
};

interface FormData {
  number: HTMLInputElement["value"];
}

const schema: yup.ObjectSchema<RequestBody> = yup.object().shape({
  number: yup.number().required().typeError("Type a number"),
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
        {/* @ts-ignore c.f. https://github.com/react-hook-form/react-hook-form/issues/9600https://github.com/react-hook-form/react-hook-form/issues/9600 */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register("number")} />
          {errors.number && <p>{errors.number.message}</p>}
          <button type="submit">Submit</button>
        </form>
      </main>
    </>
  );
}
