import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type RequestBody = {
  number: number;
};

const schema = yup.object().shape({
  number: yup
    .number()
    .typeError("Must be a number")
    .positive("Must be a positive number")
    .integer("Must be an integer")
    .required("Required"),
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
    resolver: yupResolver(schema),
    defaultValues: {
      number: initialValues.number,
    },
  });

  const onSubmit = (data: Schema) => {
    const submitData: RequestBody = {
      number: data.number,
    };

    console.log(submitData);
  };

  return (
    <>
      <main>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("number", {
              setValueAs: (v) => (v ? parseFloat(v) : undefined),
            })}
          />
          {errors.number && <p>{errors.number.message}</p>}
          <button type="submit">Submit</button>
        </form>
      </main>
    </>
  );
}
