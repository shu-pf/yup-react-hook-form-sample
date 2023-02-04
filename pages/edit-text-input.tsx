import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type RequestBody = {
  text: string;
};

const schema = yup.object().shape({
  text: yup.string().required("Text is required"),
});

interface Schema extends yup.InferType<typeof schema> {}

const initialValues = {
  text: "text",
};

export default function EditTextInput() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Schema>({
    resolver: yupResolver(schema, { strict: true }),
    defaultValues: {
      text: initialValues.text,
    },
  });

  const onSubmit = (data: Schema) => {
    const submitData: RequestBody = {
      text: data.text,
    };

    console.log(submitData);
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
