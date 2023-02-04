import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type RequestBody = {
  text: string;
};

interface FormData {
  text: HTMLInputElement["value"];
}

const schema: yup.ObjectSchema<RequestBody> = yup.object().shape({
  text: yup.string().required("Text is required"),
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register("text")} />
          {errors.text && <p>{errors.text.message}</p>}
          <button type="submit">Submit</button>
        </form>
      </main>
    </>
  );
}
