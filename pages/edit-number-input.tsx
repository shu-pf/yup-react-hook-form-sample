import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type RequestBody = {
  number: number;
};

const schema = yup.object().shape({
  number: yup.string().matches(/^[0-9]+$/, "Must be only digits"),
});

interface Schema extends yup.InferType<typeof schema> {}

const initialValues = {
  number: 10,
};

export default function EditNumberInput() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Schema>({
    resolver: yupResolver(schema, { strict: true }),
    defaultValues: {
      number: initialValues.number.toString(),
    },
  });

  const onSubmit = (data: Schema) => {
    const submitData: RequestBody = {
      number: Number(data.number),
    };

    console.log(submitData);
  };

  return (
    <>
      <main>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register("number")} />
          {errors.number && <p>{errors.number.message}</p>}
          <button type="submit">Submit</button>
        </form>
      </main>
    </>
  );
}
