import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type SelectOptions = "one" | "two" | "three";

type RequestBody = {
  select: SelectOptions;
};

const schema = yup.object().shape({
  select: yup
    .string()
    .oneOf(["one", "two", "three"] as const)
    .defined(),
});

interface Schema extends yup.InferType<typeof schema> {}

const initialValues = {
  select: "one" as SelectOptions,
};

export default function EditSelect() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Schema>({
    resolver: yupResolver(schema),
    defaultValues: {
      select: initialValues.select,
    },
  });

  const onSubmit = (data: Schema) => {
    const submitData: RequestBody = {
      select: data.select,
    };

    console.log(submitData);
  };

  return (
    <>
      <main>
        <form onSubmit={handleSubmit(onSubmit)}>
          <select {...register("select")} defaultValue="">
            <option value="" disabled>
              Please Select
            </option>
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
